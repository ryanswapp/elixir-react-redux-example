// Requiring scss in javascript? Ya... I know it's weird
require("../css/app.scss");

import React from 'react';
import Router from 'react-router';
import { Provider } from 'react-redux';
import store from './redux/store.js';
import routes from './config/routes.js';
import Actions from "./redux/action_creators.js";


window.onload = () => {
  Router.run(routes, Router.HistoryLocation, (Root, state) => {
    React.render(
      <Provider store={store}>
       {() => <Root {...state}/>}
      </Provider>, 
      document.getElementById('app')
    );
  });
}
