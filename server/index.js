const express = require('express');
const sqlite3 = require('sqlite3').verbose();
const { open } = require('sqlite');
const path = require('path');
const cors = require('cors');

const app = express();
app.use(express.json());

const allowedOrigins = [
  "http://localhost:3000",
  "https://qwipo-one.vercel.app"
];

app.use(cors({
  origin: function(origin, callback) {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
  credentials: true
}));

const PORT = 5000;
const dbPath = path.join(__dirname, 'database.db');

let db = null;

// Initialize DB and Server
const initializeDbAndServer = async () => {
  try {
    db = await open({
      filename: dbPath,
      driver: sqlite3.Database
    });
    app.listen(PORT, () => {
      console.log(`Server running at http://localhost:${PORT}/`);
    });
  } catch (e) {
    console.error(`Error: ${e.message}`);
  }
};

initializeDbAndServer();

// Root Route
app.get('/', (req, res) => {
  res.send('Server Running at 5000');
});

// ====== CUSTOMERS CRUD ====== //

// Get All Customers
app.get('/api/customers', async (req, res) => {
  try {
    const sql = "SELECT * FROM customers";
    const rows = await db.all(sql);
    res.json({ message: "success", data: rows });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Create Customer
app.post('/api/customers', async (req, res) => {
  const { firstName, lastName, phoneNumber } = req.body;
  if (!firstName || !lastName || !phoneNumber) {
    return res.status(400).json({ error: "All fields are required" });
  }

  try {
    const sql = `INSERT INTO customers (first_name, last_name, phone_number) VALUES (?, ?, ?)`;
    const result = await db.run(sql, [firstName, lastName, phoneNumber]);
    res.json({
      message: "success",
      data: { id: result.lastID, firstName, lastName, phoneNumber }
    });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Get Single Customer
app.get('/api/customers/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const sql = "SELECT * FROM customers WHERE id = ?";
    const row = await db.get(sql, [id]);
    if (!row) return res.status(404).json({ message: "Customer not found" });
    res.json({ message: "success", data: row });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Update Customer
app.put('/api/customers/:id', async (req, res) => {
  const { id } = req.params;
  const { firstName, lastName, phoneNumber } = req.body;
  if (!firstName || !lastName || !phoneNumber) {
    return res.status(400).json({ error: "All fields are required" });
  }

  try {
    const sql = `UPDATE customers SET first_name = ?, last_name = ?, phone_number = ? WHERE id = ?`;
    const result = await db.run(sql, [firstName, lastName, phoneNumber, id]);
    if (result.changes === 0) return res.status(404).json({ message: "Customer not found" });
    res.json({ message: "success", data: { id, firstName, lastName, phoneNumber } });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Delete Customer
app.delete('/api/customers/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const sql = "DELETE FROM customers WHERE id = ?";
    const result = await db.run(sql, [id]);
    if (result.changes === 0) return res.status(404).json({ message: "Customer not found" });
    res.json({ message: "success", deletedId: id });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// ====== ADDRESSES CRUD ====== //

// Add Address
app.post('/api/customers/:id/addresses', async (req, res) => {
  const { id } = req.params;
  const { addressDetails, city, state, pinCode } = req.body;
  if (!addressDetails || !city || !state || !pinCode) {
    return res.status(400).json({ error: "All fields are required" });
  }

  try {
    const sql = `INSERT INTO addresses (customer_id, address_details, city, state, pin_code) VALUES (?, ?, ?, ?, ?)`;
    const result = await db.run(sql, [id, addressDetails, city, state, pinCode]);
    res.json({
      message: "success",
      data: { id: result.lastID, addressDetails, city, state, pinCode }
    });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Get Customer Addresses
app.get('/api/customers/:id/addresses', async (req, res) => {
  const { id } = req.params;
  try {
    const sql = "SELECT * FROM addresses WHERE customer_id = ?";
    const rows = await db.all(sql, [id]);
    res.json({ message: "success", data: rows });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Update Address
app.put('/api/addresses/:addressId', async (req, res) => {
  const { addressId } = req.params;
  const { addressDetails, city, state, pinCode } = req.body;
  if (!addressDetails || !city || !state || !pinCode) {
    return res.status(400).json({ error: "All fields are required" });
  }

  try {
    const sql = `UPDATE addresses SET address_details = ?, city = ?, state = ?, pin_code = ? WHERE id = ?`;
    const result = await db.run(sql, [addressDetails, city, state, pinCode, addressId]);
    if (result.changes === 0) return res.status(404).json({ message: "Address not found" });
    res.json({ message: "success", updatedId: addressId });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Delete Address
app.delete('/api/addresses/:addressId', async (req, res) => {
  const { addressId } = req.params;
  try {
    const sql = "DELETE FROM addresses WHERE id = ?";
    const result = await db.run(sql, [addressId]);
    if (result.changes === 0) return res.status(404).json({ message: "Address not found" });
    res.json({ message: "success", deletedId: addressId });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

