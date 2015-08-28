import axios from 'axios';
import store from './store.js';

const Actions = {};

Actions.fetchPosts = function fetchPosts() {
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

export default Actions;
