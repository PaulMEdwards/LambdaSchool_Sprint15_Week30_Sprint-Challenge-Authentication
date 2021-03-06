const router = require('express').Router();
const bcrypt = require('bcryptjs');
const jwt = require('../middleware/jwt.js');
const bodyParser = require('body-parser');
const jsonParser = bodyParser.json();

const Users = require('../users/users-model.js');

const passwordStrength = 12;

router.post('/register', jsonParser, (req, res) => {
  let userData = req.body;
  if (!process.env.NO_LOGGER) console.log(`TCL: user`, userData);

  if (!userData.username || !userData.password) {
    res.status(400).json({ message: `Required data missing` });
  } else {
    const hash = bcrypt.hashSync(userData.password, passwordStrength);
    if (!process.env.NO_LOGGER) console.log(`TCL: hash`, hash);
    
    userData.password = hash;

    Users.createUser(userData)
      .then(saved => {
        res.status(201).json(saved);
      })
      .catch(err => {
        if (!process.env.NO_LOGGER) console.log(`TCL: err`, err);
        res.status(500).json(err);
      });
  };
});

router.post('/login', jsonParser, (req, res) => {
  let userData = req.body;
  if (!process.env.NO_LOGGER) console.log(`TCL: login -> user input\n`, userData);

  if (!userData.username || !userData.password) {
    res.status(400).json({ message: `Required data missing` });
  } else {
    username = userData.username;
    Users.readUserByName(username)
      .then(user => {
        if (!process.env.NO_LOGGER) console.log(`TCL: login -> user found\n`, user);
        if (user) {
          const b = bcrypt.compareSync(userData.password, user.password);
          if (!process.env.NO_LOGGER) console.log(`TCL: login -> b =`, b);
          if (b) {
            const token = jwt.generateToken(user);
            if (!process.env.NO_LOGGER) console.log(`TCL: login -> token =`, token);
            res.status(200).json({
              message: `Welcome ${user.username}!`,
              token,
            });
          } else {
            res.status(401).json({ message: `Invalid Credentials` });
          };
        } else {
          res.status(404).json({ message: `Invalid User` });
        };
      })
      .catch(err => {
        res.status(500).json(err);
      });
  };
});

module.exports = router;
