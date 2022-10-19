const inquirer = require("inquirer");
const mysql = require('mysql2');
const db = require('./connection');



  function init(){
    inquirer.prompt(
        { type: 'list',
        message: 'What are you looking to do today?',
        name: 'startQuestion',
        choices: ["view all departments", "view all roles","view all employees", "add a department", "add a role", "add an employee", "update an employee role", "Quit"]
        }) .then((response) =>{
        // determine which choice was selected, response.choice
        let choices = response.startQuestion
        // use a switch statement where we can evaulate the selected choice and run the corresponding function. EX: for 'View all departments' run the function viewDepartments 
        console.log(response)

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
                //add function to run
                //break;
        }
    });
}
init();

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
    db.query(sql, params, (err, results) => {
        if (err) {
            console.log(err);
          }
          console.table(results);
        })
        returnMenu();
    })
};


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
    console.log(response)

    const sql = "INSERT INTO roles (title,salary, department_id) VALUES (?,?,?)"
    const params = [response.RoleName, response.RoleSalary, response.RoleDepartment]
    db.query(sql, params, (err, results) => {
        if (err) {
            console.log(err);
          }
          console.log(results);
          returnMenu();
        
        })
    })
};


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
    console.log(response)

    const sql = "INSERT INTO empolyees (first_name, last_name, role_id) VALUES (?,?,?)"
    const params = [response.firstName, response.lastName, response.employeeRoleId]

    db.query(sql, params, (err, results) => {
        if (err) {
            console.log(err);
          }
          console.table(results);
        })
    });

//     inquirer.prompt(
//         {
//             type:"input",
//             message:"Please enter the empolyees last name",
//             name: "lastName"
//         }
//     )  .then((response) =>{
//         console.log(response)
        
//         const sql = "INSERT INTO empolyees (last_name) VALUE (?)"
//         db.query(sql, params, (err, results) => {
//             if (err) {
//                 console.log(err);
//                 }
//                 console.table(results);
//             })
//         });
};

function updateEmployee() {
    inquirer.prompt(
        [{
            type: "input",
            message: "Please enter the empolyee id",
            name: "updateIdnumber"
        },
        {
            typee:'input',
            message:'Please enter the new role_id',
            name: 'NewRoleId'
        } ]). then((response) =>{
            console.log(response)
            // columns = the columns you wnat to update,
            // ex: UPDATE book SET title = 'Book Title' WHERE title = "original title"
            // UPDATE employee SET columns = values WHERE condition
            const sql = "UPDATE employee SET role_id = ? Where id = ?"
            db.query(sql, param, (err,results) =>{
                if (err) {
                    console.log(err);
                }
                console.log(results);
            });
                
            });

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