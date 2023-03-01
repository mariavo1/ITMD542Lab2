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
      const newContact = new Contact('', req.body.firstName, req.body.lastName, req.body.email, req.body.notes, '');
      contactsSQLRepository.create(newContact);
      res.redirect('/contacts');
    }
};

exports.contacts_single = function(req, res, next) {
    const contact = contactsSQLRepository.findByID(req.params.id);
    if(contact) {
        res.render('contacts_single', {title: 'Contacts', contact: contact});
    }
    else {
        res.redirect('/error')
    }
  };

  exports.contacts_get_delete = function(req, res, next) {
    const contact = contactsSQLRepository.findByID(req.params.id);
    res.render('contacts_delete', { title: 'Delete Contact', contact: contact});
};

exports.contacts_post_delete = function(req, res, next) {
    contactsSQLRepository.deleteByID(req.params.id);
    res.redirect('/contacts')
};

exports.contacts_get_edit = function(req, res, next) {
    const contact = contactsSQLRepository.findByID(req.params.id);
    res.render('contacts_edit', { title: 'Edit Contact', contact: contact});
};

exports.contacts_post_edit = function(req, res, next) {
  
    const result = validationResult(req);
    if (result.isEmpty() != true){
        const contact = contactsSQLRepository.findByID(req.params.id);
        res.render('contacts_edit', { title: 'Edit Contact', contact: contact, message: result.array() })
    }
    else{
        //const contact = contactsSQLRepository.findByID(req.params.id);
        const updatedContact = new Contact(req.params.id, req.body.firstName, req.body.lastName, req.body.email, req.body.notes);
        contactsSQLRepository.update(updatedContact);
        res.redirect('/contacts');
    }
};