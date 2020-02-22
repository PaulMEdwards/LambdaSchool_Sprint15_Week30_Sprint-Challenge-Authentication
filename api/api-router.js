const router = require('express').Router();
const authenticate = require('./middleware/authenticate-middleware.js');

const authRouter = require('./auth/auth-router.js');
const jokesRouter = require('./jokes/jokes-router.js');

router.use('/auth', authRouter);
router.use('/jokes', authenticate, jokesRouter);

router.get('/', (req, res) => {
  res.sendStatus(204);  //No Content
});

module.exports = router;