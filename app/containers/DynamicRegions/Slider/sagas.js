import takeLatest from 'redux-saga';
import { take, call, put, select } from 'redux-saga/effects';

import { LOCATION_CHANGE } from 'react-router-redux';
import request from 'utils/request';
import { APICALLURL_GETSLIDESHOW } from 'containers/App/constants';
import { slideshowDataLoaded, slideshowDataLoadingError } from 'containers/App/actions';

export function* getSlideshow() {
  // console.log('getSlideshow() saga here');
  const requestURL = `${APICALLURL_GETSLIDESHOW}`;
  // const someSlideshow = yield call(request, requestURL);
  // if (!someSlideshow.err) {
  //   yield put(slideshowDataLoaded(someSlideshow.data));
  // } else {
  //   yield put(slideshowDataLoadingError(someSlideshow.err));
  // }
  try {
    const someSlideshow = yield call(request, requestURL);
    yield put(slideshowDataLoaded(someSlideshow));
  } catch (err) {
    yield put(slideshowDataLoadingError(err));
  }
}

export function* sliderSaga() {
  // console.log('sliderSaga()');
  yield takeLatest(LOCATION_CHANGE);
  yield call(getSlideshow);;
}

// All sagas to be loaded
export default [
  sliderSaga,
];
