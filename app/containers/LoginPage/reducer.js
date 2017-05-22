import { Map, List } from 'immutable';
import types from './constants';

// The initial state of the App
//TODO: immutable
const initialState = Map();

function loginReducer(state = initialState, action) {
  switch (action.type) {
    default:
      return state;
  }
}

export default loginReducer;
