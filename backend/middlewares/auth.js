const jwtverify = require('jsonwebtoken');
const AuthError = require('../errors/AuthError');


module.exports = (req, res, next) => {
  const { NODE_ENV, JWT_SECRET } = process.env;
  const { jwt } = req.cookies;
  if (!jwt) {
    throw new AuthError('Необходима авторизация');
  }

  let payload

  try {
    payload = jwtverify.verify(jwt, NODE_ENV === 'production' ? JWT_SECRET : 'dev-secret')
  } catch (err) {
    next(new AuthError('Необходима авторизация'));
    console.log(err);
  }

  req.user = payload;

  next();
}