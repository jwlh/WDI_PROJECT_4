import React from 'react';
import { Switch, Route } from 'react-router-dom';
import ProtectedRoute from './ProtectedRoute';


import Login from '../auth/Login';
import Register from '../auth/Register';
import WishlistsIndex from '../wishlists/WishlistsIndex';
import WishlistsShow from '../wishlists/WishlistsShow';
import WishlistsNew from '../wishlists/WishlistsNew';
import WishlistsEdit from '../wishlists/WishlistsEdit';
import UsersIndex from '../users/UsersIndex';
import UsersShow from '../users/UsersShow';
import UsersEdit from '../users/UsersEdit';


const Routes = () => {
  return (
    <Switch>
      <Route exact path="/" component={WishlistsIndex} />
      <ProtectedRoute exact path="/wishlists/new" component={WishlistsNew} />
      <ProtectedRoute exact path="/wishlists/:id/edit" component={WishlistsEdit} />
      <ProtectedRoute exact path="/wishlists/:id" component={WishlistsShow} />
      <Route exact path="/users" component={UsersIndex} />
      <ProtectedRoute exact path="/users/:id/edit" component={UsersEdit} />
      <ProtectedRoute exact path="/users/:id" component={UsersShow} />
      <Route exact path="/login" component={Login} />
      <Route exact path="/register" component={Register} />
    </Switch>
  );
};

export default Routes;
