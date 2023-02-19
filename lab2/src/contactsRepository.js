const db = new Map();
const fs = require('fs');
const path = require('path');
const crypto = require('crypto');

const saveData = () => {
    const stringifyData = JSON.stringify(Array.from(db));
    fs.writeFileSync(path.join(__dirname, '../data/contacts.json'), stringifyData);
};

const loadData = () => {
    const fileData = fs.readFileSync(path.join(__dirname, '../database/contacts.json'));
    const contactsArray = JSON.parse(fileData);
    contactsArray.forEach(element => {
        database.set(element[0], element[1]);
    });
};