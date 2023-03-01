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
        },
    deleteByID: (id) => {
        const stmt = db.prepare("DELETE FROM contacts WHERE id = ?");
        const info = stmt.run(uuid);
        console.log(`Deleted contact: ${info.lastInsertRowid}`);
    },
    update: (contact) => {
        const stmt = db.prepare("UPDATE contacts SET first_name = ?, last_name = ?, email = ?, notes = ? WHERE id = ?");
        const info = stmt.run(contacts.first_name, contacts.last_name, contacts.email, contacts.notes, contacts.id);
        console.log(`Updated contact: ${info.changes}`);
    },
};

// loadData();

module.exports = repo;