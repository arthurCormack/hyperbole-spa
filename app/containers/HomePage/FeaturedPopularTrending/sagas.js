import { take, call, put, select, all, fork, cancel } from 'redux-saga/effects';

import request from 'utils/request';
import { msg } from 'utils/msg';
import { APICALLURL_GETFEATUREDPOULARTRENDING } from 'containers/App/constants';

import { loadFeaturedPopularTrending, loadFeaturedPopularTrendingSuccess, loadFeaturedPopularTrendingFailure } from './actions';

import {
  selectSpecialCategories,
  selectHomeTile,
  selectTrendingColumn,
  selectLoading,
  selectError,
} from './selectors';

// loadFeaturedPopularTrending, loadFeaturedPopularTrendingSuccess, loadFeaturedPopularTrendingFailure

export default function* featuredPopularTrendingSaga() {
  msg(`featuredPopularTrendingSaga()`);
  // return null;
  if (typeof window === 'undefined') {
    return null;// only in the client, not in SSR
  }
  const someSpecialCategories = yield select(selectSpecialCategories());
  const isLoading = yield select(selectLoading());
  if (!someSpecialCategories && !isLoading) {
    console.log(`featuredPopularTrendingSaga should now load stuff`);
    yield put(loadFeaturedPopularTrending());
    try {
      const someFeaturedPopularTrendingData = yield call(request, APICALLURL_GETFEATUREDPOULARTRENDING);
      yield put(loadFeaturedPopularTrendingSuccess(someFeaturedPopularTrendingData));
    } catch (e) {
      console.log(e);
      yield put(loadFeaturedPopularTrendingFailure());
    }
  }
}
