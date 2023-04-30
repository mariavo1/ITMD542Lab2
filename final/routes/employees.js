var express = require('express');
var router = express.Router();
const employeesRepo = require ('../src/employeesRepository');
const { body, validationResult } = require ('express-validator');
const employeeController = require('../controllers/employeeController')

router.get('/', employeeController.employees_list);
/* GET employees_add */
router.get('/add', employeeController.employees_add_get);


/* Create employee */
router.post('/add',
    body('firstName').trim().notEmpty().withMessage('First Name cannot be empty'),
    body('lastName').trim().notEmpty().withMessage('Last Name cannot be empty'),
    body('email').trim().notEmpty().withMessage('Email cannot be empty!').isEmail().withMessage('Please enter a valid email address!'),
    body('notes').trim(),
    employeeController.employees_add_post);

/* GET employees_single */
router.get('/:id', employeeController.employees_single);


  /* GET employees_delete */
  router.get('/:id/delete', employeeController.employees_get_delete);


/* POST employees_delete */
router.post('/:id/delete', employeeController.employees_post_delete);

/* GET employees_edit */
router.get('/:id/edit', employeeController.employees_get_edit);


/* POST contacts_edit */
router.post('/:id/edit',
    body('firstName').trim().notEmpty().withMessage('First Name cannot be empty'),
    body('lastName').trim().notEmpty().withMessage('Last Name cannot be empty'),
    body('email').trim().notEmpty().withMessage('Email cannot be empty').isEmail().withMessage('Please enter a valid email address!'),
    body('notes').trim(),
    employeeController.employees_post_edit);

module.exports = router;