import React from 'react';
import { Link } from 'react-router';
import Auth from '../config/auth.js';

class Nav extends React.Component {
  constructor () {
    super();
    this.handleLogout = this.handleLogout.bind(this);
  }
  handleLogout(e) {
    e.preventDefault();

    Auth.logout();
    this.context.router.transitionTo('/');
  }
  render () {
    return (
      <div>
      { this.props.currentUser ? (
          <div className="links">
            <Link to="users">Users</Link> 
            <Link to="new-user">New User</Link>
            <Link to="posts">Posts</Link>
            <a href="#" onClick={this.handleLogout}>Logout</a>
          </div>
        ) : (
          <div className="links">
            <Link to="posts">Posts</Link>
            <Link to="login">Login</Link> 
          </div>
        )
      }
      </div>
    )
  }
}

Nav.contextTypes = {
  router: React.PropTypes.func.isRequired
};

export default Nav;
