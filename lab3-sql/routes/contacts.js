var express = require('express');
var router = express.Router();
const contactsRepo = require ('../src/contactsRepository');
const { body, validationResult } = require ('express-validator');

router.get('/', contactsController.contacts_list);
/* GET contacts_add */
router.get('/add', contactsController.contacts_add_get);


/* Create contact */
router.post('/add',
    body('firstName').trim().notEmpty().withMessage('First Name cannot be empty'),
    body('lastName').trim().notEmpty().withMessage('Last Name cannot be empty'),
    body('email').trim().notEmpty().withMessage('Email cannot be empty!').isEmail().withMessage('Please enter a valid email address!'),
    body('notes').trim(),
    contactsController.contacts_add_post);

/* GET contacts_single */
router.get('/:id', contactsController.contacts_single);


  /* GET contacts_delete */
router.get('/:id/delete', function(req, res, next) {
    const contact = contactsRepo.findByID(req.params.id);
    res.render('contacts_delete', { title: 'Delete Contact', contact: contact});
});

/* POST contacts_delete */
router.post('/:id/delete', function(req, res, next) {
    contactsRepo.deleteByID(req.params.id);
    res.redirect('/contacts')
});

/* GET contacts_edit */
router.get('/:id/edit', function(req, res, next) {
    const contact = contactsRepo.findByID(req.params.id);
    res.render('contacts_edit', { title: 'Edit Contact', contact: contact});
});

/* POST contacts_edit */
router.post('/:id/edit',
    body('firstName').trim().notEmpty().withMessage('First Name cannot be empty'),
    body('lastName').trim().notEmpty().withMessage('Last Name cannot be empty'),
    body('email').trim().notEmpty().withMessage('Email cannot be empty').isEmail().withMessage('Please enter a valid email address!'),
    body('notes').trim(),
    function(req, res, next) {

    const result = validationResult(req);
    if (result.isEmpty() != true){
        const contact = contactsRepo.findByID(req.params.id);
        res.render('contacts_edit', { title: 'Edit Contact', contact: contact, message: result.array() })
    }
    else{
        const contact = contactsRepo.findByID(req.params.id);
        const updatedContact = {
            id: req.params.id,
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            email: req.body.email,
            notes: req.body.notes,

        };
        contactsRepo.update(updatedContact);
        res.redirect('/contacts');
    }
});

module.exports = router;