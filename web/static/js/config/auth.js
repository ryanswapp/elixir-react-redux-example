import React from 'react';
import store from '../redux/store.js';
import Actions from '../redux/action_creators.js';

const Auth = {
  getToken() {
    return localStorage.auth_token;
  },
  loggedIn() {
    return !!localStorage.auth_token;
  },
  logout() {
    store.dispatch(Actions.logout());
  }
}

export default Auth;
