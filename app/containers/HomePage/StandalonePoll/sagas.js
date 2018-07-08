import { take, call, put, select, fork, cancel, takeLatest } from 'redux-saga/effects';
import { LOCATION_CHANGE } from 'react-router-redux';
import { APICALLURL_GETPOLLMARKUP } from 'containers/App/constants';
import { TRIGGER_LOADPOLLMARKUP } from './constants';
import requestHTML from 'utils/requestHTML';
// import _ from 'lodash';
import { makeSelectLocationState } from 'containers/App/selectors';
// //triggerLoadPollMarkup, LoadPollMarkup, LoadPollMarkupSuccess, LoadPollMarkupFailure
import { triggerLoadPollMarkup, loadPollMarkup, loadPollMarkupSuccess, loadPollMarkupFailure } from './actions';

// import { selectWPRequestObjType } from './selectors';
//
// import { selectTermData } from 'containers/ArchivePage/selectors';
// import { selectPostID } from 'containers/SinglePostPage/selectors';
// import { loadAdminMenuMarkup, adminMenuMarkupLoaded, adminMenuMarkupFailure } from './actions';
/*
export const TRIGGER_LOADPOLLMARKUP = 'app/StandalonePoll/TRIGGER_LOADPOLLMARKUP';
export const LOAD_POLLMARKUP = 'app/StandalonePoll/LOAD_POLLMARKUP';
export const LOAD_POLLMARKUP_SUCCESS = 'app/StandalonePoll/LOAD_POLLMARKUP_SUCCESS';
export const LOAD_POLLMARKUP_FAILURE = 'app/StandalonePoll/ADMINMENUMARKUP_FAILURE';*/

function* getPollMarkup() {
  // console.log('...getPollMarkup()');
  const locationState = yield select(makeSelectLocationState());
  const somePermalink = locationState.locationBeforeTransitions.pathname;
  let requestURL = `${APICALLURL_GETPOLLMARKUP}`;
  yield put(loadPollMarkup());
  try {
    const somePollHTML = yield call(requestHTML, requestURL, {credentials:'same-origin'});// the thrid parameter, will be the 2nd parameter passed to requestHTML, which is it's options.
    yield put(loadPollMarkupSuccess(somePollHTML));
  } catch (err) {
    yield put(loadPollMarkupFailure(err));
  }

}
function* getTriggerWatcher() {
  while (true) {
    yield take(TRIGGER_LOADPOLLMARKUP);
    // console.log('standalonePollSaga received a TRIGGER_LOADPOLLMARKUP');
    yield call(getPollMarkup);
  }
}
export function* standalonePollSaga() {
  // console.log('standalonePollSaga()');
  const triggerWatcher = yield fork(getTriggerWatcher);
  // const triggerWatcher = yield takeLatest()
  yield take(LOCATION_CHANGE);
  yield cancel(triggerWatcher);
  return;
}

// All sagas to be loaded
export default [
  standalonePollSaga,
];
