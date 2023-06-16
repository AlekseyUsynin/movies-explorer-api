const router = require('express').Router();

const {
  getUser,
  updateUser,
} = require('../controllers/users');

router.get('/users/me', getUser); // возвращает информацию о пользователе
router.patch('/users/me', updateUser); // обновляет информацию о пользователе

module.exports = router;
