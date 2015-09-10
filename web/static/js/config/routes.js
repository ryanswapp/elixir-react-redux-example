import React from 'react';
import App from '../components/App';
import PostsList from '../components/PostsList';
import UsersList from '../components/users/UsersList';
import UsersNew from '../components/users/UsersNew';
import { Router, Route, DefaultRoute } from 'react-router';

export default (
  <Route name="app" handler={App}>
    <Route name="posts" path="/" handler={PostsList}/>
    <Route name="users" path="/users" handler={UsersList}/>
    <Route name="new-user" path="/users/new" handler={UsersNew}/>
  </Route>
);
