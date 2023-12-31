const rateLimit = require('express-rate-limit');

const limiter = rateLimit({ // не работает через module.exports.limiter
  windowMs: 15 * 60 * 1000, // за 15 минут
  max: 100, // можно совершить максимум 100 запросов с одного IP
});

module.exports = limiter;
