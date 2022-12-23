const inquirer = require("inquirer");
const mysql = require('mysql2');
const db = require('./connection');

db.connect(function (err) {
  if (err) throw err;
  init();
});

  function init(){
    inquirer.prompt(
        { type: 'list',
        message: 'What are you looking to do today?',
        name: 'startQuestion',
        choices: ["view all departments", "view all roles","view all employees", "add a department", "add a role", "add an employee", "update an employee role", "Quit"]
        }) .then((response) =>{
        let choices = response.startQuestion
         // use a switch statement to pick the appropiate fuction for the user selction
        switch(choices){
            case "view all departments":
                viewDepartments();
                break;

            case "view all roles":
                viewRoles();
                break;

            case "view all employees":
                viewEmpolyees();
                break;
            case "add a department":
                addDepartments();
                break;
            case "add a role":
                addRole();
                break;
            case "add an employee":
                addEmpolyees();
                break;
            case "update an employee role":
                updateEmployee();
                break;
            case "Quit":
                quit();
                break;
        }
    });
}

// too look at all the departments within the store
 function viewDepartments(){
    const sql  = "SELECT * FROM department"
    db.query(sql, function (err, results) {
        if (err) {
            console.log(err);
          }
          console.table(results);
          returnMenu();
        })

 };
// too look at all the roles possible
function viewRoles(){
    const sql = "SELECT * FROM roles";
    db.query(sql, function (err, results) {
        if (err) {
            console.log(err);
          }
          console.table(results);
          returnMenu();
        })
};

// too look at all the employees
function viewEmpolyees(){
    const sql = "SELECT * FROM empolyees";
    db.query(sql, function (err, results) {
        if (err) {
            console.log(err);
          }
          console.table(results);
          returnMenu();
        })
};
// add a department to the table
function addDepartments(){
    inquirer.prompt(
        {
            type:"input",
            message: "Department name please.",
            name: "DepartmentName"
        } 
    ) .then((response) =>{
    console.log(response)
 
    const sql = "INSERT INTO department (dep_name) VALUES (?)"
    const params = [response.DepartmentName]

    db.query(sql, params, (err, results) => {
        if (err) {
            console.log(err);
          }
          console.table(results);
        })
        returnMenu();
    })
};

// to add a role to the table
function addRole(){
    inquirer.prompt(
       [ {
            type:"input",
            message: "Please name the role to be added.",
            name: "RoleName"
        },
        {
            type: 'input',
            message: 'Please add this roles salary',
            name: 'RoleSalary'
        },
        {
            type: 'input',
            message: 'Please add which department this role belongs to',
            name: 'RoleDepartment'
        }]
    ) .then((response) =>{

    const sql = "INSERT INTO roles (title,salary, department_id) VALUES (?,?,?)"
    const params = [response.RoleName, response.RoleSalary, response.RoleDepartment]
    db.query(sql, params, (err, results) => {
        if (err) {
            console.log(err);
          }
          console.table(results);
          returnMenu();
        
        })
    })
};

// too add a employee
function addEmpolyees() {
    inquirer.prompt(
        [{
            type:"input",
            message: "Please enter the empolyees first name.",
            name: "firstName"
        },
        {
            type: 'input',
            message: 'Please enter the last name ',
            name: 'lastName'
        },
        {
            type: 'input',
            message: "please eneter  the role_id",
            name: 'employeeRoleId'

        }
    ]
    ) .then((response) =>{

    const sql = "INSERT INTO empolyees (first_name, last_name, role_id) VALUES (?,?,?)"
    const params = [response.firstName, response.lastName, response.employeeRoleId]

    db.query(sql, params, (err, results) => {
        if (err) {
            console.log(err);
          }
          console.table(results);
          returnMenu();
        })
    });

};
// update a employees 
function updateEmployee() {
    inquirer.prompt(
        [{
            type: "number",
            message: "Please enter the employee id",
            name: "updateIdnumber"
        },
        {
            type:'number',
            message:'Please enter the new role_id',
            name: 'NewRoleId'
        },
        {
            type: 'confirm',
            message: 'Please enter Y for yes N for no if this person is now a manager',
            name: 'ManagerValue'
        }
    ]). then((response) =>{
            const sql = "UPDATE empolyees SET role_id = ?, manager = ? WHERE id = ?"
            const param = [response.NewRoleId, response.ManagerValue, response.updateIdnumber]
            db.query(sql, param, (err,results) =>{
                if (err) {
                    console.log(err);
                }
                viewEmpolyees();
            }); 
            })

}

function quit() {
    console.log("Goodbye!");
    process.exit();
  };

  function returnMenu() {
    setTimeout(() => {
        init()        
      },8000);
  };