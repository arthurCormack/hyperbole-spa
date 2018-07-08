import { createSelector } from 'reselect';


const selectGlobal = () => (state) => state.get('global');



/**
 * Other specific selectors
 */


/**
 * Default selector used by RadioToggler
 */

const selectPlayingState = () => createSelector(
  selectGlobal(),
  (globalState) => {
    const somePlayingState = globalState.get('radioPlayState');
    return somePlayingState;
  }
);

export default selectPlayingState;
export {
  selectPlayingState,
};
