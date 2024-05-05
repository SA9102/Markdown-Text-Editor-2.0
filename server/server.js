const express = require('express');
const cors = require('cors');
const connectDB = require('./db');
const bcrypt = require('bcrypt');
const passport = require('passport');
const session = require('express-session');
const LocalStrategy = require('passport-local');
const MongoStore = require('connect-mongo');

require('dotenv').config();
require('./config/passport')(passport)

connectDB();

// Models
const User = require('./models/User');

const app = express();

// Session middleware
app.use(session{
    secret: 'foo',
    resave: false,
    saveUninitialized: false,
    // store: 
})

// Passport middleware
app.use(passport.initialize())
app.use(passport.session())

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

// app.use(
//     session({
//         secret: 'foo',
//         store: new MongoStore({ mongooseConnection: connection, collection: 'sessions' }),
//         cookie: {
//             maxAge: 1000 * 60 * 60 * 24,
//         },
//     })
// );

// app.post(
//     '/getUser',
//     passport.authenticate('local', {
//         successRedirect: '/',
//         failureRedirect: '/login',
//     })
// );

// app.post('/register', async (req, res) => {
//     const form = req.body;
//     console.log(form);
//     try {
//         console.log('1');
//         const exists = await User.findOne({ email: form.email });
//         console.log('2');
//         if (exists) {
//             console.log('EMAIL ALREADY TAKEN');
//             throw Error('Email already taken');
//         }
//         console.log('3');
//         const salt = await bcrypt.genSalt(10);
//         const hash = await bcrypt.hash(form.password, salt);
//         console.log('4');
//         const user = await User.create({ username: form.username, email: form.email, password: hash });

//         console.log('5');
//         res.status(200).json(user);
//     } catch (error) {
//         res.status(400).json({ error: error.message });
//     }
// });

app.listen(process.env.PORT, () => {
    console.log(`Listening on port ${process.env.PORT}`);
});
