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

 function allDepartments(){
    const sql  = "SELECT * FROM department"
    db.query(sql, function (err, results) {
        if (err) {
            console.log(err);
          }
          console.log(results);
        
        })

    // SELECT * FROM departments
 }

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
}