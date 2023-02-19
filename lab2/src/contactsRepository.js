const db = new Map();
const fs = require('fs');
const path = require('path');
const crypto = require('crypto');

const saveData = () => {
    const stringifyData = JSON.stringify(Array.from(db));
    fs.writeFileSync(path.join(__dirname, '../data/contacts.json'), stringifyData);
};