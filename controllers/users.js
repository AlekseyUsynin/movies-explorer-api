const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const UserSchema = require('../models/user');
const NotFound = require('../errors/NotFound');
const BadRequest = require('../errors/BadRequest');
const Conflict = require('../errors/Conflict');

const { NODE_ENV, JWT_SECRET } = process.env;

module.exports.login = (req, res, next) => {
  const { email, password } = req.body;

  return UserSchema.findUserByCredentials(email, password)
    .then((user) => {
      const token = jwt.sign({ _id: user._id }, NODE_ENV === 'production' ? JWT_SECRET : 'fire', { expiresIn: '7d' });
      res
        .cookie('jwt', token, {
          maxAge: 3600000,
          httpOnly: true,
          sameSite: true,
        }).send({ token });
    })
    .catch((err) => {
      next(err);
    });
};

// удаляем токен, решение с: https://stackoverflow.com/questions/57791209/res-clearcookie-function-doesnt-delete-cookies
module.exports.logout = (req, res) => {
  res.clearCookie('jwt').send({ message: 'Выход' });
  // next(); // пока незачем. если пригодится, добавить параметр next
};

module.exports.createUser = (req, res, next) => {
  const {
    name, email,
  } = req.body;

  bcrypt.hash(req.body.password, 10)
    .then((hash) => {
      UserSchema
        .create({
          name, email, password: hash,
        })
        .then(() => {
          res.status(201).send({
            name, email,
          });
        })
        .catch((err) => {
          if (err.code === 11000) {
            next(new Conflict('Пользователь с таким email уже есть.'));
          } else if (err.name === 'ValidationError') {
            next(new BadRequest('Переданы некорректные данные при создании пользователя.'));
          } else {
            next(err);
          }
        });
    })
    .catch(next);
};

module.exports.getUser = (req, res, next) => {
  UserSchema.findById(req.user._id)
    .then((user) => {
      if (!user) {
        throw new NotFound('Пользователь не найден.');
      }
      return res.send(user);
    })
    .catch((err) => {
      next(err);
    });
};

module.exports.updateUser = (req, res, next) => {
  const { name, email } = req.body;
  UserSchema.findByIdAndUpdate(
    req.user._id,
    { name, email },
    { new: true, runValidators: true },
  )
    .then((user) => {
      if (!user) {
        throw new NotFound('Пользователь не найден.');
      }
      return res.send(user);
    })
    .catch((err) => {
      if (err.name === 'CastError' || err.name === 'ValidationError') {
        next(new BadRequest('Переданы некорректные данные при редактировании пользователя.'));
      } else {
        next(err);
      }
    });
};
