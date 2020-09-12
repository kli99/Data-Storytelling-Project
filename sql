-- Create Table
CREATE TABLE restaurant (
	id SERIAL PRIMARY KEY,
	record_id INT,
	name VARCHAR,
	borough VARCHAR,
	building VARCHAR,
	street VARCHAR,
	zipcode INT,
	phone VARCHAR,
	cuisin VARCHAR,
	inspection_date DATE,
	action VARCHAR,
	violation_code VARCHAR,
	description VARCHAR,
	flag VARCHAR,
	score INT,
	grade VARCHAR,
	inspection_type VARCHAR,
	lat Numeric,
	lng Numeric,
	census_tract INT
);