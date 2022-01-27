const jwtverify = require('jsonwebtoken');
const AuthError = require('../errors/AuthError');


module.exports = (req, res, next) => {
  const { jwt } = req.cookies;
  if (!jwt) {
    throw new AuthError('Необходима авторизация');
  }

  let payload

  try {
    payload = jwtverify.verify(jwt, 'super-strong-secret')
  } catch (err) {
    next(new AuthError('Необходима авторизация'));
    console.log(err);
  }

  req.user = payload;

  next();
}