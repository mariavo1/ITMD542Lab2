const db = new Map();
const fs = require('fs');
const path = require('path');
const crypto = require('crypto');

const saveData = () => {
    const stringifyData = JSON.stringify(Array.from(db));
    fs.writeFileSync(path.join(__dirname, '../data/employees.json'), stringifyData);
};

const loadData = () => {
    const fileData = fs.readFileSync(path.join(__dirname, '../data/employees.json'));
    const employeesArray = JSON.parse(fileData);
    employeesArray.forEach(element => {
        db.set(element[0], element[1]);
    });
};

const repo = {
    findAll: () => Array.from(db.values()),
    findByID: (id) => db.get(id),
    create: (employees) => {
        const newEmployee = {
            id: crypto.randomUUID(),
            idNum: employees.idNum,
            firstName: employees.firstName,
            lastName: employees.lastName,
            email: employees.email,
            notes: employees.notes,
        };

        db.set(newEmployee.id, newEmployee);
        saveData();
    },
    deleteByID: (id) => {
        db.delete(id);
        saveData();
    },
    update: (employee) => {
        db.set(employee.id, employee);
        saveData();
    },
};

loadData();

module.exports = repo;