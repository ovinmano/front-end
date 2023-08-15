import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk'; // optional, for async actions
import rootReducer from './reducers'; // create this file later

const store = createStore(rootReducer, applyMiddleware(thunk));

export default store;
