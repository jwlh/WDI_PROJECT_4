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
        items: [{
          product: 'Amazon Echo',
          url: 'https://www.amazon.co.uk/dp/B06Y5ZW72J/ref=gw_aucc_rad_qh-snow?pf_rd_p=6450f0d6-9a4c-417f-9f1d-815a241b91b4&pf_rd_r=5KX6XS738EDH9FJQPCDV'
        }, {
          product: 'Pasta Machine',
          url: 'https://www.amazon.co.uk/dp/B0009U5OSO/_encoding=UTF8?coliid=I1Y968H10WTZUS&colid=1T51634WG7HIQ&psc=1'
        }, {
          product: 'Hawksmoor Cookbook',
          url: 'https://www.amazon.co.uk/dp/1848094566/_encoding=UTF8?coliid=I9OR3PS5S28BA&colid=1T51634WG7HIQ&psc=0'
        }, {
          product: 'Bose Soundlink Portable Speaker',
          url: 'https://www.amazon.co.uk/dp/B01HETFQKS/_encoding=UTF8?coliid=ISLLSJZLVPOPK&colid=1T51634WG7HIQ&psc=1'
        }, {
          product: 'Fifa 18 for PS4',
          url: 'https://www.amazon.co.uk/dp/B072JZB85B/_encoding=UTF8?coliid=I2JF1HB5XQH5L4&colid=1T51634WG7HIQ&psc=1'
        }, {
          product: 'Call of Duty WW2 for PS4',
          url: 'https://www.amazon.co.uk/dp/B071DHJC43/_encoding=UTF8?coliid=IV2I91ST0AEAA&colid=1T51634WG7HIQ&psc=1'
        }],
        createdBy: users[0],
        contributors: [users[1]]
      }, {
        items: [{
          product: 'make-up brush cleaner',
          url: 'https://alexiaco.com/collections/home/products/electric-makeup-brush-cleaner-dryer'
        }, {
          product: 'hair curling iron',
          url: 'https://www.tymestyle.co.uk/?https%3A%2F%2Fwww.tymestyle.co.uk%2F%3Futm_source=Facebook&utm_medium=CPC&utm_campaign=RoxyUK'
        }, {
          product: 'handbag tidy',
          url: 'https://www.aspinaloflondon.com/products/handbag-tidy-all-in-jet-black-lizard'
        }, {
          product: 'throw',
          url: 'https://m.johnlewis.com/john-lewis-honeybee-cotton-knitted-throw/smoke/p1966015'
        }, {
          product: 'candle',
          url: 'https://www.anthropologie.com/en-gb/shop/capri-blue-mercury-glass-jar-candle?category=candles&color=007'
        }, {
          product: 'Book about bars',
          url: 'https://www.amazon.co.uk/Straight-Up-insiders-interesting-experiences/dp/1784722731/ref=nodl_'
        }],
        createdBy: users[1],
        contributors: [users[0]]
      }])
      .then((wishlists) => {
        console.log(`${wishlists.length} wishlists created`);
      });
  })
  .catch((err) => console.log(err))
  .finally(() => mongoose.connection.close());
