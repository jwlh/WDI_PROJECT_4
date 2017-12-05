const mongoose   = require('mongoose');
mongoose.Promise = require('bluebird');

const { dbURI } = require('../config/environment');
const User = require('../models/user');
const Wishlist = require('../models/wishlist');

mongoose.connect(dbURI, { useMongoClient: true });

User.collection.drop();
Wishlist.collection.drop();

User
  .create([{
    firstName: 'jonny',
    lastName: 'hall',
    username: 'jonnyhall',
    email: 'jonny@jonny.com',
    password: 'password',
    passwordConfirmation: 'password',
    subscribedWishlists: []
  }, {
    firstName: 'louise',
    lastName: 'hall',
    username: 'louisehall',
    email: 'louise@louise.com',
    password: 'password',
    passwordConfirmation: 'password',
    subscribedWishlists: []
  }])
  .then((users) => {
    console.log(`${users.length} users created`);
    return Wishlist
      .create([{
        items: [{product: 'Amazon Echo', url: 'https://www.amazon.co.uk/dp/B06Y5ZW72J/ref=gw_aucc_rad_qh-snow?pf_rd_p=6450f0d6-9a4c-417f-9f1d-815a241b91b4&pf_rd_r=5KX6XS738EDH9FJQPCDV'}],
        createdBy: users[0],
        contributors: [users[1]]
      }])
      .then((wishlists) => {
        console.log(`${wishlists.length} wishlists created`);
      });
  })
  .catch((err) => console.log(err))
  .finally(() => mongoose.connection.close());
