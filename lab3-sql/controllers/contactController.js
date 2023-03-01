const contactsSQLRepository = require ('../src/contactsSQLRepository');
const { validationResult } = require ('express-validator');
const Contact = require('../src/Contact');

exports.contacts_list = function(req, res, next) {
    const data = contactsSQLRepository.findAll();
    res.render('contacts', {title: 'Contacts', contacts: data});
  };