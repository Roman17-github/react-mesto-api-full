const Card = require('../models/card');

const getCards = (req, res) => {
  return Card.find({})
    .then((cards) => res.send(cards))

    .catch(() => res.status(500).send({ message: 'Произошла ошибка' }));
};

const createCard = (req, res, next) => {
  const owner = req.user._id;
  const { name, link } = req.body;

  return Card.create({ name, link, owner })
    .then((card) => {
      res.status(200).send(card);
    })
    .catch((er) => {
      const err = er;
      if (err.name === 'ValidationError') {
        err.statusCode = 400;
        err.message = 'неккоректные данные';
      }
      next(err);
    });
};

const deleteCard = (req, res, next) => {
  return Card.findById(req.params.cardId)
    .orFail(() => {
      const error = new Error('Карточка не найдена');
      error.name = 'CardNotFoundError';
      error.statusCode = 404;
      throw error;
    })
    .then((card) => {
      if (card.owner.toString() === req.user._id) {
        card.deleteOne({ _id: Card._id })
          .then(() => {
            res.status(200).send({ message: 'Карточка удалена' });
          });
      } else {
        const error = new Error('Нельзя удалить чужую карточку');
        error.name = 'ForbiddenError';
        error.statusCode = 403;
        throw error;
      }
    })
    .catch((er) => {
      const err = er;
      if (err.name === 'CastError') {
        err.statusCode = 400;
        err.message = 'неккоректный id';
      }
      next(err);
    });
};

const likeCard = (req, res, next) => {
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $addToSet: { likes: req.user._id } },
    { new: true },
  )
    .orFail(() => {
      const error = new Error('Карточка не найдена');
      error.name = 'CardNotFoundError';
      error.statusCode = 404;
      throw error;
    })
    .then((card) => {
      res.send(card);
    })
    .catch((er) => {
      const err = er;
      if (err.name === 'CastError') {
        err.statusCode = 400;
        err.message = 'неккоректный id';
      }
      next(err);
    });
};

const dislikeCard = (req, res, next) => {
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $pull: { likes: req.user._id } },
    { new: true },
  )
    .orFail(() => {
      const error = new Error('Карточка не найдена');
      error.name = 'CardNotFoundError';
      error.statusCode = 404;
      throw error;
    })
    .then((card) => {
      res.send(card);
    })
    .catch((er) => {
      const err = er;
      if (err.name === 'CastError') {
        err.statusCode = 400;
        err.message = 'неккоректный id';
      }
      next(err);
    });
};
module.exports = {getCards, createCard, deleteCard, likeCard, dislikeCard};
