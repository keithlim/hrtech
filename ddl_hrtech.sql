DROP TABLE IF EXISTS Employee;

CREATE TABLE Employee (
	id TEXT UNIQUE NOT NULL CONSTRAINT employee_id CHECK(id ~ '^[A-Za-z0-9]+$'),
	login TEXT UNIQUE deferrable initially deferred NOT NULL CONSTRAINT employee_login CHECK(login ~ '^[A-Za-z0-9]+$'),
	name TEXT NOT NULL,
	salary DECIMAL(10,2) NOT NULL CONSTRAINT employee_salary CHECK(salary >= 0.0)
);