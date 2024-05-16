// const express = require('express');
// const cors = require('cors');
// const fetch = (...args) => import('node-fetch').then(({ default: fetch }) => fetch(...args));
// const session = require('express-session');
// const mongoose = require('mongoose');
// const MongoStore = require('connect-mongo');
// const User = require('./models/User');
// const Folder = require('./models/Folder');

// require('dotenv').config();

// mongoose
//   .connect(process.env.MONGO_URI)
//   .then(() => console.log('Successfully connected to db!'))
//   .catch((error) => console.log(error));

// const app = express();

// app.use(express.json());
// app.use(express.urlencoded({ extended: true }));
// app.use(cors());
// app.use(
//   session({
//     secret: 'my secret',
//     resave: false,
//     saveUninitialized: false,
//     store: MongoStore.create({ mongoUrl: process.env.MONGO_URI, collection: 'sessions' }),
//     cookie: {
//       maxAge: 1000 * 60 * 60 * 24,
//       secure: false,
//     },
//   })
// );

// // Logging in via GitHub (if the user has not logged in), and thereafter receive the access token.
// //
// app.get('/getAccessToken', (req, res) => {
//   fetch(`https://github.com/login/oauth/access_token?client_id=${process.env.GH_CLIENT_ID}&client_secret=${process.env.GH_CLIENT_SECRET}&code=${req.query.code}`, {
//     method: 'POST',
//     headers: {
//       Accept: 'application/json',
//     },
//   })
//     .then((response) => response.json())
//     .then(async (data) => {
//       //   await fetch('http://localhost:3000/getUserData', {
//       //     method: 'GET',
//       //     headers: {
//       //       Authorization: 'Bearer ' + data.access_token,
//       //     },
//       //   });
//       console.log(data);
//       res.json(data);
//     });
// });

// // Retrieving the user's GitHub username (this is done as soon as the access token is retrieved).
// //
// app.get('/getUserData', async (req, res) => {
//   console.log('AUTHORIZATION');
//   console.log(req.get('Authorization'));
//   try {
//     const response = await fetch('https://api.github.com/user', {
//       method: 'GET',
//       headers: {
//         Authorization: req.get('Authorization'),
//       },
//     });
//     const data = await response.json();
//     req.session.user = data.login;
//     console.log(data);
//     console.log('SESSION ID');
//     console.log(req.sessionID);
//     req.session.save();
//     res.json(data);
//   } catch (err) {
//     console.log(err);
//     res.json({});
//   }
// });

// app.get('/saveData', (req, res) => {
//   const data = req.body;

//   // try {
//   //   console.log('USERNAME:');
//   //   console.log(req.session.user);

//   //   const user = await User.findOne({ username: req.session.user });
//   //   if (user) {
//   //     const rec = async (obj) => {
//   //       for (let i = 0; i < obj.length; i++) {
//   //         if (obj[i].type === 'folder') {
//   //           try {
//   //             await Folder.create({ name: obj[i].name, user: req.session.user });
//   //           } catch (err) {
//   //             console.log(err);
//   //           }
//   //         }
//   //         rec(obj[i].children);
//   //       }
//   //     };

//   //     console.log('Calling rec ...');
//   //     rec(data);
//   //   }
//   // } catch (err) {
//   //   console.log(err);
//   // }
//   console.log(req.session.user);
//   console.log(req.sessionID);

//   res.json({ message: 'OK' });
// });

// app.get('/id', (req, res) => {
//   console.log(req.sessionID);
//   res.json({});
// });

// app.get('/id2', (req, res) => {
//   req.session.foo = 'foo';
//   console.log(req.sessionID);
//   res.json({});
// });

// app.listen(process.env.PORT, () => {
//   console.log(`Listening on port ${process.env.PORT}`);
// });
