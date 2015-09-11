import React from 'react';
import App from '../components/App';
import PostsList from '../components/PostsList';
import UsersListContainer from '../components/users/UsersListContainer';
import UsersNew from '../components/users/UsersNew';
import UserLogin from '../components/users/UserLogin';
import { Navigation, Router, Route, DefaultRoute } from 'react-router';
import Auth from './auth.js';

export default (
  <Route name="app" handler={App}>
    <Route name="posts" path="/" handler={PostsList}/>
    <Route name="users" path="/users" handler={UsersListContainer}/>
    <Route name="new-user" path="/users/new" handler={UsersNew}/>
    <Route name="login" path="/login" handler={UserLogin}/>
  </Route>
);
