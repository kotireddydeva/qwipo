const express = require('express');
const sqlite3 = require('sqlite3').verbose();
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

const db = new sqlite3.Database('./database.db', (err) => {
    if (err) {
        console.error(err.message);
    }
    console.log('Connected to the SQLite database.');
});

// Get All Customers Data

app.get('/api/customers', (req, res) => {
    const sql = "SELECT * FROM customers";
    db.all(sql, [], (err, rows) => {
        if (err) {
            res.status(400).json({ "error": err.message });
            return;
        }
        res.json({
            "message": "success",
            "data": rows
        });
    });
});

// Create New Customer

app.post('/api/customers', (req, res) => {
    const { firstName, lastName, phoneNumber } = req.body;

    if (!firstName || !lastName || !phoneNumber) {
        return res.status(400).json({ "error": "All fields are required" });
    }

    const sql = `INSERT INTO 
    customers (first_name, last_name, phone_number) 
    VALUES (?, ?, ?)`;

    db.run(sql, [firstName, lastName, phoneNumber], function (err) {
        if (err) return res.status(400).json({ "error": err.message });
        res.json({
            "message": "success",
            "data": {
                id: this.lastID,
                firstName,
                lastName,
                phoneNumber
            }
        });
    });
});

// Get Single Customer Data

app.get('/api/customers/:id', (req, res) => {
    const { id } = req.params;
    const sql = "SELECT * FROM customers WHERE id = ?";
    db.get(sql, [id], (err, row) => {
        if (err) {
            return res.status(400).json({ "error": err.message });
        }
        if (!row) {
            return res.status(404).json({ "message": "Customer not found" });
        }
        res.json({
            "message": "success",
            "data": row
        });
    });
});

// Update Customer Data

app.put('/api/customers/:id', (req, res) => {
    const { id } = req.params;
    const { firstName, lastName, phoneNumber } = req.body;

    if (!firstName || !lastName || !phoneNumber) {
        return res.status(400).json({ "error": "All fields are required" });
    }

    const sql = `UPDATE customers 
    SET first_name = ?, 
    last_name = ?, 
    phone_number = ? 
    WHERE id = ?`;

    db.run(sql, [firstName, lastName, phoneNumber, id], function (err) {
        if (err) {
            return res.status(400).json({ "error": err.message });
        }
        if (this.changes === 0) {
            return res.status(404).json({ "message": "Customer not found" });
        }
        res.json({
            "message": "success",
            "data": { id, firstName, lastName, phoneNumber },
            "changes": this.changes
        });
    });
});

// Delete Customer

app.delete('/api/customers/:id', (req, res) => {
    const {id} = req.params
    sql = "DELETE FROM customers WHERE id = ?";
    db.run(sql, [id], function (err) {
        if(err) {
            res.status(400).json({"error": err.message});
        }
        if (this.changes === 0) {
            return res.status(404).json({ "message": "Customer not found" });
        }
        res.json({
            "message": "success",
            "deletedId": id,
            "changes": this.changes
        });
    });

});

// Add Address for Customer

app.post('/api/customers/:id/addresses', (req, res) => {
    const {id} = req.params;
    const {addressDetails, city, state, pinCode} = req.body

    if (!addressDetails || !city || !state || !pinCode) {
        return res.status(400).json({ "error": "All fields are required" });
    }

    sql = `INSERT INTO 
    addresses (customer_id, address_details, city, state, pin_code) 
    VALUES (?, ?, ?, ?, ?)`;

    db.run(sql, [id, addressDetails, city, state, pinCode], function (err) {
        if (err) {
            return res.status(400).json({"error": err.message});
        }
        res.json({
            "message": "success",
            "data": {
                id: this.lastID,
                addressDetails,
                city,
                state,
                pinCode
            }
        });

    });
});

//Get All Addresses of Customer

app.get('/api/customers/:id/addresses', (req, res) => {
    const {id} = req.params
    const sql = "SELECT * FROM addresses where customer_id = ?";
    db.all(sql, [id], (err, rows) => {
        if (err) {
            return res.status(400).json({"error": err.message});
        }
        res.json({
            "message": "success",
            "data": rows
        });
    });
});

//Update Address

app.put('/api/addresses/:addressId', (req, res) => {
    const {addressId} = req.params
    const {addressDetails, city, state, pinCode} = req.body

    if (!addressDetails || !city || !state || !pinCode) {
        return res.status(400).json({ "error": "All fields are required" });
    }

    sql = `
    UPDATE addresses
    SET address_details = ?,
    city = ?,
    state = ?,
    pin_code = ?
    WHERE id = ?
    `;

    db.run(sql, [addressDetails, city, state, pinCode, addressId], function (err) {

        if (err) {
            return res.status(400).json({ "error": err.message });
        }
        if (this.changes === 0) {
            return res.status(404).json({ "message": "Address not found" });
        }
        res.json({
            "message": "success", 
            "updatedId": addressId, 
            "changes": this.changes 
        });

    });
});

//Delete Address

app.delete('/api/addresses/:addressId', (req, res) => {
    const { addressId } = req.params;
    const sql = "DELETE FROM addresses WHERE id = ?";

    db.run(sql, [addressId], function (err) {

        if (err) {
            return res.status(400).json({ "error": err.message });
        }
        if (this.changes === 0) {
            return res.status(404).json({ "message": "Address not found" });
        }
        res.json({ "message": "success", "deletedId": addressId });
    });
});

const PORT = 5000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

