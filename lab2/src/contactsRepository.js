const db = new Map();
const fs = require('fs');
const path = require('path');
const crypto = require('crypto');

const saveData = () => {
    const stringifyData = JSON.stringify(Array.from(db));
    fs.writeFileSync(path.join(__dirname, '../data/contacts.json'), stringifyData);
};

const loadData = () => {
    const fileData = fs.readFileSync(path.join(__dirname, '../data/contacts.json'));
    const contactsArray = JSON.parse(fileData);
    contactsArray.forEach(element => {
        db.set(element[0], element[1]);
    });
};

const repo = {
    findAll: () => Array.from(database.values()),
    findByID: (id) => db.get(id),
    create: (contacts) => {
        const newContact = {
            id: crypto.randomUUID(),
            firstName: contacts.firstName,
            lastName: contacts.lastName,
            email: contacts.email,
            notes: contacts.notes,
        };

        db.set(newContact.id, newContact);
        saveData();
    },
    deleteByID: (id) => {
        db.delete(id);
        saveData();
    },
    update: (contact) => {
        db.set(contact.id, contact);
        saveData();
    },
};

loadData();

module.exports = repo;