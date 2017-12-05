const Wishlist = require('../models/wishlist');

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

  req.body.createdBy=req.currentUser;

  Wishlist
    .create(req.body)
    .then(wishlist => res.status(201).json(wishlist))
    .catch(next);
}

function wishlistsShow(req, res, next) {
  Wishlist
    .findById(req.params.id)
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
