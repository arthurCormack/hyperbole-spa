import { take, call, put, select } from 'redux-saga/effects';
// Individual exports for testing
import request from 'utils/request';
import customHotTopicsDataLoaded from './actions';
import { APICALLURL_GETCUSTOMHOTTOPICS } from 'containers/App/constants';
import { selectCustomHotTopicItems } from './selectors';
import { selectIsUserLoggedIn } from 'containers/DynamicRegions/SimpleMagicEditButton/selectors';

export function* getCustomHotTopicsSaga() {

  const someCustomHotTopics = yield select(selectCustomHotTopicItems());

  let requestURL = APICALLURL_GETCUSTOMHOTTOPICS;
  const loggedInToWP = yield select(selectIsUserLoggedIn());
  if (loggedInToWP) {
    requestURL += `&loggedintowp=true`;
  }

  if (typeof someCustomHotTopics === 'object' && someCustomHotTopics.length === 0 ) {
    // console.log(`getCustomHotTopicsSaga is loading`);


    try {
      const customHotTopicsData = yield call(request, requestURL);
      yield put(customHotTopicsDataLoaded(customHotTopicsData));
    } catch (e) {
      // error
    }
  } else {
    // console.log(`getCustomHotTopicsSaga is not loading`);
  }

}
export default getCustomHotTopicsSaga();
