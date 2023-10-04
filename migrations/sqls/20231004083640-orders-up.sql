/* create enum for status of Order*/
CREATE TYPE OrderStatus AS ENUM ('active', 'complete');

/* create order table */
CREATE TABLE IF NOT EXISTS orders (
    order_id     SERIAL      PRIMARY KEY,
    user_id      INTEGER     NOT NULL, 
    status       OrderStatus NOT NULL,

    FOREIGN KEY (user_id) REFERENCES users (user_id) ON DELETE CASCADE ON UPDATE CASCADE
 );