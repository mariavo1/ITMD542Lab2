var express = require('express');
var router = express.Router();
const contactsRepo = require ('../src/contactsRepository');

/* GET find all */
router.get('/', function(req, res, next) {
    const data = contactsRepo.findAll();
    res.render('contacts', {title: 'Welcome to the Contacts Page!', contacts: data});
});

/* GET contact_add */
router.get('/add', function(req, res, next) {
    res.render('contacts_add', { title: 'Create a new contact'});
});

module.exports = router;