const router = require('express').Router();

const {
  getMovies,
  createMovies,
  deleteMovie,
} = require('../controllers/movies');

router.get('/', getMovies); // возвращает все сохранённые текущим пользователем фильмы
router.post('/', createMovies); // создаёт фильм
router.delete('/:id', deleteMovie); // удаляет сохранённый фильм по id

module.exports = router;
