const express = require('express');
const bodyParser = require('body-parser');
const helmet = require('helmet');
const cors = require('cors');
const logger = require('./logger');
const session = require('express-session');
const knexSessionStore = require('connect-session-knex')(session);

const sessionConfig = {
  name: 'session',
  secret: 'aybnv39y7sthigjklcnyq3mwv0sbpmo34j689luisvcm',
  cookie: {
    maxAge: 1000 * 60 * 60,
    secure: false,
    httpOnly: true
  },
  resave: false,
  rolling: true,
  saveUninitialized: true,
  store: new knexSessionStore({
    knex: require('../../database/dbConfig.js'),
    tablename: 'sessions',
    sidfieldname: 'sid',
    createtable: true,
    clearInterval: 1000 * 60 * 60
  })
};

module.exports = server => {
  server.use(helmet());
  server.use(express.json());
  server.use(bodyParser.raw({ type: 'application/json' }));
  server.use(cors());
  server.use(logger);
  server.use(session(sessionConfig));
};