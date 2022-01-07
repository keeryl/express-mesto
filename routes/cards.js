const cardsRouter = require('express').Router();
const {
  getCards,
  createCard,
  deleteCardById,
  addLike,
  removeLike
} = require('../controllers/cards.js');

cardsRouter.get('/cards', getCards);
cardsRouter.post('/cards', createCard);
cardsRouter.delete('/cards/:cardId', deleteCardById);
cardsRouter.put('/cards/:cardId/likes', addLike);
cardsRouter.delete('/cards/:cardId/likes', removeLike);

module.exports = cardsRouter;

