/* create user table */
CREATE TABLE IF NOT EXISTS users (
    user_id         SERIAL       PRIMARY KEY,
    user_first_name VARCHAR(100) NOT NULL,
    user_last_name  VARCHAR(100) NOT NULL,
    user_password   VARCHAR(255) NOT NULL
);

/* create products table*/
CREATE TABLE IF NOT EXISTS products (
    product_id    SERIAL        PRIMARY KEY, 
    product_name  VARCHAR(100)  NOT NULL, 
    product_price NUMERIC       NOT NULL
);

/* create enum for status of Order*/
CREATE TYPE OrderStatus AS ENUM ('active', 'complete');

/* create order table */
CREATE TABLE IF NOT EXISTS orders (
    order_id     SERIAL      PRIMARY KEY,
    user_id      INTEGER     NOT NULL, 
    order_status OrderStatus NOT NULL,

    FOREIGN KEY (user_id) REFERENCES users (user_id) ON DELETE CASCADE ON UPDATE CASCADE
 );

/* create order_details table */
CREATE TABLE IF NOT EXISTS order_details (
    order_id       INTEGER NOT NULL,
    product_id     INTEGER NOT NULL,  
    quantity       INTEGER NOT NULL, 
    PRIMARY KEY (order_id, product_id),
    FOREIGN KEY (product_id) REFERENCES products (product_id) ON DELETE CASCADE ON UPDATE CASCADE,
    FOREIGN KEY (order_id)   REFERENCES orders (order_id)     ON DELETE CASCADE ON UPDATE CASCADE
 );