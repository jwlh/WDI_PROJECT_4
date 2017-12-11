const Wishlist = require('../models/wishlist');
const User = require('../models/user');

var nodemailer = require('nodemailer');
var mg = require('nodemailer-mailgun-transport');

const Promise = require('bluebird');

function wishlistsIndex(req, res, next) {
  Wishlist
    .find()
    .populate('createdBy')
    .populate('contributors')
    .exec()
    .then(wishlists => res.json(wishlists))
    .catch(next);
}

function wishlistsCreate(req, res, next) {

  req.body.createdBy = req.currentUser;

  const emails = req.body.contributors.map(user => user.email);

  User
    .find({ email: emails })
    .then(users => {
      console.log(users);
      if (users.length < emails.length) {
        // find all email addresses that are not in the users array
        const arrayOfExistingUserEmails = users.map(user => user.email);
        const arrayOfNewEmails = emails.filter(email => arrayOfExistingUserEmails.includes(email));
        console.log('array of new emails',arrayOfNewEmails);
        // create users with email addresses that aren't in the array
        const usersToCreate = arrayOfNewEmails.map(email => User.create({ email, username: 'Not yet fully registered' }));
        return Promise.all(usersToCreate)
          // .then(newUsers => send emails to users...)
          .then(newUsers => {
            console.log('this is newUser', newUsers);
            // This is your API key that you retrieve from www.mailgun.com/cp (free up to 10K monthly emails)
            // var auth = {
            //   auth: {
            //     api_key: 'key-03b4ca776fde211970860078cec25cac',
            //     domain: 'sandboxeb4c8551d5aa4558a9077cb099be87b1.mailgun.org'
            //   }
            // };
            //
            // var nodemailerMailgun = nodemailer.createTransport(mg(auth));
            //
            // function sendMail() {
            //   nodemailerMailgun.sendMail({
            //     from: 'iwish.welcome@gmail.com',
            //     to: 'jonnyhall1983@gmail.com', // An array if you have multiple recipients.
            //     subject: 'Hey you, awesome!',
            //     text: 'Mailgun rocks, pow pow!'
            //   }, function (err, info) {
            //     if (err) {
            //       console.log('Error: ' + err);
            //     } else {
            //       console.log('Response: ' + info);
            //     }
            //   });
            // }
            // newUser.forEach(sendMail);

          })
          // push those users into the req.body.contributors (using concat)
          .then(newUsers => {
            console.log('this is newUsers', newUsers);
            users = users.concat(newUsers);
            console.log('this is users', users);
          });
      }
      return users;
    })
    .then(users => {
      req.body.contributors = users;

      return Wishlist.create(req.body);
    })
    .then(wishlist => res.status(201).json(wishlist))
    .catch(next);
}

function wishlistsShow(req, res, next) {
  Wishlist
    .findById(req.params.id)
    .populate('createdBy')
    .populate('contributors')
    .exec()
    .then((wishlist) => {
      if(!wishlist) return res.notFound();
      res.json(wishlist);
    })
    .catch((err) => {
      console.log('ERROR IN CATCH ===========>', err);
      next(err);
    });
}

function wishlistsUpdate(req, res, next) {

  Wishlist
    .findById(req.params.id)
    .populate('createdBy')
    .populate('contributors')
    .exec()
    .then((wishlist) => {
      if(!wishlist) return res.notFound();
      wishlist = Object.assign(wishlist, req.body);
      return wishlist.save();
    })
    .then(wishlist => res.json(wishlist))
    .catch(next);
}

function wishlistsDelete(req, res, next) {
  Wishlist
    .findById(req.params.id)
    .exec()
    .then((wishlist) => {
      if(!wishlist) return res.notFound();
      return wishlist.remove();
    })
    .then(() => res.status(204).end())
    .catch(next);
}

module.exports = {
  index: wishlistsIndex,
  create: wishlistsCreate,
  show: wishlistsShow,
  update: wishlistsUpdate,
  delete: wishlistsDelete
};
