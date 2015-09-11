import { createStore, applyMiddleware, combineReducers } from 'redux';
import thunk from 'redux-thunk';
import { posts, users, currentUser } from './reducers.js';

const createStoreWithMiddleware = applyMiddleware(thunk)(createStore);

const combinedReducers = combineReducers({
  posts, 
  users,
  currentUser
});

let store = createStoreWithMiddleware(combinedReducers);

export default store;
