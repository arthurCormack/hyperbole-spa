// // Individual exports for testing
// import request from 'utils/request';

// the single tile borrows from the tilesPage
// it uses its constants and actions,
// but the single Tile has its own reducer, and it takes only the first item, and puts it into a different place in state than the tilesPage. it puts it into global.singleTile.
// but ... the single reducer woould also get called when the action is initiated by the home page, ... we should check state before initiating the api call, to avoid doing it again, unneccesarily


//
import takeLatest from 'redux-saga';
import { take, call, put, select } from 'redux-saga/effects';
import LOCATION_CHANGE from 'react-router-redux';
// Individual exports for testing
import request from 'utils/request';
import { loadTilesData, tilesDataLoaded, tilesDataLoadingFailure } from 'containers/TilesPage/actions';
import { selectSingleTile } from './selectors';
import { LOAD_TILEDATA_SUCCESS } from 'containers/TilesPage/constants';


export function* defaultSaga() {
  return;
}


import { APICALLURL_GETTILES } from 'containers/App/constants';

export function* getTiles() {

  // // console.log(`*****getTiles()`);
  // getSpecialRecentPostsForTag
  
  const someSingleTile = yield select(selectSingleTile());
  if (typeof someSingleTile === 'object' && someSingleTile.length === 0) {
    const requestURL = `${APICALLURL_GETTILES}`;// hard-coded for now. replace with the domain of the current site, from environment vars.
    // we might want to consider de-bouncing this?! nah. takeLatest handles this i think
    //// console.log(`requestURL==${requestURL}`);
    // console.log(`singleTileSaga --> getTiles is loading`);
    try {
      const someTiles = yield call(request, requestURL);
      yield put(tilesDataLoaded(someTiles));
    } catch (err) {
      yield put(tilesDataLoadingFailure(err));
    }
  } else {
    // console.log(`singleTileSaga --> getTiles is not loading`);
  }

}


export function* singleTileSaga() {
  // // console.log('singleTileSaga saga here :))');
  // yield takeLatest(LOCATION_CHANGE);// this doesn't seem to work, and I think that the reason is because ... ???
  // // console.log('we have just finished yeilding the LOCATION_CHANGE');

  yield call(getTiles);

}

// All sagas to be loaded
export default [
  defaultSaga, singleTileSaga,
];
