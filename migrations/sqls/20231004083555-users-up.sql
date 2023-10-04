/* create user table */
CREATE TABLE IF NOT EXISTS users (
    user_id         SERIAL       PRIMARY KEY,
    first_name      VARCHAR(100) NOT NULL,
    last_name       VARCHAR(100) NOT NULL,
    user_password   VARCHAR(255) NOT NULL
);