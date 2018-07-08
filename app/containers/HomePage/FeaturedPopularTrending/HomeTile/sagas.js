import { take, call, put, select } from 'redux-saga/effects';
// Individual exports for testing
import request from 'utils/request';
import homeTileDataLoaded from './actions';
import { APICALLURL_GETHOMETILE } from 'containers/App/constants';
import { selectHomeTile } from './selectors';

export function* getHomeTileSaga() {

  const someHomeTile = yield select(selectHomeTile());

  if (typeof someHomeTile === 'object' && someHomeTile.length === 0 ) {
    try {

      const homeTileData = yield call(request, APICALLURL_GETHOMETILE);
      yield put(homeTileDataLoaded(homeTileData));
    } catch (e) {
      //error
    }
  } else {
    // console.log(`hometilesaga is not loadiing`);
  }

}
export default getHomeTileSaga();
