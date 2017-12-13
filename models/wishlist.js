const mongoose = require('mongoose');

const wishlistSchema = mongoose.Schema({
  wishlistName: {type: String, required: 'Please give your list a name'},
  items: [],
  createdBy: { type: mongoose.Schema.ObjectId, ref: 'User', required: true },
  contributors: [{type: mongoose.Schema.ObjectId, ref: 'User'}]
});

module.exports = mongoose.model('Wishlist', wishlistSchema);
