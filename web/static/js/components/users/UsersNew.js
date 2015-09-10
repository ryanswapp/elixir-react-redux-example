import React from 'react';
import { Link } from 'react-router';

class UsersNew extends React.Component {
  constructor () {
    super();
    this.state = {
      loggedIn: false
    }
  }
  render () {
    return (
      <div>
        <div class="links">
          <Link to="posts">Posts</Link> 
          <Link to="users">Users</Link>
        </div>
        <h1>New User</h1>
      </div>
    )
  }
}

export default UsersNew;
