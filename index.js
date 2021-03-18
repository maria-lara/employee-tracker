const inquirer = require("inquirer")
const mysql = require("mysql");
const cTable = require("console.table");

let connection = mysql.createConnection({
  host: "localhost",
  port: 3306,
  user: "root",
  password: "Spe8as19!",
  database: "employee_trackerDB"
});

// Connection //

connection.connect(function(err) {
    if (err) throw err;
    console.log("connected as id " + connection.threadId + "\n");
});


// Prompt //

function startPrompt() {
    inquirer.prompt([
    {
    type: "list",
    message: "What would you like to do?",
    name: "choice",
    choices: [
              "View Employees", 
              "View Employees by Role",
              "View Employees by Deparment",
              "Update an Employee",
              "Add an Employee",
              "Add a new Role",
              "Add a new Department"
            ]
    }
]).then(function(val) {
    switch (val.choice) {
        case "View Employees":
          viewAllEmployees();
        break;

      case "View Employees by Role":
          viewAllRoles();
        break;
      case "View Employees by Deparment":
          viewAllDepartments();
        break;
      
      case "Add an Employee":
            addEmployee();
          break;

      case "Update an Employee":
            updateEmployee();
          break;
  
        case "Add a new Role":
            addRole();
          break;
  
        case "Add a new Department":
            addDepartment();
          break;

        }
})
}

