// --------------------
// >> BASE VARIABLES <<
// --------------------
const express = require('express');
const router = express.Router()
const conn = require('../lib/db')
// --------------------


// --------------------
// >> GET ROUTE <<
// --------------------
router.get('/:emp_id/active', (req, res) => {
    conn.query(`SELECT * FROM payroll pr, departments dptm, employees emp, paycycles pcs WHERE pr.employee_id = emp.id AND emp.department_id = dptm.id AND pr.paycycle_id = pcs.id AND emp.id = ${req.params.emp_id} AND pcs.active = 1`, (err, rows) => {
        if (err) throw err;

        res.render('payslip', {
            current_user: req.session,
            data: rows[0]
        })
    })
})

router.get('/:emp_id/:paycycle_id', (req, res) => {
    conn.query(`SELECT * FROM payroll pr, departments dptm, employees emp, paycycles pcs WHERE pr.employee_id = emp.id AND emp.department_id = dptm.id AND pr.paycycle_id = pcs.id AND emp.id = ${req.params.emp_id} AND pcs.id = ${req.params.paycycle_id}`, (err, rows) => {
        if (err) throw err;

        res.render('payslip', {
            current_user: req.session,
            data: rows[0]
        })
    })
})

// --------------------




// --------------------
// >> EXPORT ROUTER <<
// --------------------
module.exports = router
// --------------------