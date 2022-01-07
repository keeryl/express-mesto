const User = require('../models/user.js');

module.exports.getUsers = (req, res) => {
  console.log(req.body);
  User.find({})
    .then(users => res.send({ ...users }))
    .catch(err => console.log(err));
}

module.exports.getUserById = (req, res) => {
  User.findById(req.params._id)
    .then(user => res.send({ user }))
    .catch(err => console.log(err));
}

module.exports.createUser = (req, res) => {
  const { name, about, avatar } = req.body;
  console.log(req.body);
  User.create({ name, about, avatar })
    .then(user => res.send({ user }))
    .catch(err => console.log(err));
}

module.exports.updateUserProfile = (req, res) => {
  const { name, about } = req.body;
  User.findByIdAndUpdate(
    req.user._id,
    { name , about },
    { new: true },
  )
    .then(user => res.send({ user }))
    .catch(err => console.log(err));
}

module.exports.updateUserAvatar = (req, res) => {
  const { avatar } = req.body;
  User.findByIdAndUpdate(
    req.user._id,
    { avatar },
    { new: true },
  )
    .then(user => res.send({ user }))
    .catch(err => console.log(err));
}