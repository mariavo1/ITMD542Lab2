const employeesRepository = require ('../src/employeeMongoRepo');
const { validationResult } = require ('express-validator');
const Employee = require('../src/Employee');

exports.employees_list = async function(req, res, next) {
    const data = await employeesRepository.findAll();
    res.render('employees', {title: 'Employee needing further follow-up evaluation', employees: data});
  };

  exports.employees_add_get = async function(req, res, next) {
    res.render('employees_add', { title: 'Insert new employee'});
};

exports.employees_add_post = async function(req, res, next) {
    const result = validationResult(req);
    if (result.isEmpty() != true){
        res.render('employees_add', { title: 'Insert new employee', message: result.array() })
    }
    else{
      const newEmployee = new Employee('', req.body.idNum, req.body.firstName, req.body.lastName, req.body.email, req.body.notes, '');
      await employeesRepository.create(newEmployee);
      res.redirect('/employees');
    }
};

exports.employees_single = async function(req, res, next) {
    const employee = await employeesRepository.findByID(req.params.id);
    if(employee) {
        res.render('employees_single', {title: 'Employees', employee: employee});
    }
    else {
        res.redirect('/error')
    }
  };

  exports.employees_get_delete = async function(req, res, next) {
    const employee = await employeesRepository.findByID(req.params.id);
    res.render('employees_delete', { title: 'Delete Employee', employee: employee});
};

exports.employees_post_delete = async function(req, res, next) {
    await employeesRepository.deleteByID(req.params.id);
    res.redirect('/employees')
};

exports.employees_get_edit = async function(req, res, next) {
    const employee = await employeesRepository.findByID(req.params.id);
    res.render('employees_edit', { title: 'Edit Employee', employee: employee});
};

exports.employees_post_edit = async function(req, res, next) {
  
    const result = validationResult(req);
    if (result.isEmpty() != true){
        const employee = employeesRepository.findByID(req.params.id);
        res.render('employees_edit', { title: 'Edit Employee', employee: employee, message: result.array() })
    }
    else{
        const updatedEmployee = new Employee(req.params.id, req.body.idNum, req.body.firstName, req.body.lastName, req.body.email, req.body.notes);
        await employeesRepository.update(updatedEmployee);
        res.redirect('/employees');
    }
};