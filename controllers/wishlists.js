const Wishlist = require('../models/wishlist');
const User = require('../models/user');
const _ = require('lodash');

const emailer = require('../lib/emailer');

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
  let allUsers = [];

  User
    .find({ email: emails })
    .then(users => {

      if (users.length < emails.length) {

        // find all email addresses that are not in the users array
        const arrayOfExistingUserEmails = users.map(user => user.email);

        const arrayOfNewEmails = _.difference(emails, arrayOfExistingUserEmails);

        // create users with email addresses that aren't in the array
        const usersToCreate = arrayOfNewEmails.map(email => User.create({ email, firstName: 'Awaiting Registration', password: 'password' }));
        return Promise.all(usersToCreate)
          // .then(newUsers => send emails to users...)
          .then(newUsers => {

            const promises = newUsers.map((user) => emailer.sendMail(user, req.body.createdBy));
            return Promise.all(promises)
              .then(() => newUsers);
          })
          // push those users into the req.body.contributors along with the users that were found and create the wishlist
          .then(newUsers => {
            allUsers = users.concat(newUsers);
            return allUsers;
          })
          .then(allUsers => {

            req.body.contributors = allUsers;
            return Wishlist.create(req.body);
          });
      }
    })
    .then(wishlist => {
      console.log(wishlist);
      res.status(201).json(wishlist);
    })
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

      if (req.body.contributors.length > wishlist.contributors.length) {
        const emails = req.body.contributors.map(user => user.email);
        let allUsers= [];
        User
          .find({ email: emails })
          .then(users => {

            // find all email addresses that are not in the users array
            const arrayOfExistingUserEmails = users.map(user => user.email);

            const arrayOfNewEmails = _.difference(emails, arrayOfExistingUserEmails);

            // create users with email addresses that aren't in the array
            const usersToCreate = arrayOfNewEmails.map(email => User.create({ email, firstName: 'Awaiting Registration', password: 'password', locked: true }));
            return Promise.all(usersToCreate)
              // .then(newUsers => send emails to users...)
              .then(newUsers => {

                const promises = newUsers.map((user) => emailer.sendMail(user, req.body.createdBy));
                return Promise.all(promises)
                  .then(() => newUsers);
              })
              // push those users into the req.body.contributors along with the users that were found and create the wishlist
              .then(newUsers => {
                allUsers = users.concat(newUsers);
                return allUsers;
              })
              .then(allUsers => {

                req.body.contributors = allUsers;
                wishlist = Object.assign(wishlist, req.body);
                return wishlist.save();
              });
          });

      } else {
        wishlist = Object.assign(wishlist, req.body);
        return wishlist.save();

      }


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
