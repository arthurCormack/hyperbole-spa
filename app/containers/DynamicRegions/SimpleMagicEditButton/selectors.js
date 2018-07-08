import { createSelector } from 'reselect';
import { makeSelectLocationState } from 'containers/App/selectors';

// import { selectGlobal } from 'containers/App/selectors';

/**
 * Direct selector to the radioDisplay state domain
 */
const selectGlobal = () => (state) => {
  if (typeof state.get('global').toJS !== 'function') {
    return state.get('global');
  }
  return state.get('global').toJS()
};

// const selectGlobal = () => (state) => {
//   if (typeof state.get('global').toJS !== 'function') {
//     return state.get('global');
//   }
//   return state.get('global').toJS()
// };

/**
 * Other specific selectors
 */

const selectWPRequestObjType = () => createSelector(
  selectGlobal(),
  (globalState) => globalState.get('wp_requestobjtype')
);


const selectCurrentURLPath = () => createSelector(
  makeSelectLocationState(),
  (locationState) => locationState.locationBeforeTransitions.pathname
);

const selectWPUserData = () => createSelector(
  selectGlobal(),
  (globalState) => {
    // console.log(`selectWPUserData`, globalState);
    if (typeof globalState.wp_userdata !== 'undefined') {
      return globalState.wp_userdata;
    } else {
      return false;
    }

  }
)

const selectIsUserLoggedIn = () => createSelector(
  selectWPUserData(),
  (userData) => {
    // console.log(`selectIsUserLoggedIn`, userData);
    return userData.loggedintowp;
  }
);

export default selectCurrentURLPath;
export {
  selectWPRequestObjType,
  selectCurrentURLPath,
  selectWPUserData,
  selectIsUserLoggedIn
};
