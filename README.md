# Storefront Backend Project

## Getting Started
Clone project
```
git clone https://github.com/chientd-fuis/js-storefront-backend.git
```

Add a `.env` file to your root directory
```
POSTGRES_HOST=127.0.0.1
POSTGRES_DB=shopping
POSTGRES_TEST_DB=shopping_test
POSTGRES_USER=shopping_user
POSTGRES_PASSWORD=password123
ENV=dev
SALT_ROUND=5
BCRYPT_PASSWORD=secret_password_chientd
TOKEN_SECRET=secret_token_chientd
```
## Installation

cd to your project

- Install dependencies
    ```
    npm install
    ```
- Run docker
    ```
    docker-compose up
    ```
- Create database for dev
    ```
    npm run migrate.up
    ```
## Start application (http://localhost:3000)
- Run watch
    ```
    npm run watch
    ```
- Run with nodemon
    ```
    npm run start
    ```
- build project
    ```
    npm run build
    ```
- Run format code
    ```
    npm run format
    ```
- delete database
    ```
    npm run migrate.down
    ```
## Run test
```
npm run test
```