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
require("dotenv").config();

const app = express();

require("./config/passport");

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors({ origin: "http://localhost:5173", credentials: true }));
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

app.use((req, res, next) => {
  console.log("SESSION");
  console.log(req.session);
  console.log("USER");
  console.log(req.user);
  next();
});

app.post("/registerUser", async (req, res) => {
  try {
    const user = await User.findOne({ username: req.body.username });

    console.log(user);
    console.log(req.body.password);

    if (user) {
      console.log("Already exists");
      return res.json({ success: false, info: "username" });
    }

    console.log("CONTINUING ...");
    const saltHash = generatePassword(req.body.password);
    const salt = saltHash.salt;
    const hash = saltHash.hash;
    await User.create({ username: req.body.username, password: hash, salt });
    res.status(201);
    res.json({ success: true, info: "Account creation successful." });
  } catch (err) {
    console.log(err);
    res.json({ success: false, info: "A server error occurred. Please try again." });
  }
});

app.post("/loginUser", passport.authenticate("local"), (req, res, next) => {
  console.log("USER in /loginUser");
  console.log(req.session);
  console.log(req.user);
  req.session.save();
  res.status(200).json(req.user);
});

app.get("/logout", (req, res, next) => {
  req.logout((err) => {
    if (err) {
      console.log("IS ERR");
      return res.json({ success: false });
    }
    console.log("NO ERR");
    res.json({ success: true });
  });
});

app.get("/getUser", async (req, res) => {
  console.log("IS AUTHENTICATED");
  console.log(req.isAuthenticated());
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
  console.log(req.body.data);
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
    console.log("FETCHING DATA ...");
    const data = await Folder.findOne({ user: req.user.id });
    console.log(data.data);
    res.json({ data: data.data });
  } catch (err) {
    console.log(err);
    res.json({ msg: "ERROR" });
  }
});

app.listen(process.env.PORT, () => {
  console.log(`Listening on port ${process.env.PORT}`);
});
