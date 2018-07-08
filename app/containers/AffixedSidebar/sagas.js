import { delay } from 'redux-saga';
import { put, take, fork, cancel } from 'redux-saga/effects';
import { LOCATION_CHANGE } from 'react-router-redux';
import { msg } from 'utils/msg';
// import { setLeaderboardSafety, setAdTimePastMinimumThreshold } from './actions';

// import { START_ADREFRESHTIMER, AD_LEADERBOARD_JUSTFIRED } from './constants';
//
// function* getAdTimePastMinimumThresholdTimer() {
//   msg(`getAdTimePastMinimumThresholdTimerWatcher()`);
//   while (true) {
//     yield take(START_ADREFRESHTIMER);
//     msg(`take(START_ADREFRESHTIMER)`);
//     msg(`setAdTimePastMinimumThreshold(false)`);
//     yield put(setAdTimePastMinimumThreshold(false));
//     // we can inspect select state later on to see if its ok to to an impromptu rerender. rerenders could happen, because they need to, or because its a good time to, but not willy nilly please.
//     yield delay(30000); // 30 seconds is the minimum time allowed by dfp for refresh rates.
//     msg(`setAdTimePastMinimumThreshold(true)`);
//     yield put(setAdTimePastMinimumThreshold(true));
//   }
// }
//
//
// function* getAdDidFireWatcher() {
//   while(true) {
//     const someAdFire = yield take(AD_LEADERBOARD_JUSTFIRED);
//     msg(`take(AD_LEADERBOARD_JUSTFIRED)`);
//   }
// }
//
// function* getLeaderboardSafetyWatcher() {
//   yield put(setLeaderboardSafety(false));
//   yield delay(250);
//   yield put(setLeaderboardSafety(true));
// }

export function* affixedSidebarSaga() {
  if (typeof window !== 'undefined') {
    // msg(`affixedSidebarSaga()`);
    // const leaderboardSafetyWatcher = yield fork(getLeaderboardSafetyWatcher);
    // const adDidFireWatcher = yield fork(getAdDidFireWatcher);
    // yield take(LOCATION_CHANGE);
    // yield cancel(leaderboardSafetyWatcher);
    // yield cancel(adDidFireWatcher);
  }
}

export default [
  affixedSidebarSaga,
];
