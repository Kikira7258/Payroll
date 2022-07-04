// --------------------
// >> BASE VARIABLES <<
// --------------------
const { render } = require('ejs');
const express = require('express');
const router = express.Router();
const conn = require('../lib/db');
// --------------------



// --------------------
// >> GET ROUTE <<
// --------------------
router.get('/login', (req, res) => {
    res.render('login', {
        message: {
            error: "",
            success: ""
        }
    })
})
// --------------------



// --------------------
// >> POST ROUTE <<
// --------------------
router.post('/login', (req, res) => {
    var email = req.body.email;
    var password = req.body.password;

    conn.query('SELECT * FROM employees WHERE email = ? AND password = ?', [email, password], (err, rows) => {
        console.log(rows.length);

        if(err || rows.length <= 0) {
            console.log(err);
            res.redirect('/auth/login')
        } else {
            conn.query(
                'SELECT department_nm FROM departments WHERE id = ' + rows[0].department_id, (err, result) => {
                    if (err) throw err;

                    req.session.isAuthenticated = true;
                    req.session.user_id = rows[0].id
                    req.session.profile_img = rows[0].profile_img
                    req.session.first_nm = rows[0].first_nm
                    req.session.role = rows[0].role
                    req.session.department_id = rows[0].department_id
                    // req.session.department_nm = result[0].department_nm
                    res.redirect('/')
                }
            )
        }
    })
})
// --------------------



// --------------------
// >> LOGOUT <<
// --------------------
router.get('/logout', (req, res) => {
    req.session.destroy()
    res.redirect('/auth/login')
})
// --------------------




// --------------------
// >> EXPORT ROUTER <<
// --------------------
module.exports = router;
// --------------------