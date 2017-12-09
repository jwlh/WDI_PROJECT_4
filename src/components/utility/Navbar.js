import React from 'react';
import Auth from '../../lib/Auth';
import { Link, withRouter } from 'react-router-dom';
import { Navbar, NavItem, Nav, Image} from 'react-bootstrap';
import {LinkContainer} from 'react-router-bootstrap';

const myNavbar = ({ history }) => {

  const logout = (e) => {
    e.preventDefault();
    Auth.logout();
    history.push('/login');
  };



  return(

    <Navbar collapseOnSelect>
      <Navbar.Header>
        <Image src="../../assets/images/iWish_icon.svg" style={{height: '48px'}}/>
        <Link to="/">
          <Navbar.Brand>
            iWish
          </Navbar.Brand>
        </Link>
        <Navbar.Toggle />
      </Navbar.Header>
      <Navbar.Collapse>
        <Nav pullRight>
          {Auth.isAuthenticated() && <LinkContainer to="/wishlists/new" className="standard-button"><NavItem>Create a Wishlist</NavItem></LinkContainer>}
          {Auth.isAuthenticated() && <LinkContainer exact to="/users" className="standard-button"><NavItem>View Users</NavItem></LinkContainer>}
          {Auth.isAuthenticated() && <LinkContainer exact to={`/users/${Auth.getPayload().userId}`} className="standard-button"><NavItem>View Your Profile</NavItem></LinkContainer>}
          {!Auth.isAuthenticated() && <LinkContainer to="/login" className="standard-button"><NavItem>Log In</NavItem></LinkContainer>}
          {!Auth.isAuthenticated() && <LinkContainer to="/register" className="standard-button"><NavItem>Register</NavItem></LinkContainer>}
          {Auth.isAuthenticated() && <NavItem href="#" onClick={logout} className="standard-button">Log Out</NavItem>}
        </Nav>
      </Navbar.Collapse>
    </Navbar>

  );
};

export default withRouter(myNavbar);
