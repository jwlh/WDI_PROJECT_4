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
    firstName: 'Jonny',
    lastName: 'Hall',
    username: 'jonnyhall',
    email: 'jonnyhall@me.com',
    password: 'password',
    passwordConfirmation: 'password',
    subscribedWishlists: [],
    locked: false
  }, {
    firstName: 'Louise',
    lastName: 'Hall',
    username: 'louise',
    email: 'louise@louise.com',
    password: 'password',
    passwordConfirmation: 'password',
    subscribedWishlists: [],
    locked: false
  }, {
    firstName: 'Ralph',
    lastName: 'Hall',
    username: 'ralph',
    email: 'ralph@ralph.com',
    password: 'password',
    passwordConfirmation: 'password',
    subscribedWishlists: [],
    locked: false
  }, {
    firstName: 'Michael',
    lastName: 'Hall',
    username: 'michael',
    email: 'michael@michael.com',
    password: 'password',
    passwordConfirmation: 'password',
    subscribedWishlists: [],
    locked: false
  }, {
    firstName: 'Susanne',
    lastName: 'Hall',
    username: 'susanne',
    email: 'susanne@susanne.com',
    password: 'password',
    passwordConfirmation: 'password',
    subscribedWishlists: [],
    locked: false
  }, {
    firstName: 'Moyra',
    lastName: 'Marshall',
    username: 'moyra',
    email: 'moyra@moyra.com',
    password: 'password',
    passwordConfirmation: 'password',
    subscribedWishlists: [],
    locked: false
  }, {
    firstName: 'Paul',
    lastName: 'Marshall',
    username: 'Spot On',
    email: 'paul@paul.com',
    password: 'password',
    passwordConfirmation: 'password',
    subscribedWishlists: [],
    locked: false
  }, {
    firstName: 'Peter',
    lastName: 'Smith',
    username: 'psmith',
    email: 'peter@peter.com',
    password: 'password',
    passwordConfirmation: 'password',
    subscribedWishlists: [],
    locked: false
  }, {
    firstName: 'Peta',
    lastName: 'Marot',
    username: 'glitterball',
    email: 'peta@peta.com',
    password: 'password',
    passwordConfirmation: 'password',
    subscribedWishlists: [],
    locked: false
  }, {
    firstName: 'Celine',
    lastName: 'Bird',
    username: 'Celine',
    email: 'celine@celine.com',
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
        contributors: [users[1], users[2], users[3], users[4], users[5], users[6], users[7], users[8]]
      }, {
        wishlistName: 'Christmas Ideas',
        items: [{
          product: 'Make-up brush cleaner',
          url: 'https://alexiaco.com/collections/home/products/electric-makeup-brush-cleaner-dryer',
          bought: false
        }, {
          product: 'Hair curling iron',
          url: 'https://www.tymestyle.co.uk/?https%3A%2F%2Fwww.tymestyle.co.uk%2F%3Futm_source=Facebook&utm_medium=CPC&utm_campaign=RoxyUK',
          bought: false
        }, {
          product: 'Handbag tidy',
          url: 'https://www.aspinaloflondon.com/products/handbag-tidy-all-in-jet-black-lizard',
          bought: true
        }, {
          product: 'Throw',
          url: 'https://m.johnlewis.com/john-lewis-honeybee-cotton-knitted-throw/smoke/p1966015',
          bought: false
        }, {
          product: 'Candle',
          url: 'https://www.anthropologie.com/en-gb/shop/capri-blue-mercury-glass-jar-candle?category=candles&color=007',
          bought: true
        }, {
          product: 'Book about bars',
          url: 'https://www.amazon.co.uk/Straight-Up-insiders-interesting-experiences/dp/1784722731/ref=nodl_',
          bought: false
        }],
        createdBy: users[1],
        contributors: [users[0], users[2], users[3], users[4], users[5], users[6], users[7], users[8]]
      }, {
        wishlistName: 'Christmas List',
        items: [{
          product: 'Sausages',
          url: 'https://www.amazon.co.uk/Heck-Percent-Pork-Sausages-400/dp/B00D24R6KS/ref=sr_1_1?ie=UTF8&qid=1512743147&sr=8-1&ppw=fresh&keywords=sausages',
          bought: false
        }, {
          product: 'Fluffy toy',
          url: 'https://www.amazon.co.uk/KONG-Scrunch-Knots-Medium-Large/dp/B00EAN1U7A/ref=sr_1_8?s=pet-supplies&ie=UTF8&qid=1512743196&sr=1-8&keywords=dog+toys',
          bought: false
        }, {
          product: 'Tennis balls',
          url: 'https://www.amazon.co.uk/KONG-Squeakair-Dog-Tennis-Ball/dp/B000A8CUSM/ref=sr_1_10?s=pet-supplies&ie=UTF8&qid=1512743196&sr=1-10&keywords=dog+toys',
          bought: true
        }, {
          product: 'New bed',
          url: 'https://www.amazon.co.uk/KosiPet-Fleece-Rhomboid-Memory-Waterproof/dp/B004OOA2JW/ref=lp_471358031_1_16?s=pet-supplies&ie=UTF8&qid=1512743331&sr=1-16',
          bought: false
        }, {
          product: 'Towel coat',
          url: 'https://www.amazon.co.uk/Dog-Drying-Coat-Red-15-18Inches/dp/B01LXO71VJ/ref=lp_471377031_1_18?s=pet-supplies&ie=UTF8&qid=1512743391&sr=1-18',
          bought: true
        }],
        createdBy: users[2],
        contributors: [users[0], users[2], users[3], users[4], users[5], users[6], users[7], users[8], users[9]]
      }, {
        wishlistName: 'Xmas Wishlist',
        items: [{
          product: 'Coach Edie Handbag',
          url: 'https://www.johnlewis.com/coach-edie-28-leather-shoulder-bag-stone/p3288354',
          bought: false
        }, {
          product: 'Bobbie Brown Gift Set',
          url: 'https://www.johnlewis.com/bobbi-brown-luxe-classics-mini-lip-makeup-gift-set/p3342052',
          bought: true
        }, {
          product: 'CARAT ring',
          url: 'https://www.johnlewis.com/carat-london-vega-stella-ring-silver/p3261366',
          bought: true
        }, {
          product: 'Gin Garden Kit',
          url: 'https://www.notonthehighstreet.com/plantandgrow/product/ginalicious-gin-botanical-cocktail-garden-kit',
          bought: false
        }, {
          product: 'Candle',
          url: 'https://www.anthropologie.com/en-gb/shop/capri-blue-mercury-glass-jar-candle?category=candles&color=007',
          bought: true
        }, {
          product: 'Portable Photo Printer',
          url: 'https://www.johnlewis.com/hp-sprocket-portable-photo-printer/p3065205?colour=White',
          bought: false
        }],
        createdBy: users[9],
        contributors: [users[0], users[1], users[5], users[6]]
      }, {
        wishlistName: 'Christmas Ideas',
        items: [{
          product: 'iPad',
          url: 'https://www.apple.com/uk/ipad/',
          bought: false
        }, {
          product: 'iPad case with keyboard',
          url: 'https://www.apple.com/uk/shop/product/HL6Y2B/A/logitech-slim-folio-case-with-integrated-bluetooth-keyboard-for-ipad-black?fnode=9a&fs=f%3Dipad_9_7%26fh%3D4583%252B48af',
          bought: false
        }, {
          product: 'Archangel by Robert Harris',
          url: 'https://www.amazon.co.uk/Archangel-Robert-Harris/dp/0099527936/ref=tmm_pap_swatch_0?_encoding=UTF8&qid=&sr=',
          bought: true
        }, {
          product: 'Mythos by Stephen Fry',
          url: 'https://www.amazon.co.uk/gp/product/0718188721/ref=s9_acsd_zgift_hd_bw_bjH4j_c_x_w?pf_rd_m=A3P5ROKL5A1OLE&pf_rd_s=merchandised-search-5&pf_rd_r=KRBA6H22ZSR9S3M173KY&pf_rd_t=101&pf_rd_p=acf105bf-3c6d-5935-a127-bd382f92a958&pf_rd_i=10790401',
          bought: false
        }, {
          product: 'Gardener\'s Seat',
          url: 'https://www.uncommongoods.com/product/gardeners-tool-seat',
          bought: true
        }],
        createdBy: users[3],
        contributors: [users[0], users[1], users[2], users[4]]
      }, {
        wishlistName: 'Christmas Ideas',
        items: [{
          product: 'iPad',
          url: 'https://www.apple.com/uk/ipad/',
          bought: false
        }, {
          product: 'iPad case with keyboard',
          url: 'https://www.apple.com/uk/shop/product/HL6Y2B/A/logitech-slim-folio-case-with-integrated-bluetooth-keyboard-for-ipad-black?fnode=9a&fs=f%3Dipad_9_7%26fh%3D4583%252B48af',
          bought: false
        }, {
          product: 'Archangel by Robert Harris',
          url: 'https://www.amazon.co.uk/Archangel-Robert-Harris/dp/0099527936/ref=tmm_pap_swatch_0?_encoding=UTF8&qid=&sr=',
          bought: true
        }, {
          product: 'Mythos by Stephen Fry',
          url: 'https://www.amazon.co.uk/gp/product/0718188721/ref=s9_acsd_zgift_hd_bw_bjH4j_c_x_w?pf_rd_m=A3P5ROKL5A1OLE&pf_rd_s=merchandised-search-5&pf_rd_r=KRBA6H22ZSR9S3M173KY&pf_rd_t=101&pf_rd_p=acf105bf-3c6d-5935-a127-bd382f92a958&pf_rd_i=10790401',
          bought: false
        }, {
          product: 'Gardener\'s Seat',
          url: 'https://www.uncommongoods.com/product/gardeners-tool-seat',
          bought: true
        }],
        createdBy: users[7],
        contributors: [users[0], users[1], users[2], users[8]]
      }])
      .then((wishlists) => {
        console.log(`${wishlists.length} wishlists created`);
      });
  })
  .catch((err) => console.log(err))
  .finally(() => mongoose.connection.close());
