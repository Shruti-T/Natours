const mongoose = require('mongoose');

//name,email,photo,password,passwordConfirm.

const userModel = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'A user must fill his/her name'],
    trim: true
  },
  email: {
    type: String,
    unique: true,
    required: [true, 'A user must have an email']
  },
  photo: {
    type: String
  },
  password: {
    type: String,
    minLength: [8, 'A password must have minimum 8 characters!']
  },
  confirmPassword: {
    type: String
  }
});

const User = mongoose.model('User', userModel);

module.exports = User;
