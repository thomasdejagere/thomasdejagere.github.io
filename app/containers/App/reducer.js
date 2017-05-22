/*
 * AppReducer
 *
 * The reducer takes care of our data. Using actions, we can change our
 * application state.
 * To add a new action, add it to the switch statement in the reducer function
 *
 * Example:
 * case YOUR_ACTION_CONSTANT:
 *   return state.set('yourStateVariable', true);
 */

import { Map, List } from 'immutable';
import types from './constants';

// The initial state of the App
//TODO: immutable
const initialState = Map({
  selectedSerie: Map(),
  isAuthenticated: false,
  authenticationError: "",
  user: Map(),
  showOnlyBookmarked: false,
  showOnlySeen: false
});

function appReducer(state = initialState, action) {
  switch (action.type) {
    case types.SELECT_SERIE:
      return state.setIn(['selectedSerie'], Map(action.item));
    case types.BOOKMARK_SERIE:
      return state.setIn(['user', 'bookmarkedSeries'], state.get('user').get('bookmarkedSeries').push(action.id));
    case types.SEEN_SERIE:
      return state.setIn(['user', 'seenSeries'], state.get('user').get('seenSeries').push(action.id));
    case types.RECEIVE_SAVE_USER_INFO:
      return state.setIn(['user'], Map(action.payload));
    case types.REQUEST_AUTH:
      return state.setIn(['isAuthenticated'], false);
    case types.RECEIVE_AUTH:
      return state.setIn(['isAuthenticated'], true).setIn(['user'], Map(action.payload));
    case types.LOGOUT_USER:
      return state.setIn(['isAuthenticated'], false).setIn(['user'], Map());
    case types.SHOW_ONLY_SEEN:
      return state.setIn(['showOnlySeen'], true).setIn(['showOnlyBookmarked'], false);
    case types.SHOW_ONLY_BOOKMARKED:
      return state.setIn(['showOnlyBookmarked'], true).setIn(['showOnlySeen'], false);;
    case types.SHOW_ALL:
      return state.setIn(['showOnlySeen'], false).setIn(['showOnlyBookmarked'], false);

    default:
      return state;
  }
}

export default appReducer;
