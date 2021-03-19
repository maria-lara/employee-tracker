const inquirer = require("inquirer")
const mysql = require("mysql");
const cTable = require("console.table");


let connection = mysql.createConnection({
  host: 'localhost',
  // Your port; if not 3306
  port: 3306,
   // Your username
  user: 'root',
   // Your passsword
  password: 'Spe8as19!',
   // DB name
  database: 'employee_trackerDB'
});

// Connection //

connection.connect(function(err) {
    if (err) throw err;
    beginPrompt();
});


// Prompt //

function beginPrompt() {
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

var roleList = [];
function selectRole() {
  connection.query("SELECT * FROM role", function(err, res) {
    if (err) throw err
    for (var i = 0; i < res.length; i++) {
      roleList.push(res[i].title);
    }

  })
  return roleList;
}

var managersList = [];
function selectManager() {
  connection.query("SELECT first_name, last_name FROM employee WHERE manager_id IS NULL", function(err, res) {
    if (err) throw err
    for (var i = 0; i < res.length; i++) {
      managersList.push(res[i].first_name);
    }

  })
  return managersList;
}

// 1. View Employees //
function viewAllEmployees() {
    connection.query("SELECT employee.first_name, employee.last_name, role.title, role.salary, department.name, CONCAT(e.first_name, ' ' ,e.last_name) AS Manager FROM employee INNER JOIN role on role.id = employee.role_id INNER JOIN department on department.id = role.department_id left join employee e on employee.manager_id = e.id;", 
    function(err, res) {
      if (err) throw err
      console.table(res)
      beginPrompt()
  })
}

// 2. View Employees by Role //
function viewAllRoles() {
    connection.query("SELECT employee.first_name, employee.last_name, role.title AS Title FROM employee JOIN role ON employee.role_id = role.id;", 
    function(err, res) {
    if (err) throw err
    console.table(res)
    beginPrompt()
    })
  }


// 3. View Employees by Dpt //
function viewAllDepartments() {
    connection.query("SELECT employee.first_name, employee.last_name, department.name AS Department FROM employee JOIN role ON employee.role_id = role.id JOIN department ON role.department_id = department.id ORDER BY employee.id;", 
    function(err, res) {
      if (err) throw err
      console.table(res)
      beginPrompt()
    })
  }

// 4. Add an Employee
function addEmployee() { 
  inquirer.prompt([
      {
        name: "firstname",
        type: "input",
         message: "Enter their first name:"
      },
      {
        name: "lastname",
        type: "input",
        message: "Enter their last name:"
      },
      {
        name: "role",
        type: "list",
        message: "What is their role? ",
        choices: selectRole()
      },
      {
          name: "choice",
          type: "rawlist",
          message: "What is their managers name?",
          choices: selectManager()
      }
  ]).then(function (val) {
    var roleId = selectRole().indexOf(val.role) + 1
    var managerId = selectManager().indexOf(val.choice) + 1
    connection.query("INSERT INTO employee SET ?", 
    {
        first_name: val.firstName,
        last_name: val.lastName,
        manager_id: managerId,
        role_id: roleId
          
    },function(err){
        if (err) throw err
        console.table(val)
        beginPrompt()
    })

  })
}
// 5. Update an employee //
function updateEmployee() {
  connection.query("SELECT employee.last_name, role.title FROM employee JOIN role ON employee.role_id = role.id;", function(err, res) {
   if (err) throw err
   console.log(res)


  inquirer.prompt([
        {
          name: "lastName",
          type: "rawlist",
          choices: function() {
            var lastName = [];
            for (var i = 0; i < res.length; i++) {
              lastName.push(res[i].last_name);
            }
            return lastName;
          },
          message: "What is the Employee's last name? ",
        },
        {
          name: "role",
          type: "rawlist",
          message: "What is the Employees new title? ",
          choices: selectRole()
        },
    ]).then(function(val) {
      var roleId = selectRole().indexOf(val.role) + 1
      connection.query("UPDATE employee SET WHERE ?", 
      {
        last_name: val.lastName
         
      }, 
      {
        role_id: roleId
         
      }, 
      function(err){
          if (err) throw err
          console.table(val);
          beginPrompt();
      })
    });
});

}
// 6. Add a new role //

function addRole() { 
  connection.query("SELECT role.title AS Title, role.salary AS Salary FROM role", function(err, res) {
    inquirer.prompt([
         {
          name: "Title",
          type: "input",
          message: "What is the roles' title?"
        },
        {
          name: "Salary",
          type: "input",
          message: "What is the role's salary?"
        } 
    ]).then(function(res) {
        connection.query(
            "INSERT INTO role SET ?",
            {
              title: res.Title,
              salary: res.Salary,
            },
            function(err) {
                if (err) throw err
                console.table(res);
                beginPrompt();
              }
          )
  
      });
    });
    }

//7. Add a new dpt 
function addDepartment() { 

    inquirer.prompt([
        {
          name: "name",
          type: "input",
          message: "What is the name of the new department?"
        }
    ]).then(function(res) {
        var query = connection.query(
            "INSERT INTO department SET ? ",
            {
              name: res.name
            
            },
            function(err) {
                if (err) throw err
                console.table(res);
                beginPrompt();
            }
        )
    })
  }