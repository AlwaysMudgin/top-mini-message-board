const { body, validationResult, matchedData } = require('express-validator');

const db = require('../db/queries');

const textLengthErr = 'Message cannot exceed 255 characters';
const nameLengthErr = 'Name cannot exceed 20 characters';
const idNumberErr = 'ID must be a number';

const validateMessage = [
  body('text')
    .trim()
    .isLength({ max: 255 })
    .withMessage(textLengthErr)
    .escape(),
  body('name').trim().isLength({ max: 20 }).escape(),
];

exports.getMessages = async (req, res) => {
  const messages = await db.getAllMessages();
  console.log(messages);
  res.render('index', { messages: messages });
};

exports.insertMessage = [
  validateMessage,
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).render('form', { errors: errors.array() });
    }
    const { text, name } = matchedData(req);
    await db.insertMessage(text, name);
    res.redirect('/');
  },
];

exports.getMessageById = async (req, res) => {
  const id = req.params.id;
  const message = await db.getMessageById(id);
  res.render('message', { message: message[0] });
};
