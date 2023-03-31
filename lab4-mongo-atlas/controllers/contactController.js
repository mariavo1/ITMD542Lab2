const contactsRepository = require ('../src/contactMongoRepo');
const { validationResult } = require ('express-validator');
const Contact = require('../src/Contact');

exports.contacts_list = async function(req, res, next) {
    const data = await contactsRepository.findAll();
    res.render('contacts', {title: 'Contacts', contacts: data});
  };

  exports.contacts_add_get = async function(req, res, next) {
    res.render('contacts_add', { title: 'Create a new contact'});
};

exports.contacts_add_post = async function(req, res, next) {
    const result = validationResult(req);
    if (result.isEmpty() != true){
        res.render('contacts_add', { title: 'Create a new contact', message: result.array() })
    }
    else{
      const newContact = new Contact('', req.body.firstName, req.body.lastName, req.body.email, req.body.notes, '');
      contactsRepository.create(newContact);
      res.redirect('/contacts');
    }
};

exports.contacts_single = async function(req, res, next) {
    const contact = await contactsRepository.findByID(req.params.id);
    if(contact) {
        res.render('contacts_single', {title: 'Contacts', contact: contact});
    }
    else {
        res.redirect('/error')
    }
  };

  exports.contacts_get_delete = async function(req, res, next) {
    const contact = await contactsRepository.findByID(req.params.id);
    res.render('contacts_delete', { title: 'Delete Contact', contact: contact});
};

exports.contacts_post_delete = async function(req, res, next) {
    await contactsRepository.deleteByID(req.params.id);
    res.redirect('/contacts')
};

exports.contacts_get_edit = async function(req, res, next) {
    const contact = await contactsRepository.findByID(req.params.id);
    res.render('contacts_edit', { title: 'Edit Contact', contact: contact});
};

exports.contacts_post_edit = async function(req, res, next) {
  
    const result = validationResult(req);
    if (result.isEmpty() != true){
        const contact = contactsRepository.findByID(req.params.id);
        res.render('contacts_edit', { title: 'Edit Contact', contact: contact, message: result.array() })
    }
    else{
        const updatedContact = new Contact(req.params.id, req.body.firstName, req.body.lastName, req.body.email, req.body.notes);
        await contactsRepository.update(updatedContact);
        res.redirect('/contacts');
    }
};