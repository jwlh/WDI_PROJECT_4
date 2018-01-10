![](https://www.coindesk.com/wp-content/themes/coindesk2/images/events/consensus-2015/sponsors-and-partners/general-assembly.png)

# WDI 30, PROJECT 4 - iWISH

For the forth and final project on our WDI course we were tasked with creating a MERN stack app using the knowledge of React we had learnt over the last two weeks.  


As members of a large families both my Wife and I have to write christmas lists that the other then has to divide up and distribute each year and also recalling our wedding list and only being able to list products from a particular shop on that, I chose to create a wishlist app enabling users to create a wishlist and share it with their friends and family.  The friends and family can then see what has and hasn't been ticked off the list and choose a present accordingly.

Link to app: [https://iwish.jwlh.co.uk/](https://iwish.jwlh.co.uk/)

<img src="https://i.imgur.com/amtjtC2.png" width="400">
<img src="https://i.imgur.com/dwJa1vg.png" width="400">



## Technologies used:

* HTML
* JWT
* Bluebird
* NodeJS
* ExpressJS
* Express-jwt
* Mongoose
* Mocha & Chai
* React
* React-Bootstrap
* Nodemailer
* AWS for fileupload
* Facebook OAuth
* SCSS


## Key Features

There are a few features that I am really pleased with on this app

### Nodemailer & Creating Users: 

I didn't know that nodemailer was going to be the answer to my problem but found it with a bit of googling.  

As I wanted users to be able to add friends to view their lists even if those friends were not on the website I wanted to send any unregistered friends an automatic email asking them to sign up to view the list, taking them through the registration process along the way.

To do this the code on the back end takes the following steps

1. Firstly it checks if the array of users found by the submitted emails is shorter than the array of submitted emails (if it is it knows that some news ones need to be added).
2. If that is the case it creates an array containing just the new emails using lodash's difference method.
3. Then it creates a 'temporary' user with those new emails and these are given the property of `locked:true` (this is set as a default in the user model and is only overwritten to be false on submition of a full registration or OAuth)
4. Then it takes all the new users and sends them a personalised email using nodemailer saying who invited them and asking them to follow a link to complete their registration (because their user is `locked` they can't do anything on the site without registering.

The code looks like this:

```
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
```
and the code for creating the email looks like this:

```
const nodemailerMailGun = nodemailer.createTransport(mg(auth));

module.exports = {
  sendMail: function(user, currentUser) {
    return new Promise((resolve, reject) => {
      nodemailerMailGun.sendMail({
        from: 'iwish.welcome@gmail.com',
        to: user.email,
        subject: `Hey you've been invited to join iWish by ${currentUser.firstName} ` ,
        text: `iWish is the gift list app and your friend, ${currentUser.firstName} ${currentUser.lastName}, has added you to their list and would like you to register so you can see their list and create your own please click here https://iwish.jwlh.co.uk/users/${user.id}/edit You will be asked for a password which by default has been set to be password, please change this once you have logged in`,
        html: `<h1> ${currentUser.firstName} ${currentUser.lastName} wants you to join iWish</h1></br><p>iWish is the gift list app and your friend has added you to their list and would like you to register so you can see their list and create your own please click <a href="https://iwish.jwlh.co.uk/users/${user.id}/edit">here</a></p> </br> <p>You will be asked for a password which by default has been set to be <strong>password</strong>, please change this once you have logged in</p>`
      }, function (err, info) {
        if (err) return reject(err);
        return resolve(info);
      });
    });
  }
};

```

This was quite a fiddly feature to get working properly in the end.  I learnt much more about the use of promises.  It was also encouraging to be able to work out how to use something like nodemailer on my own by reading documentation and so forth without being taught it in the classroom first!


### Facebook OAuth & File Upload: 

The other two features that I hadn't added in my last project that some others had done was OAuth and File Upload so i really wanted to make sure I added those in this time around.

I chose Facebook as the obvious OAuth option for this kind of app and for people that didn't want to use OAuth or wanted to change their profile picture I used AWS to provide an image upload option for this.

<img src="https://i.imgur.com/uBhw63B.png" width="400">

## Additional Features:

Features I would like to add in the future would be:

* Use the Facebook OAuth to connect with a users Facebook friends and enable them to invite them directly.
* Integrate a shopping API to find a users gifts at the best price possible 