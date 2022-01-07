const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const { PORT = 3000 } = process.env;
const cardsRouter = require('./routes/cards');
const usersRouter = require('./routes/users')
const app = express();

mongoose.connect('mongodb://localhost:27017/mestodb', {
  useNewUrlParser: true,
  // useCreateIndex: true,
  // useFindAndModify: false
});

app.use((req, res, next) => {
  req.user = {
    _id: '61d8b8b79ce7d29b6b2d1436'
  };
  next();
});
app.use(bodyParser.json());
app.use('/', cardsRouter);
app.use('/', usersRouter);

app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`)
})