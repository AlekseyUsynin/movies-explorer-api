const router = require('express').Router();

const {
  getMovies,
  createMovies,
} = require('../controllers/movies');

router.get('/movies', getMovies); // возвращает все сохранённые текущим пользователем фильмы
router.post('/movies', createMovies); // создаёт фильм
router.delete('/movies/_id'); // удаляет сохранённый фильм по id

module.exports = router;
