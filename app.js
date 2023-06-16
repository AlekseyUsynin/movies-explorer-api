require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const auth = require('./middlewares/auth');
const routeCenter = require('./routes/index');
const errorCenter = require('./middlewares/errorCenter');
const { login, logout, createUser } = require('./controllers/users');
const { requestLogger, errorLogger } = require('./middlewares/logger');

const { PORT = 3000 } = process.env;

const app = express();

app.use(cors({
  origin: ['http://localhost:3001',
    'http://localhost:3000',
    'http://diploma.usynin.nomoredomains.rocks',
    'https://diploma.usynin.nomoredomains.rocks',
    'http://api.diploma.usynin.nomoredomains.rocks',
    'https://api.diploma.usynin.nomoredomains.rocks',
  ],
  credentials: true,
  preflightContinue: false,
  methods: 'GET,POST,PUT,PATCH,DELETE,OPTIONS,HEAD',
  allowedHeaders: ['Content-Type', 'Authorization', 'Origin'],
  optionsSuccessStatus: 204,
}));

app.use(cookieParser());
app.use(requestLogger);
app.use(express.json());

mongoose.connect('mongodb://127.0.0.1:27017/bitfilmsdb');

app.post('/signin', login);
app.post('/signup', createUser);
app.post('/signout', logout);

app.use(auth);
app.use(routeCenter);

app.use(errorLogger);
app.use(errorCenter);

app.listen(PORT);
