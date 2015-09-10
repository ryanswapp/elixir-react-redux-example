import React from 'react';
import { Link } from 'react-router';
import Actions from '../redux/action_creators.js';
import store from '../redux/store.js';
import { connect } from 'react-redux';
import { Socket } from "../../../../deps/phoenix/web/static/js/phoenix"
import axios from 'axios';

let PostsList = React.createClass({
  getInitialState() {
    return {
      channel: {}
    }
  },
  componentDidMount() {
    let socket = new Socket("/socket");
socket.connect();
    let channel = socket.channel("posts:new", {})

    this.setState({
      channel: channel
    });

    channel.join().receive("ok", chan => {
        console.log("joined");
    });
    channel.on("new:post", payload => {
      console.log("There is a new post!");
      store.dispatch(Actions.addPost(payload.post));
    });
    channel.on("remove:post", payload => {
      console.log("Post has been removed");
      store.dispatch(Actions.removePost(payload.post_id));
    });
    
    store.dispatch(Actions.fetchPosts());
    console.log(store.getState());
  },
  handleSubmit(e) {
    e.preventDefault();

    let self = this;

    var title = $('.title').val().trim();
    var body = $('.body').val().trim();

    var post = {
      title: title,
      body: body
    }
    
    axios.post('/api/posts', {post: post})
      .then(function(response) {
        console.log("Successfully added post!");
        self.state.channel.push("new:post", {post: response.data.data});
        $('.title').val("");
        $('.body').val("");
      })
      .catch(function(response) {
        console.log(response);
      });

  },
  render() {
    let self = this;

    return (
      <div>
        <div className="links">
          <Link to="users">Users</Link> 
        </div>
        <form onSubmit={this.handleSubmit}>
        <div className="form-group">
          <label htmlFor="title">Title</label>
          <input type="text" className="form-control title" />
        </div>
        <div className="form-group">
          <label htmlFor="body">Body</label>
          <input type="text" className="form-control body" />
        </div>
        <input type="submit" className="btn btn-default" />                   
        </form>
        <ul className="list-group">
        { this.props.posts.map(post => { return <Post post={post} key={post.id} channel={self.state.channel} /> }) }
        </ul>
          
      </div>
    )
  }
});

let Post = React.createClass({
  handleDelete(e) {
    e.preventDefault();

    let postId = this.props.post.id;
    let self = this;

    axios.delete(`/api/posts/${postId}`, {})
      .then(function(response) {
        console.log("Successfully removed post!");
        self.props.channel.push("remove:post", {post_id: postId}); 
      })
      .catch(function(response) {
        console.log(response);
      });
  },
  render() {
    return (
      <li className="list-group-item">{this.props.post.title} <a href="#" onClick={this.handleDelete}>X</a></li>
    )
  }
});

export default connect(state => ({
  posts: state.posts 
}))(PostsList);
