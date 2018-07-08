import { createSelector } from 'reselect';

// const selectHome = () => (state) => state.get('home');
const selectGlobal = () => (state) => state.get('global');
/**
 * Direct selector to the singleCategorizedPostPage state domain
 */
// const selectRecentEventsDomain = () => state => state.get('recentEvents');// how / where does this get set?
// const selectRecentEventsDomain = () => state => state.get('recentEvents');// how / where does this get set?

/**
 * Other specific selectors
 */

/**
 * Default selector used by SingleCategorizedPostPage
 */


/* const selectRecentEvents = () => createSelector(
  selectRecentEventsDomain(),
  (substate) => substate.toJS()
);*/


// const selectRecentEvents = () => {};// but this is an a event?!
// const selectRecentEvents = () => (state) => {};

const selectUpcomingEvents = () => createSelector(
  selectGlobal(),
  (globalState) => {
    const someUpcomingEvents = globalState.getIn(['dynamicRegions', 'upcomingEvents']);
    // // console.log('selectRecentEvents() returns:' + someRecentEvents);
    return someUpcomingEvents;
  }
);


/* const selectRecentEvents = createSelector(
  selectGlobal(),
  (state) => state.getIn(['dynamicRegions', 'reventEvents'])
);*/

export default selectUpcomingEvents;
export {
  selectUpcomingEvents,
};
