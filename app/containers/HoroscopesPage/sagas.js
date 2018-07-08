import { take, call, put, select, fork, cancel } from 'redux-saga/effects';
import { LOCATION_CHANGE } from 'react-router-redux';
import request from 'utils/request';
import { APICALLURL_HOROSCOPES } from 'containers/App/constants';
import { TRIGGER_LOAD_HOROSCOPES } from './constants';
import { makeSelectHoroscopes } from './selectors';
import { loadHoroscopesData, horoscopesDataLoaded, horoscopesDataLoadingFailure } from './actions';

function* loadHoroscopes() {
  // console.log('loadHoroscopes()');
  const currentHoroscopes = yield select(makeSelectHoroscopes());
  if (currentHoroscopes !== null) {
    // console.log('currentHoroscopes !== null');
    return true;
  }
  // console.log(currentHoroscopes);
  const requestURL = APICALLURL_HOROSCOPES;

  yield put(loadHoroscopesData());
  try {
    const someHoroscopes = yield call(request, requestURL);
    yield put(horoscopesDataLoaded(someHoroscopes));
  } catch (err) {
    yield put(horoscopesDataLoadingFailure(err));
  }
}

function* getLoadHoroscopeWatcher() {
  while (true) {
    yield take(TRIGGER_LOAD_HOROSCOPES);                            // only load them, if we haven't already got them in state
    yield call(loadHoroscopes);
  }
}

export function* horoscopeSaga() {
  // console.log('horoscopeSaga()');
  // const loadHoroscopeWatcher = yield fork(getLoadHoroscopeWatcher); // set up trigger watcher
  // yield take(LOCATION_CHANGE);
  // yield cancel(loadHoroscopeWatcher);                               // cancel trigger watcher

  // ok, le't just load it, simply, if its not there.
  yield call(loadHoroscopes);
}

// All sagas to be loaded
export default [
  horoscopeSaga,
];
