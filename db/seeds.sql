USE stores_db;

INSERT INTO department( id, dep_name)
VALUES
(001,"Mangemenent"),
(002,"Maintenance"),
(003,"Laborers"),
(004,"Customer_Service"),
(005,"IT_Department");

INSERT INTO roles ( id, title, salary, department_id)
VALUES
(301, "Store_manager", 96500, 001),
(302, "Shift_manager", 84000, 001),
(303, "Maintenance", 66000, 002),
(304, "Packers", 38000, 003),
(305, "Drivers", 68000, 003),
(306, "Forklift Drivers", 42000, 003),
(307, "Customer_rep", 48000, 004),
(308, "Frontend_developer", 75000, 005);

INSERT INTO empolyees( first_name, last_name, role_id, manager)
VALUES
("Luffy","Pirate King", 301, true),
("Zoro", "Master Swordsman", 305, false),
("Franky","Cyborg", 303, false),
("Gon", "Freaks", 307, false),
("Goku","UI", 304, false),
("Vegeta", "SayianPrince",302, true),
("Killua","Zultic", 308, false),
("Sanji","Blackleg", 306, false);