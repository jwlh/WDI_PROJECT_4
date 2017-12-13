import React from 'react';
import Auth from '../../lib/Auth';
import { withRouter } from 'react-router-dom';
import { Navbar, NavItem, Nav} from 'react-bootstrap';
import {LinkContainer} from 'react-router-bootstrap';

import css from '../../scss/components/navbar.scss';



const myNavbar = ({ history }) => {

  const logout = (e) => {
    e.preventDefault();
    Auth.logout();
    history.push('/login');
  };



  return(

    <Navbar collapseOnSelect>
      <Navbar.Header>
        <Navbar.Toggle />
      </Navbar.Header>
      <Navbar.Collapse>
        <Nav pullLeft>

          <NavItem onClick={history.goBack}>
            <i className="fa fa-arrow-left" aria-hidden="true"></i> Back
          </NavItem>

          <LinkContainer exact to='/'>
            <NavItem >
              <i className="fa fa-home" aria-hidden="true"></i> Home
            </NavItem>
          </LinkContainer>
        </Nav>
        <Nav pullRight>
          {Auth.isAuthenticated() && <LinkContainer to="/wishlists/new" className="standard-button"><NavItem><i className="fa fa-plus" aria-hidden="true"></i> Create a Wishlist</NavItem></LinkContainer>}
          {Auth.isAuthenticated() && <LinkContainer exact to={`/users/${Auth.getPayload().userId}`} className="standard-button"><NavItem><i className="fa fa-user" aria-hidden="true"></i> View Your Profile</NavItem></LinkContainer>}
          {!Auth.isAuthenticated() && <LinkContainer to="/login" className="standard-button"><NavItem><i className="fa fa-sign-in" aria-hidden="true"></i> Log In</NavItem></LinkContainer>}
          {!Auth.isAuthenticated() && <LinkContainer to="/register" className="standard-button"><NavItem><i className="fa fa-user-plus" aria-hidden="true"></i> Register</NavItem></LinkContainer>}
          {Auth.isAuthenticated() && <NavItem href="#" onClick={logout} className="standard-button"><i className="fa fa-sign-out" aria-hidden="true"></i> Log Out</NavItem>}
        </Nav>
      </Navbar.Collapse>
    </Navbar>

  );
};

export default withRouter(myNavbar);
