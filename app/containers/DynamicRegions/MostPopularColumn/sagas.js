import { take, call, put, select } from 'redux-saga/effects';
// Individual exports for testing
import request from 'utils/request';
import mostPopularDataLoaded from './actions';
import { APICALLURL_GETMOSTPOPULAR } from 'containers/App/constants';
import { selectMostPopularItems } from './selectors';

export function* getMostPopularSaga() {

  const someMostPopularItems = yield select(selectMostPopularItems());
  if (typeof someMostPopularItems === 'object' && someMostPopularItems.length === 0 ) {
    // console.log('getMostPopularSaga is loading');
    try {
      // console.log('APICALLURL_GETMOSTPOPULAR==' + APICALLURL_GETMOSTPOPULAR);
      const mostPopularData = yield call(request, APICALLURL_GETMOSTPOPULAR);
      yield put(mostPopularDataLoaded(mostPopularData));
    } catch (e) {
      //error
    }
  } else {
    // console.log('getMostPopularSaga is not loading');
  }

}
export default getMostPopularSaga();
