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
    subscribedWishlists: [],
    locked: false
  }, {
    firstName: 'louise',
    lastName: 'hall',
    username: 'louisehall',
    email: 'louise@louise.com',
    password: 'password',
    passwordConfirmation: 'password',
    subscribedWishlists: [],
    locked: false
  }, {
    firstName: 'ralph',
    lastName: 'hall',
    username: 'ralphhall',
    email: 'ralph@ralph.com',
    password: 'password',
    passwordConfirmation: 'password',
    subscribedWishlists: [],
    locked: false
  }, {
    firstName: 'gareth',
    lastName: 'hall',
    username: 'garethhall',
    email: 'gareth@gareth.com',
    password: 'password',
    passwordConfirmation: 'password',
    subscribedWishlists: [],
    locked: false
  }])
  .then((users) => {
    console.log(`${users.length} users created`);
    return Wishlist
      .create([{
        wishlistName: 'Christmas List',
        items: [{
          product: 'Amazon Echo',
          url: 'https://www.amazon.co.uk/dp/B06Y5ZW72J/ref=gw_aucc_rad_qh-snow?pf_rd_p=6450f0d6-9a4c-417f-9f1d-815a241b91b4&pf_rd_r=5KX6XS738EDH9FJQPCDV',
          bought: true
        }, {
          product: 'Pasta Machine',
          url: 'https://www.amazon.co.uk/dp/B0009U5OSO/_encoding=UTF8?coliid=I1Y968H10WTZUS&colid=1T51634WG7HIQ&psc=1',
          bought: false
        }, {
          product: 'Hawksmoor Cookbook',
          url: 'https://www.amazon.co.uk/dp/1848094566/_encoding=UTF8?coliid=I9OR3PS5S28BA&colid=1T51634WG7HIQ&psc=0',
          bought: true
        }, {
          product: 'Bose Soundlink Portable Speaker',
          url: 'https://www.amazon.co.uk/dp/B01HETFQKS/_encoding=UTF8?coliid=ISLLSJZLVPOPK&colid=1T51634WG7HIQ&psc=1',
          bought: false
        }, {
          product: 'Fifa 18 for PS4',
          url: 'https://www.amazon.co.uk/dp/B072JZB85B/_encoding=UTF8?coliid=I2JF1HB5XQH5L4&colid=1T51634WG7HIQ&psc=1',
          bought: false
        }, {
          product: 'Call of Duty WW2 for PS4',
          url: 'https://www.amazon.co.uk/dp/B071DHJC43/_encoding=UTF8?coliid=IV2I91ST0AEAA&colid=1T51634WG7HIQ&psc=1',
          bought: false
        }],
        createdBy: users[0],
        contributors: [users[1], users[2], users[3]]
      }, {
        wishlistName: 'Christmas List',
        items: [{
          product: 'make-up brush cleaner',
          url: 'https://alexiaco.com/collections/home/products/electric-makeup-brush-cleaner-dryer',
          bought: false
        }, {
          product: 'hair curling iron',
          url: 'https://www.tymestyle.co.uk/?https%3A%2F%2Fwww.tymestyle.co.uk%2F%3Futm_source=Facebook&utm_medium=CPC&utm_campaign=RoxyUK',
          bought: false
        }, {
          product: 'handbag tidy',
          url: 'https://www.aspinaloflondon.com/products/handbag-tidy-all-in-jet-black-lizard',
          bought: true
        }, {
          product: 'throw',
          url: 'https://m.johnlewis.com/john-lewis-honeybee-cotton-knitted-throw/smoke/p1966015',
          bought: false
        }, {
          product: 'candle',
          url: 'https://www.anthropologie.com/en-gb/shop/capri-blue-mercury-glass-jar-candle?category=candles&color=007',
          bought: true
        }, {
          product: 'Book about bars',
          url: 'https://www.amazon.co.uk/Straight-Up-insiders-interesting-experiences/dp/1784722731/ref=nodl_',
          bought: false
        }],
        createdBy: users[1],
        contributors: [users[0], users[2], users[3]]
      }, {
        wishlistName: 'Christmas List',
        items: [{
          product: 'sausages',
          url: 'https://www.amazon.co.uk/Heck-Percent-Pork-Sausages-400/dp/B00D24R6KS/ref=sr_1_1?ie=UTF8&qid=1512743147&sr=8-1&ppw=fresh&keywords=sausages',
          bought: false
        }, {
          product: 'fluffy toy',
          url: 'https://www.amazon.co.uk/KONG-Scrunch-Knots-Medium-Large/dp/B00EAN1U7A/ref=sr_1_8?s=pet-supplies&ie=UTF8&qid=1512743196&sr=1-8&keywords=dog+toys',
          bought: false
        }, {
          product: 'tennis balls',
          url: 'https://www.amazon.co.uk/KONG-Squeakair-Dog-Tennis-Ball/dp/B000A8CUSM/ref=sr_1_10?s=pet-supplies&ie=UTF8&qid=1512743196&sr=1-10&keywords=dog+toys',
          bought: true
        }, {
          product: 'new bed',
          url: 'https://www.amazon.co.uk/KosiPet-Fleece-Rhomboid-Memory-Waterproof/dp/B004OOA2JW/ref=lp_471358031_1_16?s=pet-supplies&ie=UTF8&qid=1512743331&sr=1-16',
          bought: false
        }, {
          product: 'towel coat',
          url: 'https://www.amazon.co.uk/Dog-Drying-Coat-Red-15-18Inches/dp/B01LXO71VJ/ref=lp_471377031_1_18?s=pet-supplies&ie=UTF8&qid=1512743391&sr=1-18',
          bought: true
        }],
        createdBy: users[2],
        contributors: [users[0], users[1], users[3]]
      }])
      .then((wishlists) => {
        console.log(`${wishlists.length} wishlists created`);
      });
  })
  .catch((err) => console.log(err))
  .finally(() => mongoose.connection.close());
