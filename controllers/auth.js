const jwt = require('jsonwebtoken');
const { secret } = require('../config/environment');
const User = require('../models/user');


function register(req, res, next){
  req.body.locked = false;
  User
    .create(req.body)
    .then(user => {
      const payload = { userId: user.id };
      const token = jwt.sign( payload, secret, { expiresIn: '1hr' });

      return res.status(201).json({
        message: `Welcome ${user.username}!`,
        token,
        user
      });
    })
    .catch(next);
}

function login(req, res, next) {
  User
    .findOne({ email: req.body.email })
    .then((user) => {
      if(!user || !user.validatePassword(req.body.password)) return res.status(401).json({ message: 'Unauthorized' });

      const payload = {userId: user.id};
      const token = jwt.sign(payload, secret, { expiresIn: '1hr' });
      return res.status(200).json({
        message: `Welcome back ${user.username}`,
        token,
        user
      });
    })
    .catch(next);
}

module.exports = {
  register,
  login
};
