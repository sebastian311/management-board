const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const sqlite3 = require('sqlite3').verbose();

const app = express();
app.use(bodyParser.json());
app.use(cors());

const db = new sqlite3.Database('./employees.db');

// Create the employees table if it doesn't exist
db.serialize(() => {
  db.run(`CREATE TABLE IF NOT EXISTS employees (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT,
    position TEXT,
    department TEXT
  )`);
});

// Get all employees
app.get('/employees', (req, res) => {
  db.all('SELECT * FROM employees', [], (err, rows) => {
    if (err) {
      res.status(500).send(err.message);
    } else {
      res.json(rows);
    }
  });
});

// Add a new employee
app.post('/employees', (req, res) => {
  const { name, position, department } = req.body;
  const stmt = db.prepare('INSERT INTO employees (name, position, department) VALUES (?, ?, ?)');
  stmt.run([name, position, department], function(err) {
    if (err) {
      res.status(500).send(err.message);
    } else {
      res.status(201).json({ id: this.lastID, name, position, department });
    }
  });
  stmt.finalize();
});

// Update an employee
app.put('/employees/:id', (req, res) => {
  const { id } = req.params;
  const { name, position, department } = req.body;
  const stmt = db.prepare('UPDATE employees SET name = ?, position = ?, department = ? WHERE id = ?');
  stmt.run([name, position, department, id], function(err) {
    if (err) {
      res.status(500).send(err.message);
    } else if (this.changes === 0) {
      res.status(404).send('Employee not found');
    } else {
      res.json({ id, name, position, department });
    }
  });
  stmt.finalize();
});

// Delete an employee
app.delete('/employees/:id', (req, res) => {
  const { id } = req.params;
  const stmt = db.prepare('DELETE FROM employees WHERE id = ?');
  stmt.run(id, function(err) {
    if (err) {
      res.status(500).send(err.message);
    } else if (this.changes === 0) {
      res.status(404).send('Employee not found');
    } else {
      res.status(204).send();
    }
  });
  stmt.finalize();
});

const port = 3000;
app.listen(port, () => console.log(`Server running on http://localhost:${port}`));
