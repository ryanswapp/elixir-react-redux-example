import React from 'react';
import { Link } from 'react-router';

class UsersList extends React.Component {
  constructor () {
    super(); 
    this.state = {
      loggedIn: false,
      users: [
        {id: 1, name: 'Ryan', email: 'ryancswapp@gmail.com'},
        {id: 2, name: 'Maddie', email: 'maddielee11@hotmail.com'}
      ]
    }
  }
  render () {
    return (
      <div>
      <div className="links">
        <Link to="new-user">New User</Link> 
        <Link to="posts">Posts</Link>
      </div>
        <h1>Users List</h1>
        <div className="users-list">
          <ul className="list-group">
            { this.state.users.map( user => {
                return <li key={user.id} className="list-group-item">{user.name} - {user.email}</li>
              })
            }
          </ul>
        </div>
      </div>
    )
  }
}

export default UsersList;
