const sqlite3 = require('sqlite3').verbose();

// Connect to the SQLite database
const db = new sqlite3.Database(':memory:');

// Initialize the database
db.serialize(() => {
    db.run(`CREATE TABLE employee (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT NOT NULL,
        position TEXT NOT NULL,
        salary REAL NOT NULL
    )`);

    db.run(`INSERT INTO employee (name, position, salary) VALUES ('Alice Johnson', 'Software Engineer', 80000)`);
    db.run(`INSERT INTO employee (name, position, salary) VALUES ('Bob Smith', 'Product Manager', 95000)`);
    db.run(`INSERT INTO employee (name, position, salary) VALUES ('Charlie Brown', 'Designer', 70000)`);
    db.run(`INSERT INTO employee (name, position, salary) VALUES ('Diana Prince', 'HR Specialist', 60000)`);
});

// Employee model methods
const Employee = {
    getAll: (callback) => {
        db.all('SELECT * FROM employee', [], (err, rows) => {
            callback(err, rows);
        });
    },

    getById: (id, callback) => {
        db.get('SELECT * FROM employee WHERE id = ?', [id], (err, row) => {
            callback(err, row);
        });
    },

    create: (employee, callback) => {
        const { name, position, salary } = employee;
        db.run(
            'INSERT INTO employee (name, position, salary) VALUES (?, ?, ?)',
            [name, position, salary],
            function (err) {
                callback(err, this?.lastID);
            }
        );
    },

    update: (id, employee, callback) => {
        const { name, position, salary } = employee;
        db.run(
            'UPDATE employee SET name = ?, position = ?, salary = ? WHERE id = ?',
            [name, position, salary, id],
            function (err) {
                callback(err, this?.changes);
            }
        );
    },

    delete: (id, callback) => {
        db.run('DELETE FROM employee WHERE id = ?', [id], function (err) {
            callback(err, this?.changes);
        });
    },
};

module.exports = Employee;
