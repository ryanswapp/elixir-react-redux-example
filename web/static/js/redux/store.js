import { createStore, applyMiddleware, combineReducers } from 'redux';
import thunk from 'redux-thunk';
import { posts, users } from './reducers.js';

const createStoreWithMiddleware = applyMiddleware(thunk)(createStore);

const combinedReducers = combineReducers({
  posts, 
  users
});

let store = createStoreWithMiddleware(combinedReducers);

export default store;
