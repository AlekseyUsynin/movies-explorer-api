const router = require('express').Router();

const {
  getUser,
  updateUser,
} = require('../controllers/users');

router.get('/me', getUser); // возвращает информацию о пользователе
router.patch('/me', updateUser); // обновляет информацию о пользователе

module.exports = router;
