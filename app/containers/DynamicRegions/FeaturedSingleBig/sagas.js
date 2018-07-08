import { take, call, put, select } from 'redux-saga/effects';
// Individual exports for testing
import { APICALLURL_GETFEATUREDSINGLEBIG } from 'containers/App/constants';
import request from 'utils/request';
import featuredSingleBigDataLoaded from './actions';
import { selectFeaturedSingleBig } from './selectors';
import { selectIsUserLoggedIn } from 'containers/DynamicRegions/SimpleMagicEditButton/selectors';

export function* getFeaturedSingleBigSaga() {

  const someFeaturedSingleBigData = yield select(selectFeaturedSingleBig());
  if (typeof someFeaturedSingleBigData === 'object' && someFeaturedSingleBigData.length === 0) {
    // console.log('getFeaturedSingleBigSaga() ... loading');

    let requestURL = APICALLURL_GETFEATUREDSINGLEBIG;
    const loggedInToWP = yield select(selectIsUserLoggedIn());
    if (loggedInToWP) {
      requestURL += `&loggedintowp=true`;
    }

    try {
      const featuredSinglelBigData = yield call(request, requestURL);
      yield put(featuredSingleBigDataLoaded(featuredSinglelBigData));
    } catch (e) {
      //error
    }
  } else {
    // console.log('getFeaturedSingleBigSaga() ... not loading');
  }

}
export default getFeaturedSingleBigSaga();
