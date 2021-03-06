const router = require('express').Router();
const validator = require('validator');
const { celebrate, Joi } = require('celebrate');
const { getUsers, getUser, upDateUser, upDateAvatar, getMyUser } = require('../controllers/users');

const validateURL = (value) => {
  if (!validator.isURL(value, { require_protocol: true })) {
    throw new Error('Неправильный формат ссылки');
  }
  return value;
};

router.get('/', getUsers);
router.get('/me', getMyUser);
router.get('/:userId', celebrate({
  params: Joi.object().keys({
    userId: Joi.string().length(24).hex(),
  }),
}), getUser);

router.patch('/me', celebrate({
  body: Joi.object().keys({
    name: Joi.string().required().min(2).max(30),
    about: Joi.string().required().min(2).max(30),
  }),
}), upDateUser);
router.patch('/me/avatar', celebrate({
  body: Joi.object().keys({
    avatar: Joi.string().required().custom(validateURL),
  }),
}), upDateAvatar);

module.exports = router;
