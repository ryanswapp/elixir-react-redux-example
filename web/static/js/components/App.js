import React from 'react';
import Router from 'react-router';
const { RouteHandler } = Router;

class App extends React.Component {
  constructor () {
    super();

    this.state = {
      loggedIn: false
    };
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
