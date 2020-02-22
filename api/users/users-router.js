const router = require('express').Router();
const Users = require('./users-model.js');
const auth = require('../middleware/authenticate-middleware.js');

router.post('/', auth, (req, res) => {
  const userData = req.body;

  if (!userData.username || !userData.password) {
    res.status(400).json({ message: `Required data missing` });
  } else {
    Users.createUser(userData)
      .then(addedUser => {
        res.status(201).json(addedUser);
      })
      .catch(err => {
        res.status(500).json({ message: `Failed to create new user` });
      });
  };
});

router.get('/:userRef', auth, (req, res) => {
  const { userRef } = req.params;
  userId = parseInt(userRef, 10);
  if (userId > 0) {
    if (!process.env.NO_LOGGER) console.log(`TCL: readUserById(${userId})`);
    Users.readUserById(userId)
      .then(user => {
        if (user) {
          if (!process.env.NO_LOGGER) console.log(`TCL: found:\n`, user);
          res.json({ userData: user });
        } else {
          res.status(404).json({ message: `Could not get user with given id` });
        };
      })
      .catch(err => {
        res.status(500).json({ message: `Failed to get user` });
      });
  } else {
    username = userRef;
    if (!process.env.NO_LOGGER) console.log(`TCL: readUserByName(${username})`);
    Users.readUserByName(username)
      .then(user => {
        if (user) {
          if (!process.env.NO_LOGGER) console.log(`TCL: found:\n`, user);
          res.json({ userData: user });
        } else {
          res.status(404).json({ message: `Could not get user with given name` });
        };
      })
      .catch(err => {
        res.status(500).json({ message: `Failed to get user` });
      });
  };
});
router.get('/', auth, (req, res) => {
  const j = req.decodedJwt;
  if (!process.env.NO_LOGGER) {
    console.log(`TCL: req.decodedJwt`, j);
  };
  Users.readUsersInRole(roles[0].id)
    .then(users => {
      res.json(users);
    })
    .catch(err => {
      res.status(500).json({ message: `Failed to get users` });
    });
});

router.put('/:userId/username', auth, (req, res) => {
  const { userId } = req.params;
  userId = parseInt(userId, 10);
  const changes = req.body;

  if (!changes.username) {
    res.status(400).json({ message: `Required data missing` });
  } else {
    if (userId > 0) {
      Users.readUserById(userId)
        .then(user => {
          if (!process.env.NO_LOGGER) console.log(`TCL: updateUser(${userId})`);
          Users.updateUser(userId, changes)
            .then(updatedUser => {
              if (updatedUser) {
                res.json({ updatedUser });
              } else {
                res.status(404).json({ message: `Could not get user with given id` });
              };
            })
        })
        .catch(err => {
          res.status(500).json({ message: `Failed to update username` });
        });
    };
  };
});
router.put('/:userId/password', auth, (req, res) => {
  const { userId } = req.params;
  userId = parseInt(userId, 10);
  const changes = req.body;

  if (!changes.password) {
    res.status(400).json({ message: `Required data missing` });
  } else {
    if (userId > 0) {
      Users.readUserById(userId)
        .then(user => {
          if (!process.env.NO_LOGGER) console.log(`TCL: updateUser(${userId})`);
          Users.updateUser(userId, changes)
            .then(updatedUser => {
              if (updatedUser) {
                res.json({ updatedUser });
              } else {
                res.status(404).json({ message: `Could not get user with given id` });
              };
            })
        })
        .catch(err => {
          res.status(500).json({ message: `Failed to update user password` });
        });
    };
  };
});

router.delete('/:userId', auth, (req, res) => {
  const { userId } = req.params;
  const uId = parseInt(userId, 10);
  if (!process.env.NO_LOGGER) console.log(`TCL: deleteUser(${uId})`);
  if (uId > 0) {
    Users.deleteUser(uId)
      .then(removedUser => {
        if (removedUser) {
          res.status(200).json({ removedUser: uId });
        } else {
          res.status(404).json({ message: `Could not get user with given id` });
        };
      })
      .catch(err => {
        res.status(500).json({ message: `Failed to delete user` });
      });
  };
});

module.exports = router;