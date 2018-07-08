/*
  * Dynamic Sagas groups together the sagas for various dynamic elements that would otherwise have to be included / composed
  * over and over again on route containers. This way we keep things a little DRYer and ease the pain.
  * so instead of each route container having to include multiple dynamic sagas, they only need to include this - for the common sagas that appear on every page.
  *
*/
// IMPORT OTHER GLOBAL DYNAMIC SAGAS
import { delay } from 'redux-saga'
import { take, call, all, put, select, fork, cancel } from 'redux-saga/effects';
import { LOCATION_CHANGE } from 'react-router-redux';

import { simpleEditButtonSaga } from 'containers/DynamicRegions/SimpleMagicEditButton/sagas';
import { leaderboardHolderSaga } from 'containers/LeaderboardHolder/sagas';
import { affixedSidebarSaga } from 'containers/AffixedSidebar/sagas';

// import { ACTIVATE_GENERAL_WAYPOINT_SLEEP_TIMEOUT, DEACTIVATE_GENERAL_WAYPOINT_SLEEP_TIMEOUT, DEFAULT_GENERAL_WAYPOINT_SLEEP_TIMEOUT_DURATION } from './constants';
import { deActivateGeneralWaypointSleepTimeout, createCB } from './actions';
import { ZERO_ARCHIVESTACK } from 'containers/ArchivePage/constants';
// import { msg } from 'utils/msg';
import { selectCB } from './selectors';
//
// function* getLocationChangeWatcher() {
//   while (true) {
//     yield take(LOCATION_CHANGE);
//   }
// }
//
// function* getGeneralWaypointSleepTimeoutWatcher() {
//   msg(`getGeneralWaypointSleepTimeoutWatcher()`);
//   while(true) {
//     const someSleepTimeoutAction = yield take(ACTIVATE_GENERAL_WAYPOINT_SLEEP_TIMEOUT);// this will already have been caught by reducer, and generalWaypointSleepTimeout will be set to true
//     const duration = someSleepTimeoutAction.duration !== null ? someSleepTimeoutAction.duration : DEFAULT_GENERAL_WAYPOINT_SLEEP_TIMEOUT_DURATION;
//     yield delay(duration);
//     yield put(deActivateGeneralWaypointSleepTimeout());
//     // yield call(getGeneralWaypointSleepTimer, duration);
//   }
// }
//
// // returns a watcher that will take
function* getArchiveZeroingWatcher() {
  // this will take every ZERO_ARCHIVESTACK and then remove the navIsSticky class from the SET_LEADERBOARD_DISPLAYDATA
  while (true) {
    const someZeroingAction = yield take(ZERO_ARCHIVESTACK);
    console.log(`archiveZeroingWatcher took a ZERO_ARCHIVESTACK`);
    if (typeof window !== 'undefined') {
      document.body.classList.remove('navIsSticky');
    }

  }
}


export function* SSRCacheBuster() {
  console.log('SSRCacheBuster()');

  const someCB = yield select(selectCB());
  if (!someCB) {
    // let's make the CB
    const d = new Date();
    const cb = `${d.getFullYear()}_${d.getMonth()}_${d.getUTCDate()}_${d.getHours()}_${d.getMinutes()}`;

    yield put(createCB(cb));
  }
  const archiveZeroingWatcher = yield fork(getArchiveZeroingWatcher);// a forked thing is a daemon!
  yield take(LOCATION_CHANGE);
  yield cancel(archiveZeroingWatcher);
}

export function* AppSagas() {
  console.log(`AppSagas()`);

  yield all([
    SSRCacheBuster(),

    simpleEditButtonSaga(),
    leaderboardHolderSaga(),
    // affixedSidebarSaga(),

  ]);
  //
  // const archiveZeroingWatcher = yield fork(getArchiveZeroingWatcher);// a forked thing is a daemon!
  // yield take(LOCATION_CHANGE);
  // yield cancel(archiveZeroingWatcher);

}
export default AppSagas;
