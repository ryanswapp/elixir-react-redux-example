import React from 'react';
import { Link } from 'react-router';
import { Socket } from "../../../../../deps/phoenix/web/static/js/phoenix"
import axios from 'axios';


class UsersNew extends React.Component {
  constructor () {
    super();
    this.handleSubmit = this.handleSubmit.bind(this);
    this.state = {
      loggedIn: false,
      channel: {}
    }
  }
  componentDidMount() {
    let socket = new Socket("/socket");
    socket.connect();

    let channel = socket.channel("users:new", {})

    channel.join().receive("ok", chan => {
      console.log("joined");
    });

    this.setState({
      channel: channel
    });
  }
  handleSubmit(e) {
    e.preventDefault();

    let self = this;

    let email = $('.email').val().trim();
    let password = $('.password').val().trim();

    let user = {
      email: email,
      password: password
    }

    axios.post('/api/register', {user: user})
      .then(function(response) {
        console.log("Successfully added user!");
        self.state.channel.push("new:user", {user: response.data.data});
        console.log(response);
        $('.title').val("");
        $('.body').val("");
      })
      .catch(function(response) {
        console.log(response);
      });
    
  }
  render () {
    return (
      <div>
        <div className="links">
          <Link to="posts">Posts</Link> 
          <Link to="users">Users</Link>
        </div>
        <h1>New User</h1>
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

export default UsersNew;
