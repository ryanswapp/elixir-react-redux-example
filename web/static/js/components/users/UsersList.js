import React from 'react';
import { Link } from 'react-router';
import Actions from '../../redux/action_creators.js';
import store from '../../redux/store.js';
import { connect } from 'react-redux';
import { Socket } from "../../../../../deps/phoenix/web/static/js/phoenix"


class UsersList extends React.Component {
  constructor () {
    super(); 
    this.state = {
      loggedIn: false,
      channel: {}
    }
  }
  componentDidMount () {
    let socket = new Socket("/socket");
    socket.connect();

    let channel = socket.channel("users:new", {});

    this.setState({
      channel: channel
    });

    channel.join()
      .receive("ok", chan => {
        console.log("joined");
      })
      .receive("error", chan => {
        console.log("Error joining");
        console.log(chan);
      });

    channel.on("new:user", payload => {
      console.log("There is a new user!");
      console.log(payload.user);
      store.dispatch(Actions.addUser(payload.user));
    });

    store.dispatch(Actions.fetchUsers());
    console.log(store.getState());
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
            { this.props.users.map( user => {
                return <li key={user.id} className="list-group-item">{user.email}</li>
              })
            }
          </ul>
        </div>
      </div>
    )
  }
}

export default connect(state => ({
  users: state.users 
}))(UsersList);
