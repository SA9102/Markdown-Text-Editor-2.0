const mongoose = require("mongoose");

const connection = mongoose.connect("mongodb+srv://shayan677:r2YJ8RBFa3lqcoLa@mte.o8xa9na.mongodb.net/?retryWrites=true&w=majority&appName=mte").then(() => console.log("Connected to db!"));

module.exports = connection;
