const router = require('express').Router();
const auth  = require('../controllers/auth');
const oauth  = require('../controllers/oauth');
const wishlists  = require('../controllers/wishlists');


router.route('/wishlists')
  .get(wishlists.index);

router.route('/register')
  .post(auth.register);

router.route('/login')
  .post(auth.login);

router.route('/oauth/facebook')
  .post(oauth.facebook);

router.all('/*', (req, res) => res.notFound());

module.exports = router;
