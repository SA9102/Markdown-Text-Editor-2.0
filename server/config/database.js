const mongoose = require('mongoose');

const connection = mongoose.connect(process.env.MONGO_URI).then(() => console.log('Connected to db!'));

module.exports = connection;
