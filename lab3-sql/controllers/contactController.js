const contactsSQLRepository = require ('../src/contactsSQLRepository');
const { validationResult } = require ('express-validator');
const Contact = require('../src/Contact');

exports.contacts_list = function(req, res, next) {
    const data = contactsSQLRepository.findAll();
    res.render('contacts', {title: 'Contacts', contacts: data});
  };

  exports.contacts_add_get = function(req, res, next) {
    res.render('contacts_add', { title: 'Create a new contact'});
};

exports.contacts_add_post = function(req, res, next) {
  
    const result = validationResult(req);
    if (result.isEmpty() != true){
        res.render('contacts_add', { title: 'Create a new contact', message: result.array() })
    }
    else{
      const newContact = new Contact('', req.body.first_name, req.body.last_name, req.body.email, req.body.notes, '');
      contactsSQLRepository.create(newContact);
      res.redirect('/contacts');
    }
};