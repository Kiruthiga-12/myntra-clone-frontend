import { createStore } from 'redux';
import reducer from './Reducers';
const redux = require('redux');
const store = redux.createStore(reducer);

export default store;