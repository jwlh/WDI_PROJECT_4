const mongoose = require('mongoose');

const wishlistSchema = mongoose.Schema({
  items: [],
  createdBy: { type: mongoose.Schema.ObjectId, ref: 'User', required: true },
  contributors: [{type: mongoose.Schema.ObjectId, ref: 'User'}]
});

module.exports = mongoose.model('Wishlist', wishlistSchema);
