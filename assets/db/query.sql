SELECT *
FROM roles
JOIN department ON roles.department_id = department.id;


SELECT *
FROM empolyee
JOIN roles ON empolyee.role_id = roles.id;