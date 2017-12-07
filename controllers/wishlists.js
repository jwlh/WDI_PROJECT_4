const Wishlist = require('../models/wishlist');
const User = require('../models/user');
const nodemailer = require('nodemailer');
const Promise = require('bluebird');

// let transporter;
// // Generate test SMTP service account from ethereal.email
// // Only needed if you don't have a real mail account for testing
// nodemailer.createTestAccount((err, account) => {
//
//   // create reusable transporter object using the default SMTP transport
//   transporter = nodemailer.createTransport({
//     host: 'smtp.ethereal.email',
//     port: 587,
//     secure: false, // true for 465, false for other ports
//     auth: {
//       user: account.user, // generated ethereal user
//       pass: account.pass  // generated ethereal password
//     }
//   });
//
//
// });

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

      if (users.length < emails.length) {
        // find all email addresses that are not in the users array
        const arrayOfExistingUserEmails = users.map(user => user.email);
        const arrayOfNewEmails = emails.filter(email => arrayOfExistingUserEmails.includes(email));

        // create users with email addresses that aren't in the array
        const usersToCreate = arrayOfNewEmails.map(email => User.create({ email, username: email }));
        return Promise.all(usersToCreate)
          // .then(newUsers => send emails to users...)

          // push those users into the req.body.contributors (using concat)
          .then(newUsers => users = users.concat(newUsers));

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
