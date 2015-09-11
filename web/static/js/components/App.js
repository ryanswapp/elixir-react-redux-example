import React from 'react';
import Router from 'react-router';
import store from '../redux/store.js';
import Actions from '../redux/action_creators.js';
import { connect } from 'react-redux';
const { RouteHandler } = Router;

class App extends React.Component {
  constructor () {
    super();

  }

  componentDidMount () {
    store.dispatch(Actions.getCurrentUser());
  }

  render () {
    return (
      <div>
        <RouteHandler /> 
      </div>
    )
  }
}

export default App;

