const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
require('dotenv').config();
const conn = require('./database');
const User = require('../models/User');
const validatePassword = require('../lib/passwordUtils').validatePassword;

const customFields = {
  usernameField: 'username',
  passwordField: 'password',
};

const verifyCallback = (username, password, done) => {
  User.findOne({ username: username })
    .then((user) => {
      if (!user) {
        console.log('User not found');
        return done(null, false);
      }
      const isValid = validatePassword(password, user.password, user.salt);

      if (isValid) {
        return done(null, user);
      } else {
        return done(null, false);
      }
    })
    .catch((err) => {
      done(err);
    });
};

const strategy = new LocalStrategy(customFields, verifyCallback);

passport.use(strategy);

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser((userId, done) => {
  User.findById(userId)
    .then((user) => {
      done(null, user);
    })
    .catch((err) => done(err));
});
