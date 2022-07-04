// --------------------
// >> BASE VARIABLES <<
// --------------------
const express = require('express');
const router = express.Router();
const conn = require('../lib/db')
// --------------------

// --------------------
// >> GET ROUTE <<
// --------------------
router.get('/', (req, res) => {
    // select from payroll where pacycle is active paycycle
    let payqry = 'SELECT *, pr.id AS payroll_id FROM payroll pr, departments dptm, employees emp, paycycles pcs WHERE pr.employee_id = emp.id AND emp.department_id = dptm.id AND pr.paycycle_id = pcs.id AND pcs.active = 1'
    
    // limits the sum to which department is logged in
    if (req.session.role === 'supervisor'){
        payqry += ' AND emp.department_id = ' + req.session.department_id
    }    

    conn.query(
        payqry, (err, rows) => {
            if(err) {
                console.log(err)
                return res.redirect('/auth/login')
            } else {
                let sql =  'SELECT SUM(prl.hours_worked) AS total_hours, SUM(prl.overtime_hours) AS total_overtime FROM payroll prl, employees emps WHERE prl.employee_id = emps.id';

                // limits the sum to which department is logged in
                if (req.session.role === 'supervisor'){
                    sql += ' AND emps.department_id = ' + req.session.department_id
                }

                conn.query(
                    sql, (err, totals) => {
                        if(err) {
                            console.log(err)
                            return res.redirect('/auth/login')
                        } else {
                            conn.query('SELECT * FROM paycycles', (err, cycles)=>{
                                if (err) throw err;
                                else {
                                    res.render('payroll', {
                                        details: rows,
                                        paycycles: cycles,
                                        current_user: req.session,
                                        totals: totals[0]
                                    })
                                }
                            })
                        }
                    }
                )
            }

            
        }
    )
})

router.get('/paycycle/new', (req, res) => {
    // get active pacycle to calculate new dates
    conn.query('SELECT end_date FROM paycycles WHERE active = 1', (err, [cycle]) => {
        if (err) throw err;

        const start_date = cycle.end_date;
        // 2 weeks > days > hours > minutes > seconds > milliseconds || new end date
        const end_date = new Date(start_date.getTime() + (2 * 7 * 24 * 60 * 60 * 1000))

        // reset active dates
        conn.query('UPDATE paycycles SET active = 0', (err) => {
            if (err) throw err;

            conn.query('INSERT INTO paycycles (start_date, end_date, active) VALUES (?,?,1)',[start_date,end_date],(err)=>{
                if (err) throw err;

                res.redirect('/payroll')
            })
        })
    })
})

// --------------------



// --------------------
// >> ADD ROUTE <<
// --------------------
router.get('/add-details/:id', (req, res) => {
    res.render('add-emp-salary', {employee_id: req.params.id, action: 'add'})
})
// --------------------





// --------------------
// >> POST ROUTE <<
// --------------------
router.post('/add', (req, res) => {
    conn.query(
        'SELECT dpts.* FROM employees emps, departments dpts WHERE emps.department_id = dpts.id AND emps.id = ' + req.body.employee_id, (err, sum) => {
            if(err){
                throw err
            } else {
                const hours_worked = parseInt(req.body.hours_worked) * parseInt(sum[0].hourly_rate)
    
                const overtime_hours = parseInt(req.body.overtime) * parseInt(sum[0].overtime_rate)
    
                const gross_pay = hours_worked + overtime_hours;
    
                console.log(gross_pay)

                // Get active paycycle
                conn.query('SELECT id FROM paycycles WHERE active = 1', (err, cycles) => {
                    if (err) throw err;

                    else{
                        // specify all the feilds thats needed for the payroll
                        let data = {
                            employee_id: parseInt(req.body.employee_id),
                            paycycle_id: cycles[0].id,
                            hours_worked: parseInt(req.body.hours_worked),
                            overtime_hours: parseInt(req.body.overtime),
                            gross_pay: gross_pay,
                            absent_days: parseInt(req.body.absent_days),
                        }
            
                        let totalSum = "INSERT INTO payroll SET ?"
            
                        conn.query(totalSum, data, (err, result) => {
                            if(err) throw err;
                            res.redirect('/payroll')
                        })
                    }
                })
            }
        }
    )
    
})
// --------------------




// --------------------
// >> EDIT & UPDATE ROUTE <<
// get route || EDIT
// --------------------
router.get('/edit/:id', (req, res) => {
    conn.query('SELECT * FROM payroll WHERE id = ' + req.params.id, (err, row) => {
        if(err) {
            console.log(err)
        } else {
            console.log(row)

            res.render('add-emp-salary', {
                id: row[0].id,
                employee_id: row[0].employee_id,
                hours_worked: row[0].hours_worked,
                overtime_hours: row[0].overtime_hours,
                absent_days: row[0].absent_days,

                action: 'edit'
            })
        }
    })
})

// payroll
// post route || UPDATE
router.post('/update/:id', (req, res, next) => {
conn.query(
        'SELECT dpts.* FROM employees emps, departments dpts WHERE emps.department_id = dpts.id AND emps.id = ' + req.body.employee_id, (err, sum) => {
            if (err) throw err;

            const hours_worked = parseInt(req.body.hours_worked) * parseInt(sum[0].hourly_rate);
            const overtime_hours = parseInt(req.body.overtime) * parseInt(sum[0].overtime_rate);
            const gross_pay = hours_worked + overtime_hours;

            // let sqlQuery = "UPDATE payroll SET = " +
            // ", hours_worked = " + req.body.hours_worked +
            // ", overtime_hours = " + req.body.overtime_hours +
            // " WHERE id = " + req.params.id
            
            const data = {
                hours_worked: parseInt(req.body.hours_worked),
                overtime_hours: parseInt(req.body.overtime),
                absent_days: parseInt(req.body.absent_days),
                gross_pay
            }

            conn.query('UPDATE payroll SET ? WHERE id = ' + req.params.id, data, (err, rows) => {
                if(err) {
                    console.log(err);
                } else {
                    res.redirect('/payroll')
                }
            })
        })
})
// --------------------



// --------------------
// DELETE ROUTE 
// --------------------
router.get('/delete/:id', (req, res) => {
  conn.query('DELETE FROM payroll WHERE id = ' + req.params.id, (err, row) => {
        if(!err){
            res.redirect('/payroll')
        } else {
            console.log(err);
        }
    })
})
// --------------------






module.exports = router