DROP TABLE IF EXISTS
Employee;

CREATE TABLE Employee (
	id TEXT UNIQUE NOT NULL CONSTRAINT employee_id CHECK(id ~ '^[A-Za-z0-9]+$'),
	login TEXT UNIQUE deferrable initially deferred NOT NULL CONSTRAINT employee_login CHECK(login ~ '^[A-Za-z0-9]+$'),
	name TEXT NOT NULL,
	salary DECIMAL(10,2) NOT NULL CONSTRAINT employee_salary CHECK(salary >= 0.0)
);

insert into employee values 
('01', 'A', 'Mr A', 1234),
('02', 'B', 'Mr B', 1234);

INSERT INTO employee (id, login, name, salary) 
VALUES ('03', 'C', 'Mr C', 1223)
on conflict (id) do update set
id = excluded.id, 
login = excluded.login,
name = excluded.name,
salary = excluded.salary;