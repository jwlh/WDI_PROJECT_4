const router = require('express').Router();
const auth  = require('../controllers/auth');
const oauth  = require('../controllers/oauth');
const wishlists  = require('../controllers/wishlists');
const users = require('../controllers/users');


router.route('/wishlists')
  .get(wishlists.index)
  .post(wishlists.create);

router.route('/wishlists/:id')
  .get(wishlists.show)
  .put(wishlists.update)
  .delete(wishlists.delete);

router.route('/users').get(users.index);

router
  .route('/users/:id')
  .get(users.show)
  .put(users.edit)
  .delete(users.delete);

router.route('/register')
  .post(auth.register);

router.route('/login')
  .post(auth.login);

router.route('/oauth/facebook')
  .post(oauth.facebook);

router.all('/*', (req, res) => res.notFound());

module.exports = router;
