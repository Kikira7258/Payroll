// --------------------
// >> BASE VARIABLES <<
// --------------------
require('dotenv').config({path: './secrets.env'});
const express = require('express');
const conn = require('./lib/db');
const path = require('path');
// const cookieParser = require('cookie-parser');
const session = require('express-session');
const protect = require('./utils/protect')

const app = express();

// >> Routes <<
const authRouter = require('./routes/auth');
const payrollRouter = require('./routes/payroll')
const employeesRouter = require('./routes/employees')
const payslipRouter = require('./routes/payslip')
// --------------------


// --------------------
// >> VIEW ENGINE AND STATIC FILES <<
// --------------------
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(express.static(path.join(__dirname, 'public')))
// --------------------



// --------------------
// >> CONFIG EXPRESS SERVER <<
// --------------------
app.use(express.json());
app.use(express.urlencoded({ extended: true}));
// app.use(cookieParserer());
// --------------------



// --------------------
// >> MIDDLEWEAR SESSION <<
// --------------------
app.use(session({
    secret: 'theSecret',
    resave: true,
    saveUninitialized: false,
    cookie: {
        maxAge: 1000 * 60 * 30
    }
}))
// --------------------




// --------------------
// >> GET ROUTES <<
// --------------------
app.get('/', (req, res) => {
    res.render('main_view')
})

// --------------------



// --------------------
// >> MIDDLEWEAR <<
// --------------------
app.use('/auth', authRouter);

app.use(protect);
app.use('/payroll', payrollRouter);
app.use('/employees', employeesRouter);
app.use('/payslip', payslipRouter);
// --------------------




// --------------------
// >> PORT <<
// --------------------
const port = process.env.port || 3000
app.listen(port, () => console.log(`Listening on port: ${3000}`))
// --------------------