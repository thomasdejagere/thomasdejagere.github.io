/*
 * App Actions
 *
 * Actions change things in your application
 * Since this boilerplate uses a uni-directional data flow, specifically redux,
 * we have these actions which are the only way your application interacts with
 * your application state. This guarantees that your state is up to date and nobody
 * messes it up weirdly somewhere.
 *
 * To add a new Action:
 * 1) Import your constant
 * 2) Add a function like this:
 *    export function yourAction(var) {
 *        return { type: YOUR_ACTION_CONSTANT, var: var }
 *    }
 */
import types from './constants';
require('es6-promise').polyfill();
require('isomorphic-fetch');
import {REST_API} from '../../globalConstants';

export function selectSerie(item) {
  return {
    type: types.SELECT_SERIE,
    item
  }
}

export function saveUserInformation(user) {
  return (dispatch) => {
    dispatch({type: types.REQUEST_SAVE_USER_INFO});
    fetch(REST_API + '/users/' + user.id, {
      method: 'PUT',
      headers: {
        "Content-Type": "application/json"
      },
      credentials: "same-origin",
      body: JSON.stringify(user)
    })
      .then((response) => {
        if (response.status >= 400) {
          dispatch({type: types.FAILURE_SAVE_USER_INFO});
        } else {
          return response.json();
        }
      })
      .then((res) => {
        dispatch({type: types.RECEIVE_SAVE_USER_INFO, payload: res})
      })
  }
}

export function bookmarkSerie(id) {
  return (dispatch, getState) => {
    return new Promise((resolve, reject) => {
      let userInformation = getState().get('global').get('user').toJS();
      userInformation.bookmarkedSeries = addOrDeleteSerie(userInformation.bookmarkedSeries, id);
      resolve(userInformation);
      dispatch(saveUserInformation(userInformation));
    });
  }
}

export function seenSerie(id) {
  return (dispatch, getState) => {
    return new Promise((resolve, reject) => {
      let userInformation = getState().get('global').get('user').toJS();
      userInformation.seenSeries = addOrDeleteSerie(userInformation.seenSeries, id);
      resolve(userInformation);
      dispatch(saveUserInformation(userInformation));
    });
  }
}

function addOrDeleteSerie(array = [], id) {
  let idExistsInArray = false;
  let result = array.reduce(
    (obj, val) => {
      val !== id ?
        obj.push(val)
      :
        idExistsInArray = true;
      return obj;
    }
  , []);
  idExistsInArray ? null : result.push(id);
  return result;
}

export function authenticateUser(username, password) {
  return (dispatch) => {
    return new Promise ((resolve, reject) => {
      dispatch({
        type: types.REQUEST_AUTH
      })
      fetch(REST_API + '/users?username_like=' + username + '&password_like=' + password + '')
        .then((response) => {
          if(response.status >= 400) {
            reject("Something went wrong");
          } else {
            return response.json();
          }
        })
        .then((res) => {
          const user = res[0];
          if (user && res.length === 1 && user.username === username && user.password === password) {
            resolve();
            dispatch({
                type: types.RECEIVE_AUTH,
                payload: user
            });
          } else {
            reject("Authentication wasn't correct!");
          }
        })
    });
  }
}

export function logoutUser() {
  return {
    type: types.LOGOUT_USER
  }
}

export function registerUser(user) {
  user.username = user.email;
  return (dispatch) => {
      fetch(REST_API + '/users', {
        method: 'POST',
        headers: {
          "Content-Type": "application/json"
        },
        credentials: "same-origin",
        body: JSON.stringify(user)
      })
  }
}

export function showOnlySeen() {
  return {
    type: types.SHOW_ONLY_SEEN
  }
}

export function showOnlyBookmarked() {
  return {
    type: types.SHOW_ONLY_BOOKMARKED
  }
}

export function showAll() {
  return {
    type: types.SHOW_ALL
  }
}
