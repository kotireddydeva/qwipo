# Customer Management App

A full-stack web application for managing **customers** and their **multiple addresses**. This project demonstrates proficiency in **React JS (with React Router)**, **Node.js with Express.js**, and **SQLite**, implementing functional CRUD operations, validations, filtering, pagination, and responsive UI design.

---

## Overview

This application allows users to:

- Create, read, update, and delete customer records.
- Manage multiple addresses for each customer.
- Search and filter customers by city, state, or pin code.
- Navigate through paginated data and sort records.
- Handle client-side and server-side validations.
- Display responsive UI compatible with mobile and web.

---

## Tech Stack

**Frontend:**  
- React JS  
- React Router DOM  
- Axios  

**Backend:**  
- Node.js  
- Express.js  
- SQLite 

---

## Features

### Customer Management

- Create new customer with validation.
- View detailed customer information.
- Update customer personal info.
- Delete customer with confirmation.

### Address Management

- Add, edit, or delete multiple addresses.
- Mark a customer as having only one address.
- View all addresses linked to a customer.

### Search & Filters

- Search by city, state, or pin code.
- Reset filters to view all records.
- Sort data by ascending/descending order.

### Pagination

- Navigate between pages containing different customer records.
- Infinite scrolling support on the web.

### Error Handling

- Client-side and server-side validation.

### Responsive Design

- Optimized for devices of various screen sizes using CSS media queries.

---

## Project Structure

```

customer-management-app/
├── client/        
│   ├── src/
│   │   ├── components/
│   │   │   ├── CustomerForm.js
│   │   │   ├── CustomerList.js
│   │   │   ├── AddressForm.js
│   │   │   └── AddressList.js
│   │   ├── pages/
│   │   │   ├── CustomerListPage.js
│   │   │   ├── CustomerDetailPage.js
│   │   │   └── CustomerFormPage.js
│   │   └── App.js
├── server/         
│   ├── index.js
│   └── database.db
└── README.md

````

---

## Setup & Installation

### Backend

1. Navigate to the `server` folder:

```bash
cd server
````

2. Install dependencies:

```bash
npm install express sqlite3 cors
```

3. Start the server:

```bash
node index.js
```

The backend runs at `http://localhost:5000`.

### Frontend

1. Navigate to the `client` folder:

```bash
cd client
```

2. Install dependencies:

```bash
npm install axios react-router-dom
```

3. Start the React app:

```bash
npm start
```

The frontend runs at `http://localhost:3000`.

---

## API Endpoints

### Customers

* `POST /api/customers` – Create new customer
* `GET /api/customers` – Retrieve all customers (supports search, sorting, and pagination)
* `GET /api/customers/:id` – Retrieve single customer
* `PUT /api/customers/:id` – Update customer info
* `DELETE /api/customers/:id` – Delete customer

### Addresses

* `POST /api/customers/:id/addresses` – Add new address
* `GET /api/customers/:id/addresses` – Get all addresses for customer
* `PUT /api/addresses/:addressId` – Update address
* `DELETE /api/addresses/:addressId` – Delete address

---

## Frontend Pages & Components

* `CustomerListPage.js` – Display all customers, with search and filters.
* `CustomerDetailPage.js` – Detailed view of a single customer and their addresses.
* `CustomerFormPage.js` – Form for adding or editing customers.
* `CustomerList.js` – Component to render customer list.
* `CustomerForm.js` – Component for customer form inputs.
* `AddressList.js` – Component to display multiple addresses.
* `AddressForm.js` – Component for adding/editing addresses.

---

## Validation & Error Handling

* **Client-side:** Check empty or invalid form fields.
* **Server-side:** Re-validate all incoming data.
* **Error logging:** Captures all errors during CRUD operations.

---

## Testing

* Manual test all CRUD operations for both customer and address entities.
* Ensure proper feedback messages and form validations.

---
