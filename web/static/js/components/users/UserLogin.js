import React from 'react';
import { Link } from 'react-router';
import axios from 'axios';
import Nav from '../Nav';
import store from '../../redux/store.js';
import Actions from '../../redux/action_creators.js';

class UserLogin extends React.Component {
  constructor () {
    super();
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(e) {
    e.preventDefault();

    let self = this;

    let email = $('.email').val().trim();
    let password = $('.password').val().trim();

    let session = {
      email: email,
      password: password
    }


    axios.post('/api/login', {session: session})
      .then(function(response) {
        if (response.status === 201) {
          console.log("Successfully logged in!");
          localStorage.auth_token = response.data.jwt;
          store.dispatch(Actions.getCurrentUser());
          $('.title').val("");
          $('.body').val("");
          self.context.router.transitionTo('/users');
        } else {
          console.log("Failed login...");
        }
      })
      .catch(function(response) {
        console.log("Failed login...");
        console.log(response);
      });
  }

  render () {
    return (
      <div>
        <Nav />
        <h1>Login</h1>
        <form onSubmit={this.handleSubmit}>
        <div className="form-group">
          <label htmlFor="email">Email</label>
          <input type="text" className="form-control email" />
        </div>
        <div className="form-group">
          <label htmlFor="password">Password</label>
          <input type="password" className="form-control password" />
        </div>
        <input type="submit" className="btn btn-default" />                   
        </form>
      </div>
    )
  }

}

UserLogin.contextTypes = {
  router: React.PropTypes.func.isRequired
};

export default UserLogin;
