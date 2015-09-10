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
    default:
      return state;
  }
}

export default Reducers;
