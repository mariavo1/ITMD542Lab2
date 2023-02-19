var express = require('express');
var router = express.Router();
const contactsRepo = require ('../src/contactsRepository');
const { body, validationResult } = require ('express-validator');

/* GET find all */
router.get('/', function(req, res, next) {
    const data = contactsRepo.findAll();
    res.render('contacts', {title: 'Welcome to the Contacts Page!', contacts: data});
});

/* GET contact_add */
router.get('/add', function(req, res, next) {
    res.render('contacts_add', { title: 'Create a new contact'});
});

/* Create contact */
router.post('/add',
    body('firstName').trim().notEmpty().withMessage('Cannot be empty!'),
    body('lastName').trim().notEmpty().withMessage('Cannot be empty!'),
    body('email').trim().notEmpty().withMessage('Cannot be empty!').isEmail().withMessage('Please enter a valid email address!'),
    body('notes').trim(),
    function(req, res, next) {

    const result = validationResult(req);
    if (result.isEmpty() != true){
        res.render('contacts_add', { title: 'Create a new contact', message: result.array() })
    }
    else{
        contactsRepo.create({
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            email: req.body.email,
            notes: req.body.notes,
        });

        res.redirect('/contacts');
    }
});

/* GET contact-single */
router.get('/:id', function(req, res, next) {
    const contact = contactsRepo.findByID(req.params.id);
    if(contact) {
        res.render('contacts_single', {title: 'Contacts', contact: contact});
    }
    else {
        res.redirect('/error')
    }
  });

  /* GET contact_delete */
router.get('/:id/delete', function(req, res, next) {
    const contact = contactsRepo.findByID(req.params.id);
    res.render('contacts_delete', { title: 'Delete Contact', contact: contact});
});


module.exports = router;