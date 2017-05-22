/**
 * Homepage selectors
 */

import {createSelector} from 'reselect';

const selectSearch = (state) => state.get('search');


const makeIsInitSelector = () => createSelector(
  selectSearch,
  (searchState) => searchState.get('isInit')
);

export {
  selectSearch,
  makeIsInitSelector
};
