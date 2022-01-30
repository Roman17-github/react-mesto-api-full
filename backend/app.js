require('dotenv').config();
const express = require('express');

const app = express();
const { PORT = 3000 } = process.env;
const mongoose = require('mongoose');
const validator = require('validator');
const cookieParser = require('cookie-parser');
const { celebrate, Joi, errors } = require('celebrate');
const auth = require('./middlewares/auth');
const cors = require('./middlewares/cors');
const { login, createUser } = require('./controllers/users');
const { requestLogger, errorLogger } = require('./middlewares/logger');

const validateURL = (value) => {
  if (!validator.isURL(value, { require_protocol: true })) {
    throw new Error('Неправильный формат ссылки');
  }
  return value;
};

app.use(express.json());

app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
mongoose.connect('mongodb://localhost:27017/mestodb', {
  useNewUrlParser: true,
});

app.use(cors);
app.use(requestLogger);

app.get('/crash-test', () => {
  setTimeout(() => {
    throw new Error('Сервер сейчас упадёт');
  }, 0);
});

app.post('/signup', celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().required(),
    name: Joi.string().min(2).max(30),
    about: Joi.string().min(2).max(30),
    avatar: Joi.string().min(2).custom(validateURL),
  }),
}), createUser);
app.post('/signin', celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().required(),
  }),
}), login);
app.use(auth);
app.use('/users', require('./routes/users'));
app.use('/cards', require('./routes/cards'));

app.get('/signout', (req, res) => {
  res.status(200).clearCookie('jwt').send({ message: 'Выход' });
});

app.use('/', (req, res, next) => {
  const err = new Error('Ресурс не найден');
  err.statusCode = 404;
  next(err);
});

app.use(errorLogger);

app.use(errors());

app.use((err, req, res, next) => {
  const status = err.statusCode || 500;
  const { message } = err;
  res.status(status).send({ error: message || 'Ошибка на сервере' });
});

app.listen(PORT);
