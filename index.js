const express = require('express');
const path = require('node:path');
const controller = require('./controllers/controller');

const app = express();

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

const assetsPath = path.join(__dirname, 'public');
app.use(express.static(assetsPath));

app.use(express.urlencoded({ extended: true }));

app.get('/', controller.getMessages);

app.post('/new', controller.insertMessage);

app.get('/message/:id', controller.getMessageById);

const PORT = process.env.PORT || 8080;
app.listen(PORT, '0.0.0.0', (error) => {
  if (error) {
    throw error;
  }
  console.log(`App listening on port ${PORT}`);
});
