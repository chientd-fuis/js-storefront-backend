# API Requirements
The company stakeholders want to create an online storefront to showcase their great product ideas. Users need to be able to browse an index of all products, see the specifics of a single product, and add products to an order that they can view in a cart page. You have been tasked with building the API that will support this application, and your coworker is building the frontend.

These are the notes from a meeting with the frontend developer that describe what endpoints the API needs to supply, as well as data shapes the frontend and backend have agreed meet the requirements of the application. 

## API Endpoints
### Products
- Index
  ```
  GET /products
  ```
- Show (Path Variables: `productID: string`)
  ```
  GET /products/:productID
  ```
- Create [token required] (Body: `{ name: string, price: number }`)
  ```
  POST /products/add
  ```
- Update [token required] (Path Variables: `productID: string`)
  ```
  PUT /products/:productID?name=:update_name&price=:update_price
  ```
  - Path Variables: `productID: string`
  - Query Parammeters: `name: string`, `price: number`
- Delete [token required]
  ```
  DELETE /products/:productID
  ```
  - Path Variables: `productID: string`
### Users
- Show [token required] (Path Variables: `userID: string`)
  ```
  GET /users/:userID
  ```
- Create (Body: `{ first_name: string, last_name: string, password: string }`)
  ```
  POST /users/sign-up
  ```
- Login (Body: `{ user_id: string, password: string }`)
  ```
  POST /users/sign-in
  ```
- Update [token required] (Body: `{ first_name: string, last_name: string, password: string }`)
  ```
  PUT /users/:userID
  ```
  - Path Variables: `userID: string`
- Delete [token required] 
  ```
  DELETE /users/:userID
  ```
  - Path Variables: `userID: string`

### Orders
- Show orders by ID
  ```
  GET /orders/:orderID
  ```
  - Path Variables: `orderID: number`
- Show orders by user_ID
  ```
  GET /orders?user_id=:userID
  ```
  - Query parameters: `user_id: number`
- Create [token required] 
  ```
  POST /orders/add
  ``` 
  - Body: `{ products: [ { id: string, quantity: number } ] }`

- Update quality of product in orders [token required]
  ```
  PUT /orders/:orderID/:productID?quality=update_quality
  ```
  - Query parameters: `quality: number`
  - Path Variables: `orderID: number` , `productID: number`
- Delete products in orders [token required] 
  ```
  DELETE /orders/:orderID/:productID
  ```
  - Path Variables: `orderID: number` , `productID: number`
- Update status of orders [token required]
  ```
  PUT /orders/:orderID?status=update_status
  ```
  - Query parameters: `status: string (complete or active)`
  - Path Variables: `orderID: number`  

## Data Shapes
#### Product (table name: *products*)
- id     - SERIAL       - Primary Key
- name   - VARCHAR(100) - NOT NULL
- price  - INTEGER      - NOT NULL

#### User (table name: *users*)
- user_id        - SERIAL - Primary Key
- firstName      - VARCHAR(100) - NOT NULL
- lastName       - VARCHAR(100) - NOT NULL
- user_password  - VARCHAR(255) - NOT NULL

#### Orders (table name: *orders*)
- id        - SERIAL      - Primary Key
- user_id   - INTEGER     - NOT NULL
- status    - OrderStatus - NOT NULL

#### Order Details (table name: *order_details*)
- order_id   - INTEGER - Primary Key(order_id, product_id)
- product_id - INTEGER - Primary Key(order_id, product_id)
- quantity   - INTEGER - NOT NULL

#### Order Status Enum (*OrderStatus*)
- ENUM ('active', 'complete')