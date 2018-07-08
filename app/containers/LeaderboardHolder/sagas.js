import { delay } from 'redux-saga';
import { put, take, fork, cancel } from 'redux-saga/effects';
import { LOCATION_CHANGE } from 'react-router-redux';
import { msg } from 'utils/msg';
import { setLeaderboardSafety, setAdTimePastMinimumThreshold } from './actions';
// // setLeaderboardTimerSafety, setLeaderboardContentCycleSafety
import { selectLeaderboardTimerSafety, selectLeaderboardContentCycleSafety } from './selectors';

import { DFPManager } from 'react-dfp';

import { SET_ALLADS_CONTENTCYCLESAFETY } from 'containers/App/constants';
import { START_ADREFRESHTIMER, AD_LEADERBOARD_JUSTFIRED, SET_LEADERBOARD_CONTENTSAFETY, SET_LEADERBOARD_TIMERSAFETY } from './constants';

function* getAdTimePastMinimumThresholdTimer() {
  // msg(`getAdTimePastMinimumThresholdTimerWatcher()`);
  while (true) {
    yield take(START_ADREFRESHTIMER);
    // msg(`take(START_ADREFRESHTIMER)`);
    // msg(`setAdTimePastMinimumThreshold(false)`);
    yield put(setAdTimePastMinimumThreshold(false));
    // we can inspect select state later on to see if its ok to to an impromptu rerender. rerenders could happen, because they need to, or because its a good time to, but not willy nilly please.
    yield delay(30000); // 30 seconds is the minimum time allowed by dfp for refresh rates.
    // msg(`setAdTimePastMinimumThreshold(true)`);
    yield put(setAdTimePastMinimumThreshold(true));
  }
}


function* getAdDidFireWatcher() {
  while(true) {
    const someAdFire = yield take(AD_LEADERBOARD_JUSTFIRED);
    console.log(`getAdDidFireWatcher take(AD_LEADERBOARD_JUSTFIRED)`);
    // DFPManager.refresh();
  }
}

function* getLeaderboardSafetyWatcher() {
  yield put(setLeaderboardSafety(false));// <-- this does not mean, re-render, it means do not do another render cycle of the ads!
  // how about, we check to see if it really needs to be set to false here ... maybe.
  // maybe if we already have the ad for the thing that is currently displayed, we could set this to safe.
  // we only want to make this false, if we need to, not always.

  // we want to make the leaderboard safety true, when the fata that needs to be displayed has been loaded into state.
  // so ... determine what the data is that needs to be loaded into state ...
  // then determine if it is there or not.
  // then set it.

  // when we look at wp_request, in state, that can only tell us what we did have ... not what we will have. Either we wait until the data has loaded to tell us what kind of thing to expect, or we determine it before the data is loaded.
  // we do have a load_post action and a load archive action


  // so instead of falsing the leaderboardSafety when the location changes, we false it, just before we start to load in new data for the thing at that address?
  // how about the App saga, checks to see what kind of thing we have; then when it takes a load action, it knows what kind of thing it is loading ... and it determines if it hasto zero ad stuff or not.
  // it turns ad safeties off (which doesn't yet cause any re-rendering) ... and then turns them back on again
  // maybe we need to use a new switch ... something like newadcycle. or keep track of 'adcycles', so we know which one we are in ... and each location change, or timeout we enter into a new adcycle.
  // wow ... far more robust way of dealing with ad firing.

  // so we wait and take ... contentDisplayCycleSafety ... which is what we will set instead of leaderboardSafety.
  // when we have that, then we start a simple timer. So that all adHolders have a chance to render and have their waypoints register, then we resolve what the current thing is,
  // and then set the adSafety.

  // yield delay(250);
  // yield put(setLeaderboardSafety(true));

}

export function* getSafetyTimer() {

}

export function* getContentCycleSafetyWatcher() {
  // take an action, and then start the time, ...
  // it would be nice if we could iinstead of using a timer, check to see if each leaderBoard in the stack had done its render, and do this after.
  // or use a different mechanism - not the waypoints - to determine what was in the viewport, and what was not.
  //
  while (true) {
    const allAdsContentCycleSafety = yield take(SET_ALLADS_CONTENTCYCLESAFETY);
    // console.log(`getContentCycleSafetyWatcher takes SET_ALLADS_CONTENTCYCLESAFETY!`, allAdsContentCycleSafety);
    yield delay(168);
    yield put(setLeaderboardSafety(allAdsContentCycleSafety.isSafe));

  }
}


// we need an engageLeaderboardWaypoints and disengageLeaderboardWaypoints.
// which would be called from the context of the HomePage or SinglePostPage - the route container - the thing that is responsible for rendering the overall thing at a particular route
// ... route containers say when it is safe for ads to render. and the ads listen.

export function* leaderboardHolderSaga() {
  // console.log(`leaderboardHolderSaga()`);
  if (typeof window !== 'undefined') {
    const leaderboardSafetyWatcher = yield fork(getLeaderboardSafetyWatcher);// why not just put false here? why the watchers, if all they do is a little delay? ah ... the leaderboard saga, is now cast inside a DAEMON!!!
    const contentCycleSafetyWatcher = yield fork(getContentCycleSafetyWatcher);

    const adDidFireWatcher = yield fork(getAdDidFireWatcher);
    yield take(LOCATION_CHANGE);
    yield cancel(leaderboardSafetyWatcher);
    yield cancel(contentCycleSafetyWatcher);
    yield cancel(adDidFireWatcher);
  }
}

export default [
  leaderboardHolderSaga,
];
