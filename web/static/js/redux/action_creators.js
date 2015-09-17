import axios from 'axios';
import store from './store.js';

const Actions = {};

// POSTS

Actions.fetchPosts = function fetchPosts() {
  // This is special syntax for async actions
  return dispatch => {
    axios.get('/api/posts')
      .then(function (response) {
        dispatch({
          type: 'FETCH_POSTS',
          posts: response.data.data
        })
      })
      .catch(function(response) {
        console.log(response);
      });
  }
};

Actions.addPost = function addPost(post) {
  return {
    type: 'ADD_POST',
    post: post
  }
}

Actions.removePost = function removePost(postId) {
  return {
    type: 'REMOVE_POST',
    post_id: postId
  }
}

// USERS

Actions.fetchUsers = function fetchPosts() {
  // More special async syntax
  return dispatch => {
    axios.get('/api/users', {
      headers: {'Authorization': localStorage.auth_token}
    })
      .then(function (response) {
        dispatch({
          type: 'FETCH_USERS',
          users: response.data.data
        })
      })
      .catch(function(response) {
        console.log(response);
        dispatch({
          type: 'FAILED_FETCH_USERS',
          error: response
        })
      });
  }
};

Actions.addUser = function addUser(user) {
  return {
    type: 'ADD_USER',
    user: user
  }
};

Actions.logout = function logout() {
  delete localStorage.auth_token;
  
  return {
    type: 'LOG_OUT'
  }
};

Actions.getCurrentUser = function getCurrentUser() {
  // Even MORE special asyn syntax
  return dispatch => {
    axios.get('/api/current_user', {
      headers: {'Authorization': localStorage.auth_token},
      params: {
        jwt: localStorage.auth_token
      }
    })
      .then(function (response) {
        if (response.status === 200) {
          dispatch({
            type: 'CURRENT_USER',
            user: response.data.data
          })
        } else {
          dispatch({
            type: 'NOT_LOGGED_IN'
          })
        }
      })
      .catch(function(response) {
        dispatch({
            type: 'NOT_LOGGED_IN'
          })
      });

  }
}


export default Actions;
