import React from 'react';
import { Switch, Route } from 'react-router-dom';


import Login from '../auth/Login';
import Register from '../auth/Register';
import WishlistsIndex from '../wishlists/WishlistsIndex';
import WishlistsShow from '../wishlists/WishlistsShow';
import WishlistsNew from '../wishlists/WishlistsNew';


const Routes = () => {
  return (
    <Switch>
      <Route exact path="/" component={WishlistsIndex} />
      <Route exact path="/wishlists/new" component={WishlistsNew} />
      <Route exact path="/wishlists/:id" component={WishlistsShow} />
      <Route exact path="/login" component={Login} />
      <Route exact path="/register" component={Register} />

    </Switch>
  );
};

export default Routes;
