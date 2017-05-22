/*
 * HomeReducer
 *
 * The reducer takes care of our data. Using actions, we can change our
 * application state.
 * To add a new action, add it to the switch statement in the reducer function
 *
 * Example:
 * case YOUR_ACTION_CONSTANT:
 *   return state.set('yourStateVariable', true);
 */
import { fromJS, Map, List } from 'immutable';
import types from './constants';

import {
  INIT_SEARCHPAGE
} from './constants';

//TODO: immutable!
// The initial state of the App
const initialState = Map({
  isInit: false,
  series: Map({
    isFetching: false,
    isFetched: false,
    items: List(),
    queriedSeries: List()
  })
});

function searchReducer(state = initialState, action) {
  switch (action.type) {
    case types.INIT:
      return state.set("isInit", true);

    case types.REQUEST_SERIES:
      return state.setIn(['series', 'isFetching'], true);

    case types.RECEIVE_SERIES:
      let result = provideListWithUserInformation(action.userInformation.toJS(), action.payload, action.onlySeen, action.onlyBookmarked);
      return state.setIn(['series', 'isFetching'], false).setIn(['series', 'items'], action.payload).setIn(['series', 'queriedSeries'], result).setIn(['series', 'isFetched'], true);

    case types.QUERY_SERIES:
      return state.setIn(['series', 'queriedSeries'], state.get('series').get('items').filter((item) => {
        return item.title.includes(action.searchValue);
      }));

    case types.UPDATE_USER_INFO_ON_LIST:
      let queriedSeries = provideListWithUserInformation(action.userInformation, state.get('series').get('items'), action.onlySeen, action.onlyBookmarked);
      return state.setIn(['series', 'queriedSeries'], queriedSeries);
    default:
      return state;
  }
}

function provideListWithUserInformation(userInfo, series, onlySeen, onlyBookmarked) {
  console.log("provideListWithUserInformation");
  console.log("series", series);
  console.log("userINfo", userInfo);
  console.log("onlySeen", onlySeen);
  console.log("onlyBookmarked", onlyBookmarked);
  if (userInfo) {
    let output = [];
    series.forEach((serie) => {
      serie.seen = userInfo.seenSeries ? typeof userInfo.seenSeries.find((elem) => {return elem === serie.id }) !== "undefined" : false;
      serie.bookmarked = userInfo.bookmarkedSeries ? typeof userInfo.bookmarkedSeries.find((elem) => { return elem === serie.id }) !== "undefined" : false;
      if((onlySeen && serie.seen) || (onlyBookmarked && serie.bookmarked) || (!onlyBookmarked && !onlySeen)) {
         output.push(serie);
      } else {
        console.log("don't return anything");
      }
    });
    return output;
  } else {
    return series;
  }
}

export default searchReducer;
