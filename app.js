const express = require('express');
const config = require('./config');
const dbType = config.dbType;
let db;

if (dbType === 'mysql') {
  const mysql = require('mysql2');
  db = mysql.createConnection(config.mysqlConfig);

  // Connect to MySQL and create database if not exists
  db.connect((err) => {
    if (err) {
      throw err;
    }
    console.log('MySQL connected');
    db.query(`CREATE DATABASE IF NOT EXISTS ${config.mysqlConfig.database}`, (err) => {
      if (err) {
        throw err;
      }
      console.log(`Database '${config.mysqlConfig.database}' created or already exists`);
      db.query(`USE ${config.mysqlConfig.database}`);
      db.query(`CREATE TABLE IF NOT EXISTS survey_results (
        id INT AUTO_INCREMENT PRIMARY KEY,
        device VARCHAR(255),
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )`);
      console.log('Table created or already exists');
    });
  });
} else if (dbType === 'sqlite') {
  const sqlite3 = require('sqlite3').verbose();
  db = new sqlite3.Database(config.sqliteConfig.filename);

  // Create table if not exists (SQLite)
  db.run(`CREATE TABLE IF NOT EXISTS survey_results (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    device TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
  )`, (err) => {
    if (err) {
      throw err;
    }
    console.log('SQLite table created or already exists');
  });
}

const app = express();
const port = 3000;

// Middleware
app.set('view engine', 'ejs');
app.use(express.urlencoded({ extended: false }));

// Routes
app.get('/', (req, res) => {
  res.render('index');
});

app.post('/survey', (req, res) => {
  const { device } = req.body;
  let sql;
  if (dbType === 'mysql') {
    sql = 'INSERT INTO survey_results (device) VALUES (?)';
  } else if (dbType === 'sqlite') {
    sql = 'INSERT INTO survey_results (device) VALUES (?)';
  }
  db.query(sql, [device], (err) => {
    if (err) {
      throw err;
    }
    res.redirect('/results');
  });
});

app.get('/results', (req, res) => {
  let sql;
  if (dbType === 'mysql') {
    sql = 'SELECT device, COUNT(*) AS count FROM survey_results GROUP BY device';
  } else if (dbType === 'sqlite') {
    sql = 'SELECT device, COUNT(*) AS count FROM survey_results GROUP BY device';
  }
  db.query(sql, (err, rows) => {
    if (err) {
      throw err;
    }
    res.render('results', { results: rows });
  });
});

app.get('/get-result', (req, res) => {
  let sql;
  if (dbType === 'mysql') {
    sql = 'SELECT device, COUNT(*) AS count FROM survey_results GROUP BY device';
  } else if (dbType === 'sqlite') {
    sql = 'SELECT device, COUNT(*) AS count FROM survey_results GROUP BY device';
  }
  db.query(sql, (err, rows) => {
    if (err) {
      res.status(500).json({ error: 'Internal Server Error' });
    } else {
      res.json(rows);
    }
  });
});

// Start server
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
