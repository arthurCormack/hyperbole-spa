import takeLatest from 'redux-saga';
import { take, call, put, select } from 'redux-saga/effects';
import LOCATION_CHANGE from 'react-router-redux';
// Individual exports for testing
import request from 'utils/request';
import { zoomerNewsDataLoaded, zoomerNewsDataLoadingError } from 'containers/App/actions';

export function* defaultSaga() {
  return;
}


import { APICALLURL_GETPOSTS } from 'containers/App/constants';

export function* getZoomerNews() {
  // const state = yield select(selectLocationState());
  // const categorySlug = state.locationBeforeTransitions.pathname.split('/')[1];// the first / in the url path (at the beginning) makes the 0th item be empty. category slug comes after that.
  // const postSlug = state.locationBeforeTransitions.pathname.split('/')[2];

  const requestURL = `${APICALLURL_GETPOSTS}?category=zoomer-news`;// hard-coded for now. replace with the domain of the current site, from environment vars.
  // we might want to consider de-bouncing this?! nah. takeLatest handles this i think
  try {
    const someZoomerNews = yield call(request, requestURL);
    yield put(zoomerNewsDataLoaded(someZoomerNews));
  } catch (err) {
    yield put(zoomerNewsDataLoadingError(err));
  }
}


export function* zoomerNewsSaga() {
  // console.log('zoomerNewsSaga saga here :))');
  // return;
  // this is the initial saga that will get called when we first arrive on a page ... the LOCATION_CHANGE
  // so this needs to start the loading of asynchronous data off.
  yield takeLatest(LOCATION_CHANGE);// this doesn't seem to work, and I think that the reason is because ... ???
  // // console.log('we have just finished yeilding the LOCATION_CHANGE');
  yield call(getZoomerNews);

}

// All sagas to be loaded
export default [
  defaultSaga, zoomerNewsSaga,
];
