var express = require('express');
var router = express.Router();
const contactsRepo = require ('../src/contactsRepository');
const { body, validationResult } = require ('express-validator');

/* GET users listing. */
router.get('/', function(req, res, next) {
    const data = contactsRepo.findAll();
    res.render('contacts', {title: 'Welcome to the Contacts Page!', contacts: data});
});

module.exports = router;