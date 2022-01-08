const User = require('../models/user.js');
const ERRROR_400 = 400;
const ERROR_404 = 404;
const ERROR_500 = 500;

module.exports.getUsers = (req, res) => {
  console.log(req.body);
  User.find({})
    .then(users => res.send({ ...users }))
    .catch(err => {
      console.log(`ПРОИЗОШЛА ОШИБКА: ${err.name}`);
      if (err.name === 'InternalServerError') {
        res.status(ERROR_500).send({
          message: 'На сервере произошла ошибка.'
        });
        return;
      }
    });
}

module.exports.getUserById = (req, res) => {
  User.findById(req.params._id)
    .then(user => res.send({ user }))
    .catch(err => {
      console.log(`ПРОИЗОШЛА ОШИБКА: ${err.name}`);
      if (err.name === 'CastError') {
        res.status(ERROR_404).send({
          message: 'Пользователь по указанному _id не найден.'
        });
        return;
      }
      if (err.name === 'InternalServerError') {
        res.status(ERROR_500).send({
          message: 'На сервере произошла ошибка.'
        });
        return;
      }
    });
}

module.exports.createUser = (req, res) => {
  const { name, about, avatar } = req.body;
  console.log(req.body);
  User.create({ name, about, avatar })
    .then(user => res.send({ user }))
    .catch(err => {
      console.log(`ПРОИЗОШЛА ОШИБКА: ${err.name}`);
      if (err.name === 'ValidationError') {
        res.status(ERRROR_400).send({
          message: 'Переданы некорректные данные при создании пользователя.'
        });
        return;
      }
      if (err.name === 'InternalServerError') {
        res.status(ERROR_500).send({
          message: 'На сервере произошла ошибка.'
        });
        return;
      }
    });
}

module.exports.updateUserProfile = (req, res) => {
  const { name, about } = req.body;
  User.findByIdAndUpdate(
    req.user._id,
    { name , about },
    { new: true },
  )
    .then(user => res.send({ user }))
    .catch(err => {
      console.log(`ПРОИЗОШЛА ОШИБКА: ${err.name}`);
      if (err.name === 'ValidationError') {
        res.status(ERRROR_400).send({
          message: 'Переданы некорректные данные при обновлении профиля.'
        });
        return;
      }
      if (err.name === 'CastError') {
        res.status(ERROR_404).send({
          message: 'Пользователь с указанным _id не найден.'
        });
        return;
      }
      if (err.name === 'InternalServerError') {
        res.status(ERROR_500).send({
          message: 'На сервере произошла ошибка.'
        });
        return;
      }
    });
}

module.exports.updateUserAvatar = (req, res) => {
  const { avatar } = req.body;
  User.findByIdAndUpdate(
    req.user._id,
    { avatar },
    { new: true },
  )
    .then(user => res.send({ user }))
    .catch(err => {
      console.log(`ПРОИЗОШЛА ОШИБКА: ${err.name}`);
      if (err.name === 'ValidationError') {
        res.status(ERRROR_400).send({
          message: 'Переданы некорректные данные при обновлении аватара.'
        });
        return;
      }
      if (err.name === 'CastError') {
        res.status(ERROR_404).send({
          message: 'Пользователь с указанным _id не найден.'
        });
        return;
      }
      if (err.name === 'InternalServerError') {
        res.status(ERROR_500).send({
          message: 'На сервере произошла ошибка.'
        });
        return;
      }
    });
}