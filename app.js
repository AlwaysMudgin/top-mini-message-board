const express = require('express');
const { randomUUID } = require('node:crypto');
const path = require('node:path');

const app = express();

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

const assetsPath = path.join(__dirname, 'public');
app.use(express.static(assetsPath));

app.use(express.urlencoded({ extended: true }));

const messages = [
  {
    text: 'Hi there!',
    user: 'Amando',
    added: new Date(),
    id: randomUUID(),
  },
  {
    text: 'Hello World!',
    user: 'Charles',
    added: new Date(),
    id: randomUUID(),
  },
];

app.get('/', (req, res) => {
  res.render('index', { messages: messages });
});

app.get('/new', (req, res) => {
  res.render('form');
});

app.post('/new', (req, res) => {
  const { user, text } = req.body;

  messages.push({
    text: text,
    user: user,
    added: new Date(),
    id: randomUUID(),
  });

  res.redirect('/');
});

app.get('/message/:id', (req, res) => {
  const id = req.params.id;
  const message = messages.find((msg) => msg.id === id);

  if (!message) {
    return res.status(404).send('Message not found');
  }

  res.render('message', { message: message });
});

const PORT = 8080;
app.listen(PORT, (error) => {
  if (error) {
    throw error;
  }
  console.log(`App listening in port ${PORT}`);
});
