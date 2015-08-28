import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { posts } from './reducers.js';

const createStoreWithMiddleware = applyMiddleware(thunk)(createStore);

let store = createStoreWithMiddleware(posts);

export default store;
