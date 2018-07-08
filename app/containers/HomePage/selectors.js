/**
 * Homepage selectors
 */

import { createSelector } from 'reselect';

const selectHome = (state) => state.get('home');

const makeSelectLoading = () => createSelector(
  selectHome,
  (homeState) => homeState.get('loading')
);

const makeSelectError = () => createSelector(
  (homeState) => homeState.get('error')
);
const makeSelectHomeQuote = () => createSelector(
  selectHome,
  (homeState) => homeState.get('quote')
);

const makeSelectFeaturedFour = () => createSelector(
  selectHome,
  (homeState) => homeState.get('featuredFour')
);

export {
  selectHome,
  makeSelectHomeQuote,
  makeSelectFeaturedFour,
  makeSelectLoading,
  makeSelectError
};
