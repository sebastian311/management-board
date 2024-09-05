const express = require('express');
const bodyParser = require('body-parser');
const Employee = require('./employeeModel');

const app = express();
const port = 3000;

// Middleware
app.use(bodyParser.json());

// CRUD operations using the Employee model

// Get all employees
app.get('/employees', (req, res) => {
    Employee.getAll((err, rows) => {
        if (err) {
            res.status(400).json({ error: err.message });
            return;
        }
        res.json({ data: rows });
    });
});

// Get a single employee by ID
app.get('/employees/:id', (req, res) => {
    const { id } = req.params;
    Employee.getById(id, (err, row) => {
        if (err) {
            res.status(400).json({ error: err.message });
            return;
        }
        res.json({ data: row });
    });
});

// Create a new employee
app.post('/employees', (req, res) => {
    const newEmployee = req.body;
    Employee.create(newEmployee, (err, id) => {
        if (err) {
            res.status(400).json({ error: err.message });
            return;
        }
        res.json({ id });
    });
});

// Update an employee by ID
app.put('/employees/:id', (req, res) => {
    const { id } = req.params;
    const updatedEmployee = req.body;
    Employee.update(id, updatedEmployee, (err, changes) => {
        if (err) {
            res.status(400).json({ error: err.message });
            return;
        }
        res.json({ changes });
    });
});

// Delete an employee by ID
app.delete('/employees/:id', (req, res) => {
    const { id } = req.params;
    Employee.delete(id, (err, changes) => {
        if (err) {
            res.status(400).json({ error: err.message });
            return;
        }
        res.json({ changes });
    });
});

// Start the server
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
