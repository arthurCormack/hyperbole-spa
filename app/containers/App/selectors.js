/**
 * The global state selectors
 */

import { createSelector } from 'reselect';

const selectGlobal = (state) => state.get('global');

const selectAds = () => createSelector(
  selectGlobal,
  (globalState) => {
    // // console.log('selectAds()');
    const ads = globalState.get('ads');
    if (typeof ads.toJS === 'function') return globalState.get('ads').toJS();
    return ads;
  }
);

const selectRoute = (state) => state.get('route');

const makeSelectCurrentUser = () => createSelector(
  selectGlobal,
  (globalState) => globalState.get('currentUser')
);

const makeSelectLoading = () => createSelector(
  selectGlobal,
  (globalState) => globalState.get('loading')
);

const makeSelectError = () => createSelector(
  selectGlobal,
  (globalState) => globalState.get('error')
);

const makeSelectRepos = () => createSelector(
  selectGlobal,
  (globalState) => globalState.getIn(['userData', 'repositories'])
);

const makeSelectLocation = () => createSelector(
  selectRoute,
  (routeState) => routeState.get('location')
);

const makeSelectLocationState = () => {
  let prevRoutingState;
  let prevRoutingStateJS;
  return (state) => {
    const routingState = state.get('route'); // or state.route
    if (!routingState.equals(prevRoutingState)) {
      prevRoutingState = routingState;
      prevRoutingStateJS = routingState.toJS();
    }
    return prevRoutingStateJS;
  };
};


const selectEnvironment = (state) => {
  const globalState = state.get('environment');
  return globalState;
}
const makeSelectApiURL = () => createSelector(
  selectEnvironment(),
  (env) => {
    return env.api_url;
  }
);
const selectAdTimePastMinimumThreshold = () => createSelector(
  selectGlobal,
  (globalState) => globalState.get('adTimePastMinimumThreshold')
);

const selectCB = () => createSelector(
  selectGlobal,
  (globalState) => globalState.get('cb')
);
const makeSelectGeneralWaypointSleepTimeout = () => createSelector(
  selectGlobal,
  (globalState) => globalState.get('generalWaypointSleepTimeout')
);


export {
  selectGlobal,
  selectAds,
  makeSelectCurrentUser,
  makeSelectLoading,
  makeSelectError,
  makeSelectRepos,
  makeSelectLocation,
  makeSelectLocationState,
  makeSelectApiURL,
  selectLastScrollDirection,
  selectAdTimePastMinimumThreshold,
  makeSelectGeneralWaypointSleepTimeout,
  selectCB,
};
