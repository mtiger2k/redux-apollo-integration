const Authentication = require('./controllers/authentication');
const User = require('./controllers/user');
const passportService = require('./services/passport');
const passport = require('passport');

const requireAuth = passport.authenticate('jwt', {session: false});
const requireSignIn = passport.authenticate('local', {session: false});

module.exports = function (app) {
  app.get('/getMessage', requireAuth, function (req, res) {
    res.send({message: 'S3CR3T M3SS4G3'});
  });
  // auth
  app.post('/signup', Authentication.signup);
  app.post('/signin', requireSignIn, Authentication.signin);

  // user
  app.get('/me', requireAuth, User.me);
  app.post('/update', requireAuth, User.update);

}