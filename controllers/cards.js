const Card = require('../models/card');
const ERRROR_400 = 400;
const ERROR_404 = 404;
const ERROR_500 = 500;

module.exports.getCards = (req, res) => {
  Card.find({})
    .then(cards => res.send(cards))
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

module.exports.createCard = (req, res) => {
  const { name, link } = req.body;
  const owner = req.user._id;
  Card.create({ name, link, owner})
    .then(card => res.send({ card }))
    .catch(err => {
      console.log(`ПРОИЗОШЛА ОШИБКА: ${err.name}`);
      if (err.name === 'ValidationError') {
        res.status(ERRROR_400).send({
          message: 'Переданы некорректные данные при создании карточки.'
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

module.exports.deleteCardById = (req, res) => {
  console.log(req.params.cardId);
  Card.findByIdAndRemove(req.params.cardId)
    .then(card => res.send({ card }))
    .catch(err => {
      console.log(`ПРОИЗОШЛА ОШИБКА: ${err.name}`);
      if (err.name === 'CastError') {
        res.status(ERROR_404).send({
          message: 'Карточка с указанным _id не найдена.'
        });
        return;
      }
    });
}

module.exports.addLike = (req, res) => {
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $addToSet: { likes: req.user._id } },
    { new: true },
  )
    .then(card => res.send(card))
    .catch(err => {
      console.log(`ПРОИЗОШЛА ОШИБКА: ${err.name}`);
      if (err.name === 'ValidationError') {
        res.status(ERRROR_400).send({
          message: 'Переданы некорректные данные для постановки лайка.'
        });
        return;
      }
      if (err.name === 'CastError') {
        res.status(ERROR_404).send({
          message: 'Передан несуществующий _id карточки.'
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

module.exports.removeLike = (req, res) => {
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $pull: { likes: req.user._id } },
    { new: true },
  )
    .then(card => res.send(card))
    .catch(err => {
      console.log(`ПРОИЗОШЛА ОШИБКА: ${err.name}`);
      if (err.name === 'ValidationError') {
        res.status(ERRROR_400).send({
          message: 'Переданы некорректные данные для снятия лайка.'
        });
        return;
      }
      if (err.name === 'CastError') {
        res.status(ERROR_404).send({
          message: 'Передан несуществующий _id карточки.'
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