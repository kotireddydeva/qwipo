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

