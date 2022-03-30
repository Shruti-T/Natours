const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcryptjs');

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
    required: [true, 'Please confirm your password'],
    validate: {
      //this only works on CREATE and SAVE!!
      validator: function(el) {
        return el === this.password;
      },
      message: 'Password are not the same!'
    }
  }
});

userModel.pre('save', async function(next) {
  //Only run this function if password was actually modified.
  if (!this.isModified('password')) return next();

  //Hash the Password with cost of 12
  this.password = await bcrypt.hash(this.password, 12);
  this.passwordConfirm = undefined;
  //we dont need confirm passwrod anymore... so to delete per say.. make it undefined.
  next();
});

const User = mongoose.model('User', userModel);

module.exports = User;
