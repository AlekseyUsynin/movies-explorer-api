const router = require('express').Router();
const auth = require('../middlewares/auth');
const userRoutes = require('./users');
const movieRoutes = require('./movies');
const NotFound = require('../errors/NotFound');
const { login, logout, createUser } = require('../controllers/users');
const { loginJoi, createUserJoi } = require('../middlewares/validation');

router.post('/signin', loginJoi, login);
router.post('/signup', createUserJoi, createUser);
router.post('/signout', logout);

router.use(auth);
router.use('/users', userRoutes);
router.use('/movies', movieRoutes);

router.use((req, res, next) => {
  next(new NotFound('Такой страницы нет.'));
});

module.exports = router;
