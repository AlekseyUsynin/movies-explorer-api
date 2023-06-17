const router = require('express').Router();
const { createMovieJoi, deleteMovieJoi } = require('../middlewares/validation');

const {
  getMovies,
  createMovies,
  deleteMovie,
} = require('../controllers/movies');

router.get('/', getMovies); // возвращает все сохранённые текущим пользователем фильмы
router.post('/', createMovieJoi, createMovies); // создаёт фильм
router.delete('/:id', deleteMovieJoi, deleteMovie); // удаляет сохранённый фильм по id

module.exports = router;
