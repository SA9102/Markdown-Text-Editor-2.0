const express = require("express");
const session = require("express-session");
const mongoose = require("mongoose");
const cors = require("cors");
const MongoStore = require("connect-mongo");
const passport = require("passport");
const generatePassword = require("./lib/passwordUtils").generatePassword;

const User = require("./models/User");
const Folder = require("./models/Folder");
const File = require("./models/File");

const PORT = process.env.PORT || 3000;
// require("dotenv").config();

const app = express();

require("./config/passport");

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
// app.use(cors({ origin: "https://localhost:5173", credentials: true }));
app.use(cors({ origin: "https://markdown-text-editor-2-0.onrender.com", credentials: true }));
app.use(
  session({
    secret: "my secret",
    resave: false,
    saveUninitialized: false,
    store: MongoStore.create({ mongoUrl: process.env.MONGO_URI, collectionName: "sessions" }),
    cookie: {
      maxAge: 1000 * 60 * 60 * 24,
    },
  })
);

app.use(passport.initialize());
app.use(passport.session());

app.post("/registerUser", async (req, res) => {
  try {
    const user = await User.findOne({ username: req.body.username });

    if (user) {
      return res.json({ success: false, info: "username" });
    }

    const saltHash = generatePassword(req.body.password);
    const salt = saltHash.salt;
    const hash = saltHash.hash;
    await User.create({ username: req.body.username, password: hash, salt });
    res.status(201);
    res.json({ success: true, info: "Account creation successful." });
  } catch (err) {
    res.json({ success: false, info: "A server error occurred. Please try again." });
  }
});

app.post("/loginUser", passport.authenticate("local"), (req, res, next) => {
  req.session.save();
  res.status(200).json(req.user);
});

app.get("/logout", (req, res, next) => {
  req.logout((err) => {
    if (err) {
      return res.json({ success: false });
    }
    res.json({ success: true });
  });
});

app.get("/getUser", async (req, res) => {
  if (req.isAuthenticated()) {
    try {
      const data = await Folder.findOne({ user: req.user.id });
      if (data) {
        res.json({ user: req.user, data: data.data });
      } else {
        res.json({ user: req.user });
      }
    } catch (err) {
      console.log(err);
      res.json({ msg: "Error" });
    }
  } else {
    res.json({});
  }
});

app.post("/saveData", async (req, res) => {
  try {
    await Folder.findOneAndDelete({ user: req.user.id });
    await Folder.create({ data: req.body.data, user: req.user.id });
    res.json({ msg: "OK" });
  } catch (err) {
    console.log(err);
    res.json({ msg: "ERROR" });
  }
});

app.get("/getData", async (req, res) => {
  try {
    const data = await Folder.findOne({ user: req.user.id });
    res.json({ data: data.data });
  } catch (err) {
    console.log(err);
    res.json({ msg: "ERROR" });
  }
});

app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
});
