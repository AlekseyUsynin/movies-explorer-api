require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');

const auth = require('./middlewares/auth');
const userRoutes = require('./routes/users');
const movieRoutes = require('./routes/movies');
const errorCenter = require('./middlewares/errorCenter');
const { login, logout, createUser } = require('./controllers/users');
const { requestLogger, errorLogger } = require('./middlewares/logger');

const NotFound = require('./errors/NotFound');

const { PORT = 3000 } = process.env;

const app = express();

mongoose.connect('mongodb://127.0.0.1:27017/bitfilmsdb');

app.use(requestLogger);
app.use(express.json());

app.post('/signin', login);
app.post('/signup', createUser);
app.post('/signout', logout);

app.use(auth);
app.use(userRoutes); // в конце вынести в общий роут index.js
app.use(movieRoutes); // в конце вынести в общий роут index.js

app.use((req, res, next) => { // подумать, может тоже убрать из app.js ?
  next(new NotFound('Такой страницы нет.'));
});

app.use(errorLogger);
app.use(errorCenter);

app.listen(PORT);
