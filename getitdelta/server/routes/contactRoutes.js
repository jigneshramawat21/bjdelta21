const express = require('express');
const router = express.Router();
const Contact = require('../models/Contact');

// GET all contact submissions
router.get('/', async (req, res) => {
  try {
    const contacts = await Contact.find();
    res.json(contacts);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// POST new contact from frontend form
router.post('/', async (req, res) => {
  try {
    const { name, contact, email, message } = req.body;
    const newContact = new Contact({ name, contact, email, message });
    await newContact.save();
    res.status(201).json(newContact);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

module.exports = router;
