const mongoose = require('mongoose');
const validator = require('validator');
//name,email,photo,password,passwordConfirm.

const userModel = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Please tell us your name.']
  },
  email: {
    type: String,
    unique: true,
    required: [true, 'A user must have an email'],
    validate: [validator.isEmail, 'Please provide a valid email.']
  },
  photo: String,
  password: {
    type: String,
    required: [true, 'Please provide a password'],
    minLength: [8, 'A password must have minimum 8 characters!']
  },
  passwordConfirm: {
    type: String,
    required: [true, 'Please confirm your password']
  }
});

const User = mongoose.model('User', userModel);

module.exports = User;
