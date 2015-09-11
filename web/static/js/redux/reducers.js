import clone from 'lodash/lang/clone';
import filter from 'lodash/collection/filter';

const Reducers = {};

Reducers.posts = function posts(state=[], action) {
  switch (action.type) {
    case 'FETCH_POSTS':
      var newState = action.posts;
      return newState;
    case 'ADD_POST':
      console.log("Added Post!");

      var newState = clone(state, true);

      newState.push(action.post);
      console.log(newState);

      return newState;

    case 'REMOVE_POST':
      var postId = action.post_id;
      
      var newState = filter(state, function(post) {
        return post.id !== postId;
      });
      
      return newState;

    default:
      return state;
  }
}

Reducers.users = function users(state=[], action) {
  switch (action.type) {
    case 'FETCH_USERS':
      var newState = action.users;
      return newState;
    case 'FAILED_FETCH_USERS':
      return state;
    case 'ADD_USER':
      console.log("Added User!");

      var newState = clone(state, true);

      newState.push(action.user);

      return newState;
    case 'LOG_OUT':

      var newState = [];
      
      return newState;
    default:
      return state;
  }
}

Reducers.currentUser = function currentUser(state=false, action) {
  switch (action.type) {
    case 'LOG_IN':
      var newState = action.user;

      return newState;
    case 'LOG_OUT':
      var newState = false;
    
      return newState;
    case 'CURRENT_USER':
      var newState = action.user;

      return newState;
    case 'NOT_LOGGED_IN':
      return state;
    default:
      return state;
  }
}

export default Reducers;
