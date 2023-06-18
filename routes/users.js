const router = require('express').Router();
const { updateUserJoi } = require('../middlewares/validation');

const {
  getUser,
  updateUser,
} = require('../controllers/users');

router.get('/me', getUser); // возвращает информацию о пользователе
router.patch('/me', updateUserJoi, updateUser); // обновляет информацию о пользователе

module.exports = router;
