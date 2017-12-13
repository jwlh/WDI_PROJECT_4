const nodemailer = require('nodemailer');
const mg = require('nodemailer-mailgun-transport');
const Promise = require('bluebird');

const auth = {
  auth: {
    api_key: process.env.MAILGUN_API_KEY,
    domain: process.env.MAILGUN_DOMAIN
  }
};

const nodemailerMailGun = nodemailer.createTransport(mg(auth));

module.exports = {
  sendMail: function(user) {
    return new Promise((resolve, reject) => {
      nodemailerMailGun.sendMail({
        from: 'iwish.welcome@gmail.com',
        to: user.email,
        subject: 'Hey you\'ve been invited to join iWish' ,
        text: `iWish is the gift list app your friend has added you to their list and would like you to register so you can see their list and create your own please click here https://iwish.jwlh.co.uk/users/${user.id}/edit You will be asked for a password which by default has been set to be password, please change this once you have logged in`,
        html: `<h1> Someone wants you to join iWish</h1></br><p>iWish is a gift list app and your friend has added you to their list and would like you to register so you can see there list and create your own please click <a href="https://iwish.jwlh.co.uk/users/${user.id}/edit">here</a></p> </br> <p>You will be asked for a password which by default has been set to be <strong>password</strong>, please change this once you have logged in</p>`



      }, function (err, info) {
        if (err) return reject(err);
        return resolve(info);
      });
    });
  }
};
