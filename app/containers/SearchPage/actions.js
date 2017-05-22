import {
  INIT_SEARCHPAGE
} from './constants'
import types from './constants';
import {bookmarkSerie, seenSerie} from '../app/actions';
require('es6-promise').polyfill();
require('isomorphic-fetch');
import {REST_API} from '../../globalConstants';
export function isInit() {
  return {
    type: types.INIT
  }
}

export function fetchSeries() {
  return (dispatch, getState) => {
    if(!getState().get('search').get('series').get('isFetched')) {
      dispatch({
        type: types.REQUEST_SERIES
      });
      fetch(REST_API + '/series')
          .then((response) => {
            if(response.status >= 400) {
              console.log("ERROR");
            } else {
              return response.json();
            }
          })
          .then((series) => {
            dispatch(
              {
                type: types.RECEIVE_SERIES,
                payload: series,
                userInformation: getState().get('global').get('user'),
                onlyBookmarked: getState().get('global').get('showOnlyBookmarked'),
                onlySeen: getState().get('global').get('showOnlySeen')
              }
            )
          })

      } else {
        dispatch(updateUserInfoOnList(getState().get('global').get('user').toJS()));
      }
    }
}

export function bookmarkSerieLocal(id) {
  return (dispatch, getState) => {
    dispatch(bookmarkSerie(id))
      .then((userInformation) => {
        dispatch(updateUserInfoOnList(userInformation));
      });
  }
}

export function seenSerieLocal(id) {
  return (dispatch) => {
    dispatch(seenSerie(id))
     .then((userInformation) => {
       dispatch(updateUserInfoOnList(userInformation));
     });
  }
}

function updateUserInfoOnList(userInfo) {
  return (dispatch, getState) => {
    dispatch({
      type: types.UPDATE_USER_INFO_ON_LIST,
      userInformation: userInfo,
      onlyBookmarked: getState().get('global').get('showOnlyBookmarked'),
      onlySeen: getState().get('global').get('showOnlySeen')
    })
  }
}

export function querySeries(searchValue) {
  return {
    type: types.QUERY_SERIES,
    searchValue
  }
}
