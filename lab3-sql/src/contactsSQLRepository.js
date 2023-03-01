const betterSqlite3 = require('better-sqlite3');
const fs = require('fs');
const path = require('path');
const crypto = require('crypto');

const db = new sqlite(path.join(__dirname, '../data/contacts.sqlite'), {verbose: console.log});

const createTable = db.prepare("CREATE TABLE IF NOT EXISTS CONTACTS (id INTEGER PRIMARY KEY AUTOINCREMENT, first_name TEXT NOT NULL, last_name TEXT NOT NULL, email TEXT NOT NULL, notes TEXT)");
createTable.run();

const repo = {
    findAll: () => {
        const stmt = db.prepare("SELECT * FROM contacts");
        const rows = stmt.all();
        let contacts = [];
        rows.forEach((row) => {
            const contact = new Contact(row.id, first_name, row.last_name, row.email, row.notes);
            contacts.push(contact);
        });
        return contacts;
    },
    findByID: (id) => {
        const stmt = db.prepare("SELECT * FROM contacts WHERE id = ?");
        const row = stmt.get(uuid);
        return new Contact(row.id, row.firstName, row.lastName, row.email, row.notes);
    },
    create: (contacts) => {
            const stmt = db.prepare("INSERT INTO contacts (firstName, lastName, email, notes, date) VALUES (?, ?, ?, ?, ? )");
            const info = stmt.run(contact.firstName, contact.lastName, contact.email, contact.notes);
            console.log(`Contact created with id: ${info.lastInsertRowid}`);
            // id: crypto.randomUUID(),
            // firstName: contacts.firstName,
            // lastName: contacts.lastName,
            // email: contacts.email,
            // notes: contacts.notes,
        },

        // db.set(newContact.id, newContact);
        // saveData();
    },
    deleteByID: (id) => {
        // db.delete(id);
        // saveData();
    },
    update: (contact) => {
        // db.set(contact.id, contact);
        // saveData();
    },
};

// loadData();

module.exports = repo;