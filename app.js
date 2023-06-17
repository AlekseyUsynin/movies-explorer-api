require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const helmet = require('helmet');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const { SERVER_URL, PORT } = require('./utils/config');
const routeCenter = require('./routes/index');
const errorCenter = require('./middlewares/errorCenter');
const limiter = require('./middlewares/limiter');
const { requestLogger, errorLogger } = require('./middlewares/logger');

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

app.use(helmet());
app.use(cookieParser());
app.use(requestLogger);
app.use(express.json());

mongoose.connect(SERVER_URL);

app.use(limiter);
app.use(routeCenter);
app.use(errorLogger);
app.use(errorCenter);

app.listen(PORT);
