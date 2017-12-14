import React from 'react';

import { Button, Row, Col} from 'react-bootstrap';
import {Link } from 'react-router-dom';


import Auth from '../../lib/Auth';


import css from '../../scss/components/home.scss';

const Home = () => {

  return(
    <div>
      <Row>
        <Col xs={12}>
          <h2 className={css.textColor}>iWish is a website that allows you to create a wishlist for Christmas, your birthday, your wedding and any other reason you can think up for people to buy you gifts! </h2>
          <h3 className={css.textColor}>Unlike most wishlists, you can add gifts from any retailer you like and connect your friends to your list (all we need is their email and we will do the rest).</h3>
          <h3 className={css.textColor}>They can then sign up and mark on your list what they want to buy for you, you will not be able to see what is marked but everyone else will! </h3>
        </Col>
      </Row>
      <Row>
        <Col xs={12}>
          <div>
            {!Auth.isAuthenticated() && <div><Link to="/login"><Button bsStyle="success" className={css.button}><i className="fa fa-sign-in" aria-hidden="true"></i> Log In</Button></Link> <strong className={css.textColor}>OR</strong> <Link to="/register"><Button bsStyle="info" className={css.button}> <i className="fa fa-user-plus" aria-hidden="true"> </i> Register</Button></Link></div>}

            {Auth.isAuthenticated() && <Link to={`/users/${Auth.getPayload().userId}`} className="standard-button"><Button bsStyle="info" className={css.button}><i className="fa fa-user" aria-hidden="true"></i> View Your Profile</Button></Link>}
          </div>
        </Col>
      </Row>
    </div>

  );
};

export default Home;
