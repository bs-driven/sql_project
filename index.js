const inquirer = require("inquirer");
const mysql = require('mysql2');

const db = mysql.createConnection(
    {
      host: 'localhost',
      user: 'root',
      password: 'S9890$amuel32',
      database: 'store_db'
    },
    console.log(`Connected to the movies_db database.`)
  );

  function init(){
    inquirer.prompt(
        { type: 'list',
        message: 'What are you looking to do today?',
        name: 'startQuestion',
        choices: ["view all departments", "view all roles","view all employees", "add a department", "add a role", "add an employee", "update an employee role"]
        }) .then((response) =>
        console.log(response)
      );
}
init();

 function viewDepartments(){
    const sql  = "SELECT * FROM department"
    db.query(sql, function (err, results) {
        if (err) {
            console.log(err);
          }
          console.log(results);
        
        })

    // SELECT * FROM departments
 };
 viewDepartments();

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
          console.log(results);
        
        })
    })
};

function viewRoles(){
    const sql = "SELCET * FROM roles";
    db.query(sql, function (err, results) {
        if (err) {
            console.log(err);
          }
          console.log(results);
        
        })
};

function viewEmpolyees(){
    const sql = "SELECT * FROM empolyees";
    db.query(sql, function (err, results) {
        if (err) {
            console.log(err);
          }
          console.log(results);
        
        })
};

function addRole(){
    inquirer.prompt(
        {
            type:"input",
            message: "Please name the role to be added.",
            name: "RoleName"
        } 
    ) .then((response) =>{
    console.log(response)
 

    const sql = "INSERT INTO roles (title) VALUES (?)"
    db.query(sql, params, (err, results) => {
        if (err) {
            console.log(err);
          }
          console.log(results);
        
        })
    })
};

function addEmpolyees(){
    inquirer.prompt(
        {
            type:"input",
            message: "Please enter the empolyees first name.",
            name: "EmpolyeeFirstName"
        } 
    ) .then((response) =>{
    console.log(response)

    const sql = "INSERT INTO empolyees (first_name) VALUES (?)"
    db.query(sql, params, (err, results) => {
        if (err) {
            console.log(err);
          }
          console.log(results);
        })
    });
    inquirer.prompt(
        {
            type:"input",
            message:"Please enter the empolyees last name",
            name: "EmpolyeeLastNAme"
        }
    )  .then((response) =>{
        console.log(response)
        
        const sql = "INSERT INTO empolyees (last_name) VALUE (?)"
        db.query(sql, params, (err, results) => {
            if (err) {
                console.log(err);
                }
                console.log(results);
            })
        });
};