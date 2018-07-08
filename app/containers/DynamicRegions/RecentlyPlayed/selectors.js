import { createSelector } from 'reselect';

/**
 * Direct selector to the recentlyPlayed state domain
 */

const selectGlobal = () => (state) => state.get('global');
//const selectRecentlyPlayedDomain = () => (state) => state.get('recentlyPlayed');

/**
 * Other specific selectors
 */


/**
 * Default selector used by RecentlyPlayed
 */

const selectRecentlyPlayed = () => createSelector(
  selectGlobal(),
  (globalState) => {
    return globalState.getIn(['dynamicRegions', 'lastPerformances']);
  }
);



const lastThreePlayed = () => createSelector(
  selectGlobal(),
  (globalState) => {
    let lastPerformances = globalState.getIn(['dynamicRegions', 'lastPerformances']);//an array. And we don't want current, or all, we want 1, 2, 3
    if (typeof lastPerformances !== 'undefined') {
      return lastPerformances.slice(1,3);
    } else {
      return null;
    }
    //return globalState.getIn(['dynamicRegions', 'lastPerformances']);
  }
);


export default selectRecentlyPlayed;
export {
  lastThreePlayed,
  selectRecentlyPlayed,
};
