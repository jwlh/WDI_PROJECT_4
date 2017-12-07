const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const userSchema = new mongoose.Schema({
  firstName: {type: String},
  lastName: {type: String},
  username: {type: String},
  email: {type: String, unique: 'That email has already been taken', required: true},
  password: {type: String},
  facebookId: {type: String},
  image: {type: String},
  locked: {type: Boolean, default: true}
});

userSchema.virtual('myWishlists', {
  ref: 'Wishlist',
  localField: '_id',
  foreignField: 'createdBy'
});

userSchema.virtual('subscribedWishlists', {
  ref: 'Wishlist',
  localField: '_id',
  foreignField: 'contributors'
});


userSchema
  .virtual('passwordConfirmation')
  .set(function setPasswordConfirmation(passwordConfirmation) {
    this._passwordConfirmation = passwordConfirmation;
  });

userSchema.pre('validate', function checkPassword(next) {
  if (this.locked === false) {
    if(!this.password && !this.facebookId) {
      this.invalidate('password', 'Password is required');
    }
    if(!this.password && this._passwordConfirmation !== this.password) {
      this.invalidate('passwordConfirmation', 'Passwords do not match');
    }
  }
  next();
});

userSchema.pre('save', function hashPassword(next) {
  if(this.isModified('password')) {
    this.password = bcrypt.hashSync(this.password, bcrypt.genSaltSync(8));
  }
  next();
});

userSchema.methods.validatePassword = function validatePassword(password) {
  return bcrypt.compareSync(password, this.password);
};

module.exports = mongoose.model('User', userSchema);
