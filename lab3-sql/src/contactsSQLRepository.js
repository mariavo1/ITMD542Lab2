const betterSqlite3 = require('better-sqlite3');
const fs = require('fs');
const path = require('path');
const crypto = require('crypto');

const db = new sqlite(path.join(__dirname, '../data/contacts.sqlite'), {verbose: console.log});

const createTable = db.prepare("CREATE TABLE IF NOT EXISTS CONTACTS (id INTEGER PRIMARY KEY AUTOINCREMENT, first_name TEXT NOT NULL, last_name TEXT NOT NULL, email TEXT NOT NULL, notes TEXT)");
createTable.run();

// const saveData = () => {
//     const stringifyData = JSON.stringify(Array.from(db));
//     fs.writeFileSync(path.join(__dirname, '../data/contacts.json'), stringifyData);
// };

// const loadData = () => {
//     const fileData = fs.readFileSync(path.join(__dirname, '../data/contacts.json'));
//     const contactsArray = JSON.parse(fileData);
//     contactsArray.forEach(element => {
//         db.set(element[0], element[1]);
//     });
// };

const repo = {
    findAll: () => {
        const stmt = db.prepare("SELECT * FROM contacts");
        const rows = stmt.all();
        let contacts = [];
        rows.forEach((row) => {
            const contact = new Contact(row.id, first_name, row.last_name, row.email, row.notes);
            contacts.push(contact);
        })
    },
    findByID: (id) => db.get(id),
    create: (contacts) => {
        const newContact = {
            // id: crypto.randomUUID(),
            // firstName: contacts.firstName,
            // lastName: contacts.lastName,
            // email: contacts.email,
            // notes: contacts.notes,
        };

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