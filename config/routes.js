const router = require('express').Router();
const auth  = require('../controllers/auth');
const oauth  = require('../controllers/oauth');
const wishlists  = require('../controllers/wishlists');
const users = require('../controllers/users');
const secureRoute = require('../lib/secureRoute');


router.route('/wishlists')
  .get(wishlists.index)
  .post(secureRoute, wishlists.create);

router.route('/wishlists/:id')
  .get(wishlists.show)
  .put(secureRoute, wishlists.update)
  .delete(secureRoute, wishlists.delete);

router.route('/users')
  .get(users.index);

router
  .route('/users/:id')
  .get(users.show)
  .put(secureRoute, users.edit)
  .delete(secureRoute, users.delete);

router.route('/register')
  .post(auth.register);

router.route('/login')
  .post(auth.login);

router.route('/oauth/facebook')
  .post(oauth.facebook);

router.all('/*', (req, res) => res.notFound());

module.exports = router;
