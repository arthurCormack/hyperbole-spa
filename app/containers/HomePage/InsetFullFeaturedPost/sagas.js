import { take, call, put, select } from 'redux-saga/effects';
// Individual exports for testing
import { APICALLURL_GETINSETFEATURED } from 'containers/App/constants';
import request from 'utils/request';
import { loadInsetFeatured, loadInsetFeaturedSuccess, loadInsetFeaturedFailure } from './actions';
import { selectItems } from './selectors';



export function* getInsetFeaturedSaga() {

  console.log(`getInsetFeaturedSaga()`);

  if (typeof window === 'undefined') {
    return null;// only in the client, not in SSR
  }

  let someInsetFeaturedItems = yield select(selectItems());

  if (!someInsetFeaturedItems) {

    let requestURL = APICALLURL_GETINSETFEATURED;

    yield put(loadInsetFeatured());
    console.log(`loadInsetFeatured`);
    try {
      const insetFeaturedData = yield call(request, requestURL);
      yield put(loadInsetFeaturedSuccess(insetFeaturedData));
    } catch (e) {
      console.log(e);
      yield put(loadInsetFeaturedFailure());
    }
  } else {
      // console.log('getInsetFeaturedSaga is not loading');
  }

}
export default getInsetFeaturedSaga();
