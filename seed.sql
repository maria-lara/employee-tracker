
-- DEPARTMENTS--
INSERT INTO department (name) VALUES ("Operations");
INSERT INTO department (name) VALUES ("Sales");
INSERT INTO department (name) VALUES ("Engineering");
INSERT INTO department (name) VALUES ("Customer Success");
INSERT INTO department (name) VALUES ("Finance");

-- ROLES --
INSERT INTO role (title, salary, department_id) VALUES ("Chief Operating Officer", 500000, 1);
INSERT INTO role (title, salary, department_id) VALUES ("Director of Sales", 250000, 2);
INSERT INTO role (title, salary, department_id) VALUES ("Head of Engineering", 200000, 2);
INSERT INTO role (title, salary, department_id) VALUES ("Customer Success Manager", 150000, 3);
INSERT INTO role (title, salary, department_id) VALUES ("Chief Financial Officer", 180000, 3);


-- EMPLOYEES --
INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES ("Amal", "Clooney", 1, null);
INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES ("Maria", "Lara", 2, 1);
INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES ("Olivia", "Benson", 3, 2);
INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES ("Stacey", "Abrams", 4, 1);
INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES ("Meghan", "Markel", 5, 4);