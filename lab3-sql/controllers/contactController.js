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