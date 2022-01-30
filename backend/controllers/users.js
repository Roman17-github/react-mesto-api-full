const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/user');

const { NODE_ENV, JWT_SECRET } = process.env;

const getUsers = (req, res, next) => {
  return User.find({})
    .then((users) => res.send(users))
    .catch((err) => {
      next(err);
    });
};

const getUser = (req, res, next) => {
  return User.findById(req.params.userId)
    .orFail(() => {
      const error = new Error('Пользователь не найден');
      error.name = 'UserNotFoundError';
      error.statusCode = 404;
      throw error;
    })
    .then((user) => {
      return res.status(200).send(user);
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

const createUser = (req, res, next) => {
  const { name, about, avatar, email, password } = req.body;

  User.findOne({ email })
    .then((user) => {
      if (user) {
        const error = new Error('Такой email уже существует ');
        error.statusCode = 409;
        throw error;
      }
      return bcrypt.hash(password, 10);
    })
    .then((hash) => User.create({ name, about, avatar, email, password: hash }))
    .then((user) => {
      res.status(200).send({ message: `Пользователь ${user.name} успешно зарегистрирован` });
    })
    .catch((er) => {
      const err = er;
      if (err.name === 'ValidationError') {
        err.statusCode = 400;
      }
      next(err);
    });
};

const upDateUser = (req, res, next) => {
  const { name, about } = req.body;

  return User.findByIdAndUpdate(
    req.user._id,
    { name, about },
    { new: true, runValidators: true },
  )
    .orFail(() => {
      const error = new Error('Пользователь не найден');
      error.name = 'UserNotFoundError';
      error.statusCode = 404;
      throw error;
    })
    .then((user) => {
      res.status(200).send(user);
    })
    .catch((er) => {
      const err = er;
      if (err.name === 'ValidationError') {
        err.statusCode = 400;
        err.message = 'некорректные данные';
      } else if (err.name === 'CastError') {
        err.statusCode = 400;
        err.message = 'некорректный id';
      }
      next(err);
    });
};

const upDateAvatar = (req, res, next) => {
  const { avatar } = req.body;

  return User.findByIdAndUpdate(
    req.user._id,
    { avatar },
    { new: true, runValidators: true },
  )
    .orFail(() => {
      const error = new Error('Пользователь не найден');
      error.name = 'UserNotFoundError';
      error.statusCode = 404;
      throw error;
    })
    .then((user) => {
      res.status(200).send(user);
    })
    .catch((er) => {
      const err = er;
      if (err.name === 'ValidationError') {
        err.statusCode = 400;
        err.message = 'некорректные данные';
      } else if (err.name === 'CastError') {
        err.statusCode = 400;
        err.message = 'некорректный id';
      }
      next(err);
    });
};

const login = (req, res, next) => {
  const { email, password } = req.body;
  return User.findUserByCredentials(email, password)
    .then((user) => {
      const token = jwt.sign({ _id: user._id }, NODE_ENV === 'production' ? JWT_SECRET : 'dev-secret', { expiresIn: '7d' });
      res.cookie('jwt', token, {
        maxAge: 3600000,
        httpOnly: true,
        sameSite: 'None',
        secure: true,
      });
      res.status(200).send({ jwt: token });
    })
    .catch((er) => {
      const err = er;
      if (err.message === 'InvalidLogin') {
        err.statusCode = 401;
      }
      next(err);
    });
};

const getMyUser = (req, res, next) => {
  return User.findById(req.user._id)
    .orFail(() => {
      const error = new Error('Пользователь не найден');
      error.name = 'UserNotFoundError';
      error.statusCode = 404;
      throw error;
    })
    .then((I) => {
      res.status(200).send(I);
    })
    .catch(next);
};

module.exports = { getUsers, getUser, createUser, upDateUser, upDateAvatar, login, getMyUser };
