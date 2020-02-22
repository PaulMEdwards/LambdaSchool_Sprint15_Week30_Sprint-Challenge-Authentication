const router = require('express').Router();
const authenticate = require('./middleware/authenticate-middleware.js');

const authRouter = require('./auth/auth-router.js');
const usersRouter = require('./users/users-router.js');
const jokesRouter = require('./jokes/jokes-router.js');

const moment = require('moment');

router.use('/auth', authRouter);
router.use('/users', authenticate, usersRouter);
router.use('/jokes', authenticate, jokesRouter);

router.get('/', (req, res) => {
  res.sendStatus(204);  //No Content
});

router.get('/now', (req, res) => {
  let a = new Array();

  const d = new Date();
  const nd = "new Date()";

  const dm = moment();
  const nmd = "moment()";

  a.push(`${nmd}.format("YYYYMMDDHHmmssSSS"): ${dm.format("YYYYMMDDHHmmssSSS")}`);
  a.push(`\n${nmd}.format("X"): ${dm.format("X")}`);

  a.push(`\n\n${nd}.toISOString(): ${d.toISOString()}`);

  a.push(`\n\n${nd}.toUTCString(): ${d.toUTCString()}`);

  a.push(`\n\n${nd}.toDateString(): ${d.toDateString()}`);
  a.push(`\n${nd}.toTimeString(): ${d.toTimeString()}`);
  a.push(`\n${nd}.toString(): ${d.toString()}`);

  var dateOptions = { month: 'long', day: 'numeric', year: 'numeric' };
  a.push(`\n\ndateOptions = { month: 'long', day: 'numeric', year: 'numeric' }`);
  a.push(`\n${nd}.toLocaleDateString("en-US", dateOptions)+.toLocaleTimeString(): ${d.toLocaleDateString("en-US", dateOptions)} ${d.toLocaleTimeString()}`);
  a.push(`\n${nd}.toLocaleDateString("en-US", dateOptions): ${d.toLocaleDateString("en-US", dateOptions)}`);
  a.push(`\n${nd}.toLocaleTimeString(): ${d.toLocaleTimeString()}`);

  res.send(a.toString());
});

module.exports = router;