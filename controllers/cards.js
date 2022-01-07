const Card = require('../models/card');

module.exports.getCards = (req, res) => {
  Card.find({})
    .then(cards => res.send(cards))
    .catch(err => console.log(err));
}

module.exports.createCard = (req, res) => {
  const { name, link } = req.body;
  const owner = req.user._id;
  Card.create({ name, link, owner})
    .then(card => res.send({ card }))
    .catch(err => console.log(err));
}

module.exports.deleteCardById = (req, res) => {
  console.log(req.params.cardId);
  Card.findByIdAndRemove(req.params.cardId)
    .then(card => res.send({ card }))
    .catch(err => res.send(err));
}

module.exports.addLike = (req, res) => {
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $addToSet: { likes: req.user._id } },
    { new: true },
  )
    .then(card => res.send(card))
    .catch(err => console.log(err));
}

module.exports.removeLike = (req, res) => {
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $pull: { likes: req.user._id } },
    { new: true },
  )
    .then(card => res.send(card))
    .catch(err => console.log(err));
}