import { take, call, put, select } from 'redux-saga/effects';
// Individual exports for testing
import request from 'utils/request';
import currentMagLoaded from './actions';
import { APICALLURL_GETCURRENTMAG } from 'containers/App/constants';
import { selectCurrentMagItems } from './selectors';

export function* getCurrentMagSaga() {

  const someCurrentMag = yield select(selectCurrentMagItems());
  if (typeof someCurrentMag === 'object' && someCurrentMag.length === 0 ) {
    // console.log('getCurrentMagSaga is loading');
    try {
      const currentMagData = yield call(request, APICALLURL_GETCURRENTMAG);
      yield put(currentMagLoaded(currentMagData));
    } catch (e) {
      //error
    }
  } else {
    // console.log('getCurrentMagSaga is not loading');
  }

}
export default getCurrentMagSaga();
