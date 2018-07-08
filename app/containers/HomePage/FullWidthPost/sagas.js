import { take, call, put, select } from 'redux-saga/effects';
// Individual exports for testing
import request from 'utils/request';
import { loadHomeHero, loadHomeHeroSuccess, loadHomeHeroFailure } from './actions';
import { APICALLURL_GETHOMEHERO } from 'containers/App/constants';
import { selectHomeHeroItems } from './selectors';

import { selectIsUserLoggedIn } from 'containers/DynamicRegions/SimpleMagicEditButton/selectors';

export function* getHomeHeroSaga() {
  // console.log(`getHomeHeroSaga()`);
  // only run on client, not during SSR
  if (typeof window === 'undefined') {
    return null;
  }
  const someHomeHeroItems = yield select(selectHomeHeroItems());
  console.log(`someHomeHeroItems`, someHomeHeroItems);
  // const loggedInToWP = yield select(selectIsUserLoggedIn());

  if (!someHomeHeroItems || someHomeHeroItems.length === 0) {
    // console.log('getHomeHeroSaga is loading data');

    let requestURL = APICALLURL_GETHOMEHERO;

    // if (loggedInToWP) {
    //   requestURL += `&loggedintowp=true`;
    // }

    yield put(loadHomeHero());
    // console.log(`getHomeHeroSaga -> loadHomeHero ... `)
    try {
      const homeHeroItems = yield call(request, requestURL);
      yield put(loadHomeHeroSuccess(homeHeroItems));
    } catch (e) {
      console.log(e);
      yield put(loadHomeHeroFailure());
    }
  } else {
    // console.log('getHomeHeroSaga is not loading data');
  }

  // // console.log('featured four data loaded');
  // // console.log(featuredFourData);
}


export default getHomeHeroSaga();
