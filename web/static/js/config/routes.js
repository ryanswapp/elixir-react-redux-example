import React from 'react';
import PostsList from '../components/PostsList';
import { Router, Route, DefaultRoute } from 'react-router';

export default (
  <Route name="app" path="/" handler={PostsList}>

  </Route>
);
