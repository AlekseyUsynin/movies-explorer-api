const MovieSchema = require('../models/movie');
const NotFound = require('../errors/NotFound');
const BadRequest = require('../errors/BadRequest');
const Forbidden = require('../errors/Forbidden');

module.exports.getMovies = (req, res, next) => {
  MovieSchema.find({ owner: req.user._id })
    .then((movies) => {
      // eslint-disable-next-line no-console
      console.log(movies); // Очистить вконце
      res.send(movies);
      // }
    })
    .catch(next);
};

module.exports.createMovies = (req, res, next) => {
  const { // Придумать как это сократить
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

module.exports.deleteMovie = (req, res, next) => {
  const { id } = req.params;
  // eslint-disable-next-line no-console
  console.log(id); // очистить в конце
  MovieSchema.findById(id)
    .then((movie) => {
      if (!movie) {
        throw new NotFound('Фильм с таким id не найдена.');
      }
      if (req.user._id.toString() !== movie.owner._id.toString()) {
        throw new Forbidden('Нельзя удалить Фильм!');
      }
      return movie
        .deleteOne()
        .then(() => res.status(200).send({ message: 'Фильм удален' }));
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        next(new BadRequest('Переданы неверные данные.'));
      } else {
        next(err);
      }
    });
};
