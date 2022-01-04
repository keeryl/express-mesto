const cardsRouter = require('express').Router();
const {
  getCards,
  createCard,
  deleteCardById,
  addLike,
  removeLike
} = require('../controllers/users.js');

usersRouter.get('/cards', getCards)
usersRouter.post('/cards', createCard)
usersRouter.post('/cards/:cardId', deleteCardById)
usersRouter.put('/cards/:cardId/likes', addLike)
usersRouter.delete('/cards/:cardId/likes', removeLike)

module.exports = cardsRouter;

