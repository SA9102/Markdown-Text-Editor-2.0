const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  // googleId: {
  //     type: String,
  //     required: true,
  // },
  username: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  salt: {
    type: String,
    required: true,
  },
  // email: {
  //     type: String,
  //     required: true,
  //     unique: true,
  // },
});

// Static signup method
UserSchema.statics.signup = async (username, email, password) => {
  console.log('OKKK');
  const exists = await this.findOne({ email });

  if (exists) {
    throw Error('Email already taken');
  }

  const salt = await bcrypt.genSalt(10);
  const hash = await bcrypt.hash(password, salt);

  const user = await this.create({ username, email, password: hash });

  return user;
};

module.exports = mongoose.model('User', UserSchema);
