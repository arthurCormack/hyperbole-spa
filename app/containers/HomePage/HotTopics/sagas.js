import { take, call, put, select } from 'redux-saga/effects';
// Individual exports for testing
import request from 'utils/request';
import { loadHotTopics, loadHotTopicsSuccess, loadHotTopicsFailure } from './actions';
import { APICALLURL_GETHOTTOPICS } from 'containers/App/constants';
import { selectItems } from './selectors';
import { selectIsUserLoggedIn } from 'containers/DynamicRegions/SimpleMagicEditButton/selectors';


export function* getHotTopicsSaga() {

  console.log(`getHotTopicsSaga()`);

  if (typeof window === 'undefined') {
    return null;// only in the client, not in SSR
  }

  let someHotTopicsItems = yield select(selectItems());
  // console.log(`someHotTopicsItems`, someHotTopicsItems);

  if (!someHotTopicsItems) {

    let requestURL = APICALLURL_GETHOTTOPICS;

    // if (loggedInToWP) {
    //   requestURL += `&loggedintowp=true`;
    // }
    yield put(loadHotTopics());
    try {
      const hotTopicsData = yield call(request, requestURL);
      yield put(loadHotTopicsSuccess(hotTopicsData));
    } catch (e) {
      console.log(e);
      yield put(loadHotTopicsFailure());
    }
  } else {
      // console.log('getHotTopicsSaga is not loading');
  }
  // return null;

}
export default getHotTopicsSaga();
