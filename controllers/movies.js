const MovieSchema = require('../models/movie');
// const NotFound = require('../errors/NotFound');
const BadRequest = require('../errors/BadRequest');
// const Forbidden = require('../errors/Forbidden');

module.exports.getMovies = (req, res, next) => {
  MovieSchema.find({ owner: req.user._id })
    .then((movies) => {
      // eslint-disable-next-line no-console
      console.log(movies);
      // if (req.user._id === movies.owner) {
      res.send(movies);
      // }
    })
    .catch(next);
};

module.exports.createMovies = (req, res, next) => {
  const {
    country,
    director,
    duration,
    year,
    description,
    image,
    trailerLink,
    thumbnail,
    movieId,
    nameRU,
    nameEN,
  } = req.body;
  MovieSchema.create({
    country,
    director,
    duration,
    year,
    description,
    image,
    trailerLink,
    thumbnail,
    movieId,
    nameRU,
    nameEN,
    owner: req.user._id,
  })
    .then((movie) => {
      res.status(201).send({ data: movie });
    })
    .catch((err) => {
      if (err.name === 'ValidationError') {
        next(new BadRequest('Переданы неверные данные.'));
      } else {
        next(err);
      }
    });
};
