/* create products table*/
CREATE TABLE IF NOT EXISTS products (
    id    SERIAL        PRIMARY KEY, 
    name  VARCHAR(100)  NOT NULL, 
    price INTEGER       NOT NULL
);