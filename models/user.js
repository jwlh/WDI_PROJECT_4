const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const s3 = require('../lib/s3');

const userSchema = new mongoose.Schema({
  firstName: {type: String},
  lastName: {type: String},
  username: {type: String},
  email: {type: String, unique: 'That email has already been taken', required: 'Please provide an email'},
  password: {type: String, required: 'Please set a password'},
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
  .path('image')
  .set(function getPreviousImage(image) {
    this._image = this.image;
    return image;
  });

userSchema
  .virtual('imageSRC')
  .get(function getImageSRC() {
    if(!this.image) return null;
    if(this.image.match(/^http/)) return this.image;
    return `https://s3-eu-west-2.amazonaws.com/${process.env.AWS_BUCKET_NAME}/${this.image}`;
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

userSchema.pre('save', function checkPreviousImage(next) {
  if(this.isModified('image') && this._image && !this._image.match(/^http/)) {
    return s3.deleteObject({ Key: this._image }, next);
  }
  next();
});

userSchema.pre('remove', function removeImage(next) {
  if(this.image && !this.image.match(/^http/)) {
    return s3.deleteObject({ Key: this.image }, next);
  }
  next();
});

userSchema.methods.validatePassword = function validatePassword(password) {
  return bcrypt.compareSync(password, this.password);
};

module.exports = mongoose.model('User', userSchema);
