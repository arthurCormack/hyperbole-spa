import { createSelector } from 'reselect';

/**
 * Direct selector to the radioDisplay state domain
 */
const selectGlobal = () => (state) => state.get('global');

/**
 * Other specific selectors
 */


/**
 * Default selector used by RadioDisplay
 */


// we need to do a little bit of logic here.
// or somewhere. if we don't do it here, then it will have to be done somewhere else.
// maybe the socket receiver reducer can trigger an update. yes. let's do that.

const selectCurrentShow = () => createSelector(
  selectGlobal(),
  (globalState) => {
    const someCurrentShow = globalState.getIn(['dynamicRegions', 'currentShow']);
    return someCurrentShow;
  }
);

const selectCurrentThing = () => createSelector(
  selectGlobal(),
  (globalState) => {
    const someCurrentThing = globalState.getIn(['dynamicRegions', 'currentlyPlaying']);

    return someCurrentThing;
  }
);

export default selectCurrentThing;
export {
  selectCurrentShow,
  selectCurrentThing,
};
