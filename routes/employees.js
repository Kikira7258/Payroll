// --------------------
// >> BASE VARIABLES
// --------------------
const express = require('express');
const router = express.Router();
const conn = require('../lib/db');
// --------------------


// --------------------
// >> GET ROUTE <<
// --------------------
router.get('/', (req, res, next) => {
    conn.query('SELECT *, emps.id AS employee_id FROM employees emps, departments dpts WHERE emps.department_id = dpts.id',(err,rows)=>{
        if (err) throw err;

        res.render('all_emp', {
            current_user: req.session,
            rows:rows
        })
    })
})

// --------------------




// --------------------
// >> ADD ROUTE <<
// --------------------
router.get('/add', (req, res, next) => {

    conn.query(
        'SELECT * FROM departments', (err, results) => {
            res.render('add_employee', {
                current_user: req.session,
                departments: results,
                action: 'add'
            })
        }
    )
})

router.get('/edit/:id', (req, res, next) => {
    conn.query('SELECT * FROM employees WHERE id = ' + req.params.id, (err, rows) => {
        if (err) throw err;
        
        conn.query('SELECT * FROM departments', (err, departments) => {
            if (err) throw err;

            res.render('add_employee', { current_user: req.session, data: rows[0], departments, action: 'edit'})
        })
    })
})

// --------------------




// --------------------
// >> POST ROUTE <<
// --------------------
router.post('/add', (req, res) => {
    let details = {
        first_nm: req.body.first_nm,
        last_nm: req.body.last_nm,
        role: req.body.role,
        department_id: parseInt(req.body.department)
    }

    let sqlQry = "INSERT INTO employees (first_nm, last_nm, role, department_id) VALUES (?,?,?,?)";

    let qry = conn.query(sqlQry, Object.values(details), (err, result) => {
        if(err) throw err;
        res.redirect('/employees')
    })
})


// employee
router.post('/update/:id', (req, res, next) => {
    // let empSql = 'UPDATE employees SET = ' + 
    // ", first_nm = " + req.body.first_nm + 
    // ", last_nm = " + req.body.last_nm

    const data = {
        first_nm: req.body.first_nm,
        last_nm: req.body.last_nm,
        role: req.body.role,
        department_id: parseInt(req.body.department),
    }

    conn.query('UPDATE employees SET ? WHERE id = ' + req.params.id, data, (err, empInfo) => {
        if(err) {
            console.log(err);
        } else {
            res.redirect('/employees')
        }
    })
    
})


// --------------------


// --------------------
// >> EXPORT ROUTE <<
// --------------------
module.exports = router
// --------------------