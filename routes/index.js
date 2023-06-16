const router = require('express').Router();
const userRoutes = require('./users');
const movieRoutes = require('./movies');
const NotFound = require('../errors/NotFound');

router.use('/users', userRoutes);
router.use('/movies', movieRoutes);

router.use((req, res, next) => {
  next(new NotFound('Такой страницы нет.'));
});

module.exports = router;
