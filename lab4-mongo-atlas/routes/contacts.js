var express = require('express');
var router = express.Router();
const contactsRepo = require ('../src/contactsRepository');
const { body, validationResult } = require ('express-validator');
const contactController = require('../controllers/contactController')

router.get('/', contactController.contacts_list);
/* GET contacts_add */
router.get('/add', contactController.contacts_add_get);


/* Create contact */
router.post('/add',
    body('firstName').trim().notEmpty().withMessage('First Name cannot be empty'),
    body('lastName').trim().notEmpty().withMessage('Last Name cannot be empty'),
    body('email').trim().notEmpty().withMessage('Email cannot be empty!').isEmail().withMessage('Please enter a valid email address!'),
    body('notes').trim(),
    contactController.contacts_add_post);

/* GET contacts_single */
router.get('/:id', contactController.contacts_single);


  /* GET contacts_delete */
  router.get('/:id/delete', contactController.contacts_get_delete);


/* POST contacts_delete */
router.post('/:id/delete', contactController.contacts_post_delete);

/* GET contacts_edit */
router.get('/:id/edit', contactController.contacts_get_edit);


/* POST contacts_edit */
router.post('/:id/edit',
    body('firstName').trim().notEmpty().withMessage('First Name cannot be empty'),
    body('lastName').trim().notEmpty().withMessage('Last Name cannot be empty'),
    body('email').trim().notEmpty().withMessage('Email cannot be empty').isEmail().withMessage('Please enter a valid email address!'),
    body('notes').trim(),
    contactController.contacts_post_edit);

module.exports = router;