import { take, call, put, select } from 'redux-saga/effects';
// Individual exports for testing
import request from 'utils/request';
import trendingListDataLoaded from './actions';
import { APICALLURL_GETTRENDINGLIST } from 'containers/App/constants';
import { selectTrendingList } from './selectors';

export function* getTrendingListSaga() {

  const someTrendingList = yield select(selectTrendingList());

  if (typeof someTrendingList === 'object' && someTrendingList.length === 0 ) {
    try {
      // console.log(`getTrendingListSaga is loadiing`);

      const trendingListData = yield call(request, APICALLURL_GETTRENDINGLIST);
      yield put(trendingListDataLoaded(trendingListData));
    } catch (e) {
      //error
    }
  } else {
    // console.log(`getTrendingListSaga is not loadiing`);
  }

}
export default getTrendingListSaga();
