import { createSelector } from 'reselect';

/**
 * Direct selector to the singlePage state domain
 */
const selectSinglePageDomain = (state) => state.get('singlePage');

/**
 * Other specific selectors
 */


/**
 * Default selector used by SinglePage
 */

const makeSelectSinglePage = () => createSelector(
  selectSinglePageDomain,
  (substate) => substate.toJS()
);

export default makeSelectSinglePage;
export {
  selectSinglePageDomain,
};
