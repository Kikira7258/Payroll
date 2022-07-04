<!-- ------------------- -->
<!-- PROJECT GUILD -->
<!-- ------------------- -->
## Payroll Application - Class Work

1. You are required to create a Payroll application for the Serhant Construction Company. The company collects the number of hours worked per employee and generate a Payroll for the employee and save the information to a database.

1. NOTE: Some employees may work overtime. The system should calculate the necessary overtime based on the department the employee works in. The departments are Operations, Sales & Marketing, Administration and Accounts

1. Attention must be made to allowing the Accounts Staff to be able to:
    - Retrieve entered salary information entered by supervisors (A message or meaningful indicator should be displayed if information is missing.)
    - Retrieve an employee's salary information given a Pay Cycle or a Date Range (Ranges should give a summary information over the date range - Using Aggregate Functions)
    - Add/Edit Salary information for the employee
    - Generate a Payslip for the employee

1. Employees should also be able to:
    - Login to the application and pull up their salary information for a particular pay cycle

1. Supervisors should be able to
    - Generate a Salary Summary for the department
    - Create/Edit an employee in their department and add their basic salary information
    - Add/Edit Overtime hours worked for the employees in their department
    - Enter Sick or absent dates for an employee. Absent or sick days are not paid but need to be entered in the system


### Marks /50
DATABASE - Foreign Keys /4
DATABASE - NORMALIZATION /4
DATABASE DESIGN /7
ROUTING /5
UI/UX /5
NAVIGATION /5
LOGIN & USER MANAGEMENT /5
CRUD functioality /15
<!-- ------------------- -->



<!-- ------------------- -->
<!-- Objectives -->
<!-- ------------------- -->
1. collects the number of hours worked per employee and generate a Payroll for the employee and save the information to a database

1. calculate the necessary overtime based on the department the employee works in

1. allowing the Accounts Staff to be able to:
    - Retrieve entered salary information entered by supervisors (A message or meaningful indicator should be displayed if information is missing.)
    - Retrieve an employee's salary information given a Pay Cycle or a Date Range (Ranges should give a summary information over the date range - Using Aggregate Functions)
    - Add/Edit Salary information for the employee
    - Generate a Payslip for the employee

1. Employees should also be able to:
    - Login to the application and pull up their salary information for a particular pay cycle


1. Supervisors should be able to
    - Generate a Salary Summary for the department
    - Create/Edit an employee in their department and add their basic salary information
    - Add/Edit Overtime hours worked for the employees in their department
    - Enter Sick or absent dates for an employee. Absent or sick days are not paid but need to be entered in the system
<!-- ------------------- -->





<!-- ------------------- -->
<!-- Personal note -->
<!-- ------------------- -->
overtime rate (table)
over time rate x overflow


<!-- Tables -->
<< department >>
- overtime - if num hours work is > expected hours worked
- rate
- departments
        - Operations
        - Sales & Marketing
        - Administration
        - Accounts




<< Employees >> - [views their info only, payslip]
- First Name
- Last Name
- sick
- absent
- email
- password
- accounts
- department_id



<< Suppervisor >>
- First Name
- Last Name
- email
- password
- department_id

<!-- ------------------- -->