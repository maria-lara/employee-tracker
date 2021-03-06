

DROP DATABASE IF EXISTS employee_trackerDB;
CREATE DATABASE employee_trackerDB;
USE employee_trackerDB;


CREATE TABLE department(
    id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(30)
);


CREATE TABLE role (
    id INT NOT NULL AUTO_INCREMENT,
    title VARCHAR(30),
    salary DECIMAL(10,2),
    department_id INT,
    PRIMARY KEY (id),
    FOREIGN KEY (department_id) REFERENCES department(id)
);


CREATE TABLE employee (
    id INT NOT NULL AUTO_INCREMENT, 
    first_name VARCHAR(30),
    last_name VARCHAR(30),
    role_id INT,
    manager_id INT,
    PRIMARY KEY (id),
    FOREIGN KEY (role_id) REFERENCES role(id),
    FOREIGN KEY (manager_id) REFERENCES employee(id)
);


INSERT INTO department (name) VALUES ("Operations");
INSERT INTO department (name) VALUES ("Sales");
INSERT INTO department (name) VALUES ("Engineering");
INSERT INTO department (name) VALUES ("Customer Success");
INSERT INTO department (name) VALUES ("Finance");


INSERT INTO role (title, salary, department_id) VALUES ("Chief Operating Officer", 500000, 2);
INSERT INTO role (title, salary, department_id) VALUES ("Sales lead", 250000, 4);
INSERT INTO role (title, salary, department_id) VALUES ("Software Engineer", 200000, 3);
INSERT INTO role (title, salary, department_id) VALUES ("Customer Success Manager", 150000, 1);
INSERT INTO role (title, salary, department_id) VALUES ("Chief Financial Officer", 180000, 2);



INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES ("Amal", "Clooney", 1, null);
INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES ("Maria", "Lara", 2, null);
INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES ("Olivia", "Benson", 3,3);
INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES ("Stacey", "Abrams", 4, 2);
INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES ("Meghan", "Markel", 5, null);


SELECT * FROM department;
SELECT * FROM role;
SELECT * FROM employee;