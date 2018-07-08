/**
*
* HomeFeatured4Col Saga
*
*/
import { take, call, put, select } from 'redux-saga/effects';
// Individual exports for testing
import request from 'utils/request';
import { loadHomeFeatured4Col, loadHomeFeatured4ColSuccess, loadHomeFeatured4ColFailure } from './actions';
import { APICALLURL_GETFEATUREDBIN } from 'containers/App/constants';
import { selectItems } from './selectors';
// import { selectIsUserLoggedIn } from 'containers/DynamicRegions/SimpleMagicEditButton/selectors';

export function* getHomeFeatured4ColSaga() {
  // console.log(`getHomeFeatured4ColSaga()`);
  if (typeof window === 'undefined') {
    return null;// only in the client, not in SSR
  }
  const someFeaturedBinPosts = yield select(selectItems());
  // console.log(`someFeaturedBinPosts`, someFeaturedBinPosts);

  if (!someFeaturedBinPosts) {
    yield put(loadHomeFeatured4Col());
    let requestURL = APICALLURL_GETFEATUREDBIN;
    // if (loggedInToWP) {
    //   requestURL += `&loggedintowp=true`;
    // }
    // console.log(`attempting to load stuff from ${APICALLURL_GETFEATUREDBIN}`);
    try {
      const featuredBinData = yield call(request, requestURL);
      // console.log(`featuredBinData`, featuredBinData);
      yield put(loadHomeFeatured4ColSuccess(featuredBinData));
    } catch (e) {
      // console.log(e);
      yield put(loadHomeFeatured4ColFailure());
    }
  } else {
    // console.log('getFeaturedBinSaga is not loading');
  }

}
export default getHomeFeatured4ColSaga();
