// import { take, call, put, select } from 'redux-saga/effects';

// Individual exports for testing
// export function* defaultSaga() {
//   // See example in containers/HomePage/sagas.js
// }
//
// // All sagas to be loaded
// export default [
//   defaultSaga,
// ];

import takeLatest from 'redux-saga';
import { take, call, put, select } from 'redux-saga/effects';
import LOCATION_CHANGE from 'react-router-redux';
// Individual exports for testing
import request from 'utils/request';
import { loadTilesData, tilesDataLoaded, tilesDataLoadingFailure } from './actions';
import { selectSingleTile } from './selectors';
import { LOAD_TILEDATA_SUCCESS } from './constants';


export function* defaultSaga() {
  return;
}

import { APICALLURL_GETTILES } from 'containers/App/constants';

export function* getTiles() {

  // console.log(`getTiles()`);

  const requestURL = `${APICALLURL_GETTILES}`;// hard-coded for now. replace with the domain of the current site, from environment vars.
  // we might want to consider de-bouncing this?! nah. takeLatest handles this i think
  // console.log(`requestURL==${requestURL}`);
  try {
    const someTiles = yield call(request, requestURL);
    yield put(tilesDataLoaded(someTiles));
  } catch (err) {
    yield put(tilesDataLoadingFailure(err));
  }
}

export function* tilesSaga() {

  yield takeLatest(LOCATION_CHANGE);// this doesn't seem to work, and I think that the reason is because ... ???
  // // console.log('we have just finished yeilding the LOCATION_CHANGE');
  yield call(getTiles);

}

// All sagas to be loaded
export default [
  defaultSaga, tilesSaga,
];
