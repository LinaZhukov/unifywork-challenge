CREATE TABLE persons (
     id SERIAL,
     first_name VARCHAR(50),
     last_name VARCHAR(50),
     dob DATE,
     email VARCHAR(255),
     PRIMARY KEY (id)
);

COPY persons(first_name, last_name, dob, email)
    FROM 'docs/the-tate-collection.csv'
    DELIMITER ';'
    CSV HEADER;
