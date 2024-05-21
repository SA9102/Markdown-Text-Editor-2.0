const express = require('express');
const session = require('express-session');
const mongoose = require('mongoose');
const cors = require('cors');
const MongoStore = require('connect-mongo');
const passport = require('passport');
const generatePassword = require('./lib/passwordUtils').generatePassword;

const User = require('./models/User');
require('dotenv').config();

const app = express();

require('./config/passport');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors({ origin: 'http://localhost:5173', credentials: true }));
app.use(
  session({
    secret: 'my secret',
    resave: false,
    saveUninitialized: false,
    store: MongoStore.create({ mongoUrl: process.env.MONGO_URI, collectionName: 'sessions' }),
    cookie: {
      maxAge: 1000 * 60 * 60 * 24,
    },
  })
);

app.use(passport.initialize());
app.use(passport.session());

app.use((req, res, next) => {
  console.log('SESSION');
  console.log(req.session);
  console.log('USER');
  console.log(req.user);
  next();
});

app.post('/registerUser', async (req, res) => {
  try {
    const user = await User.findOne({ username: req.body.username });

    console.log(user);
    console.log(req.body.password);

    if (user) {
      console.log('Already exists');
      return res.json({ success: false, info: 'username' });
    }

    console.log('CONTINUING ...');
    const saltHash = generatePassword(req.body.password);
    const salt = saltHash.salt;
    const hash = saltHash.hash;
    await User.create({ username: req.body.username, password: hash, salt });
    res.status(201);
    res.json({ success: true, info: 'Account creation successful.' });
  } catch (err) {
    console.log(err);
    res.json({ success: false, info: 'A server error occurred. Please try again.' });
  }
});

app.post('/loginUser', passport.authenticate('local'), (req, res, next) => {
  console.log('USER in /loginUser');
  console.log(req.session);
  console.log(req.user);
  req.session.save();
  res.status(200).json(req.user);
});

app.get('/logout', (req, res, next) => {
  req.logout((err) => {
    if (err) {
      console.log('IS ERR');
      return res.json({ success: false });
    }
    console.log('NO ERR');
    res.json({ success: true });
  });
});

app.get('/getUser', (req, res) => {
  console.log('USER');
  console.log(req.user);
  console.log('IS AUTHENTICATED');
  console.log(req.isAuthenticated());
  if (req.isAuthenticated()) {
    res.json(req.user);
  } else {
    res.json({});
  }
});

// const

// app.post('/saveData', (req, res) => {
//   // try {

//   // }
// })

app.listen(process.env.PORT, () => {
  console.log(`Listening on port ${process.env.PORT}`);
});
