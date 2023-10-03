# API Requirements
The company stakeholders want to create an online storefront to showcase their great product ideas. Users need to be able to browse an index of all products, see the specifics of a single product, and add products to an order that they can view in a cart page. You have been tasked with building the API that will support this application, and your coworker is building the frontend.

These are the notes from a meeting with the frontend developer that describe what endpoints the API needs to supply, as well as data shapes the frontend and backend have agreed meet the requirements of the application. 

## API Endpoints
#### Products
- Index (**GET** `/products` )
- Show (**GET** `/products/:productID` )
- Create [token required] (**POST** `/products/add` )
   - Body: `{ name: string, price: number }`
- Update [token required] (**PUT** `/products/:productID?name=:update_name&price=:update_price` )
- Delete [token required] (**DELETE** `/products/:productID`)

#### Users
- Show [token required] (**GET** `/users/:userID` )
- Create (**POST** `/users/sign-up` )
  - Body: `{ first_name: string, last_name: string, password: string }`
- Login (**POST** `/users/sign-in` )
  - Body: `{ user_id: string, password: string }`
- Update (**PUT** `/users/:userID` )
  - Body: `{ first_name: string, last_name: string, password: string }`
- Delete (**DELETE** `/users/userID` )

#### Orders
- Show orders by ID[token required] (**GET** `/orders/:orderID` )
- Show orders by user_ID[token required] (**GET** `/orders?user_id=:userID` )
- Create [token required] (**POST** `/orders/add` )
  - Body: `{ products: [ { product_id: string, quantity: number } ] }`
- Update quality of product in orders [token required] (**PUT** `/orders/:orderID/:productID?quality=update_quality` )
- Delete products in orders [token required] (**DELETE** `/orders/:orderID/:productID` )
- Update status of orders [token required] (**PUT** `/orders/:orderID?status=update_status` )
- Delete orders [token required] (**DELETE** `/orders/:orderID` )

## Data Shapes
#### Product
- id
- name
- price

#### User
- id
- firstName
- lastName
- password

#### Orders
- id
- user_id
- status of order (active or complete)

#### Order Details
- id of order
- id of each product in the order
- quantity of each product in the order
