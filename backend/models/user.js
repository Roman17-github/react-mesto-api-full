const mongoose = require('mongoose');
const isEmail = require('validator/lib/isEmail');
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    minlength: 2,
    maxlength: 30,
    default:"Жак-Ив Кусто"
  },

  about: {
    type: String,
    minlength: 2,
    maxlength: 30,
    default:"Исследователь"
  },

  avatar: {
    type: String,
    default:"https://pictures.s3.yandex.net/resources/jacques-cousteau_1604399756.png",
    validate: {
      validator: (v) => /((https|http):\/\/[-A-Z0-9+&@#/%?=~_|!:,.;]*[-A-Z0-9+&@#/%=~_|])/ig.test(v),
      message: "Введите ссылку"
    }
  },

  email: {
    type: String,
    unique: true,
    required: true,
    validate: {
      validator: (v) => isEmail(v),
      message: "неправильный формат e-mail"
    }
  },

  password: {
    type: String,
    required: true,
    select: false
  },
})

userSchema.statics.findUserByCredentials = function (email, password)  {
  return this.findOne({email}).select('+password')
  .then((user) => {
    if(!user) {
      return Promise.reject(new Error('InvalidLogin'));
    }

    return bcrypt.compare(password, user.password)
    .then((matched) => {
      if(!matched) {
        return Promise.reject(new Error('InvalidLogin'));
      }
      return user
    })
  })

};

module.exports = mongoose.model('user', userSchema);