import { createSelector } from 'reselect';
import { makeSelectLocationState } from 'containers/App/selectors';
/**
 * Direct selector to the radioDisplay state domain
 */
const selectGlobal = () => (state) => state.get('global');

/**
 * Other specific selectors
 */

const selectWPRequestObjType = () => createSelector(
  selectGlobal(),
  (globalState) => globalState.get('wp_requestobjtype')
);
const selectPoll = () => createSelector(
  selectGlobal(),
  (globalState) => {
    const somePoll = globalState.getIn(['dynamicRegions', 'standalonePoll']);
    return somePoll;
  }
);

const selectCurrentURLPath = () => createSelector(
  makeSelectLocationState(),
  (locationState) => locationState.locationBeforeTransitions.pathname
);

export default selectPoll;
export {
  selectWPRequestObjType,
  selectPoll,
  selectCurrentURLPath,
};
