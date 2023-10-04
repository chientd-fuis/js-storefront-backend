/* create order_details table */
CREATE TABLE IF NOT EXISTS order_details (
    order_id       INTEGER NOT NULL,
    product_id     INTEGER NOT NULL,  
    quantity       INTEGER NOT NULL, 
    PRIMARY KEY (order_id, product_id),
    FOREIGN KEY (product_id) REFERENCES products (id)         ON DELETE CASCADE ON UPDATE CASCADE,
    FOREIGN KEY (order_id)   REFERENCES orders (order_id)     ON DELETE CASCADE ON UPDATE CASCADE
 );