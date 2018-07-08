import { take, call, put, select } from 'redux-saga/effects';
// Individual exports for testing
import request from 'utils/request';
import recentPostsDataLoaded from './actions';
import { APICALLURL_GETRECENTPOSTS } from 'containers/App/constants';
import { selectRecentPosts } from './selectors';
import { selectIsUserLoggedIn } from 'containers/DynamicRegions/SimpleMagicEditButton/selectors';

export function* getRecentPostsSaga() {


  const someRecentPosts = yield select(selectRecentPosts());
  const loggedInToWP = yield select(selectIsUserLoggedIn());

  if ((typeof someRecentPosts === 'object' && someRecentPosts.length === 0) && loggedInToWP) {
    // console.log('getRecentPostsSaga is loading data');
    try {
      let requestURL = APICALLURL_GETRECENTPOSTS;
      if (loggedInToWP) {
        requestURL += `&loggedintowp=true`;
      }

      const recentPostsData = yield call(request, requestURL);
      yield put(recentPostsDataLoaded(recentPostsData));
    } catch (e) {
      //error
    }
  } else {
    // console.log('getRecentPostsSaga is not loading data');
  }

}
export default getRecentPostsSaga();
