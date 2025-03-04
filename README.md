# 🚴‍♂️ Bi-Cycle Store Backend

## 📌 Project Overview

The **Bi-Cycle Store Backend** is a robust RESTful API built with **Node.js, Express, and MongoDB** to support the Bi-Cycle Store application. It handles **user authentication, product management, order processing, and payment integration** with role-based access control for customers and admins.

## 🛠️ Tech Stack

- **Backend Framework:** Node.js, Express.js
- **Database:** MongoDB with Mongoose ODM
- **Authentication:** JWT (JSON Web Token) & bcrypt for password hashing
- **State Management:** Redux (in frontend)
- **API Testing:** Postman
- **Deployment:** Vercel (or any cloud hosting)
- **Payment Gateway:** SSLCommerz / Stripe (configurable)

---

## 🚀 Features

### **🔐 Authentication & Authorization**
- Role-based access control (Customer & Admin)
- JWT authentication with secure password hashing
- User registration, login, and logout functionality

### **🛍️ Product Management**
- **Admins can:**
  - Add, edit, and delete bicycles
  - Manage stock levels and pricing
- **Users can:**
  - View all bicycles with filtering & sorting options
  - View detailed product descriptions

### **📦 Order Management**
- Users can place orders and track order status
- Admins can update order status (pending, shipped, delivered, canceled)
- Stock levels automatically update after an order is placed

### **💳 Payment Integration**
- Supports secure payments via **SSLCommerz / Stripe**
- Payment validation and order confirmation

### **📡 API Endpoints**
| Method | Endpoint               | Description                        | Access |
|--------|------------------------|------------------------------------|--------|
| POST   | `/api/auth/register`    | Register a new user               | Public |
| POST   | `/api/auth/login`       | User login & token generation     | Public |
| GET    | `/api/products`         | Get all bicycles                  | Public |
| GET    | `/api/products/:id`     | Get a single bicycle by ID        | Public |
| POST   | `/api/products`         | Add a new bicycle                 | Admin  |
| PUT    | `/api/products/:id`     | Update bicycle details            | Admin  |
| DELETE | `/api/products/:id`     | Delete a bicycle                  | Admin  |
| POST   | `/api/orders`           | Place a new order                 | User   |
| GET    | `/api/orders/:userId`   | Get user orders                   | User   |
| PUT    | `/api/orders/:orderId`  | Update order status               | Admin  |

---

## ⚙️ Installation & Setup

npm install

- Create a **.env** file and configure the following:
```env
PORT=5000
DATABASE_URL="your mongodb url"
BCRYPT_SALT_ROUNDS=12
JWT_ACCESS_SECRET="jwt secret"
SP_ENDPOINT=https://sandbox.shurjopayment.com
SP_USERNAME="your surjopay username"
SP_PASSWORD="your surjopay password"
SP_PREFIX=SP
```


## Run the server
npm run dev


