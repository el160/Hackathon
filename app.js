const express = require("express");
const bodyParser = require("body-parser");
const mysql = require("mysql2");
const dotenv = require("dotenv");
const authRoutes = require("./routes/authRoutes");
const careerRoutes = require("./routes/careerRoutes");
const trackingRoutes = require("./routes/trackingRoutes");

dotenv.config();
const app = express();

// Middleware
app.use(bodyParser.json());

// Database Connection
const db = mysql.createConnection({
  host: process.env.DB_HOST || "localhost",
  user: process.env.DB_USER || "root",
  password: process.env.DB_PASSWORD || "",
  database: process.env.DB_NAME || "intelligent_career_guidance",
});

// Connect to MySQL and Create Database if it doesn't exist
db.connect((err) => {
  if (err) {
    console.error("Database connection failed:", err.message);
    return;
  }
  console.log("Connected to MySQL Database");

  // Create Database and Tables
  const createDatabaseAndTables = `
    CREATE DATABASE IF NOT EXISTS intelligent_career_guidance;
    USE intelligent_career_guidance;

    CREATE TABLE IF NOT EXISTS users (
      id INT AUTO_INCREMENT PRIMARY KEY,
      email VARCHAR(100) NOT NULL UNIQUE,
      password VARCHAR(255) NOT NULL
    );

    CREATE TABLE IF NOT EXISTS careers (
      id INT AUTO_INCREMENT PRIMARY KEY,
      name VARCHAR(100),
      description TEXT,
      requirements TEXT
    );

    CREATE TABLE IF NOT EXISTS tracking (
      id INT AUTO_INCREMENT PRIMARY KEY,
      user_id INT,
      career_id INT,
      status VARCHAR(50),
      FOREIGN KEY (user_id) REFERENCES users(id),
      FOREIGN KEY (career_id) REFERENCES careers(id)
    );
  `;

  db.query(createDatabaseAndTables, (err, result) => {
    if (err) {
      console.error("Error creating database and tables:", err.message);
    } else {
      console.log("Database and tables created successfully!");
    }
  });
});

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/careers", careerRoutes);
app.use("/api/tracking", trackingRoutes);

// Default Route
app.get("/", (req, res) => {
  res.send("Welcome to the Intelligent Career Guidance System API");
});

// Server Listening
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
