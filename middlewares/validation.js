const { Joi, celebrate } = require('celebrate');
const validator = require('validator');
const BadRequest = require('../errors/BadRequest');

const urlJoi = (url) => {
  // проверяем через validator.isURL (https://www.npmjs.com/package/validator)
  // проверяет, является ли строка URL-адресом
  // решение от сюда: https://stackoverflow.com/questions/5717093/check-if-a-javascript-string-is-a-url
  if (validator.isURL(url)) return url;
  throw new BadRequest('Не верный URL');
};

const emailJoi = (email) => {
  if (validator.isEmail(email)) return email;
  throw new BadRequest('Не верный email');
};

module.exports.loginJoi = celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().custom(emailJoi),
    password: Joi.string().required(),
  }),
});

module.exports.createUserJoi = celebrate({
  body: Joi.object().keys({
    name: Joi.string().min(2).max(30).required(),
    email: Joi.string().required().custom(emailJoi),
    password: Joi.string().required(),
  }),
});

module.exports.updateUserJoi = celebrate({
  body: Joi.object().keys({
    name: Joi.string().min(2).max(30).required(),
    email: Joi.string().custom(emailJoi),
  }),
});

module.exports.createMovieJoi = celebrate({
  body: Joi.object().keys({
    country: Joi.string().required(),
    director: Joi.string().required(),
    duration: Joi.number().required(),
    year: Joi.string().required(),
    description: Joi.string().required(),
    image: Joi.string().required().custom(urlJoi),
    trailerLink: Joi.string().required().custom(urlJoi),
    thumbnail: Joi.string().required().custom(urlJoi),
    movieId: Joi.number().required(),
    nameRU: Joi.string().required(),
    nameEN: Joi.string().required(),
  }),
});

module.exports.deleteMovieJoi = celebrate({
  params: Joi.object().keys({
    id: Joi.string().required().length(24).hex(),
  }),
});
