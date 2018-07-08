import { take, call, put, select, all, fork, cancel } from 'redux-saga/effects';

import request from 'utils/request';
import { msg } from 'utils/msg';
import { setLeaderboardContentCycleSafety, leaderboardTimerSafety } from 'containers/LeaderboardHolder/actions';
import { setAllAdsContentCycleSafety } from 'containers/App/actions';

// import { getFeaturedFourSaga } from 'containers/DynamicRegions/FeaturedFour/sagas';
// import { getHomeHeroSaga } from 'containers/DynamicRegions/FullWidthPost/sagas';
// import { getMostPopularSaga } from 'containers/DynamicRegions/MostPopularColumn/sagas';
// import { getFeaturedSingleBigSaga } from 'containers/DynamicRegions/FeaturedSingleBig/sagas';
// // import { getTrendingListSaga } from 'containers/DynamicRegions/TrendingColumn/sagas';
// // import { getHomeTileSaga } from 'containers/DynamicRegions/HomeTile/sagas';
// import { getHotTopicsSaga } from 'containers/DynamicRegions/HotTopics/sagas';
// import { getCustomHotTopicsSaga } from 'containers/DynamicRegions/CustomHotTopics/sagas';
// import { getRecentPostsSaga } from 'containers/DynamicRegions/HomeFeatured3Col/sagas';
// import { getFeaturedBinSaga } from 'containers/DynamicRegions/HomeFeatured4Col/sagas';
// import { getInsetFeaturedSaga } from 'containers/DynamicRegions/InsetFullFeaturedPost/sagas';
// import { getCurrentMagSaga } from 'containers/DynamicRegions/SubscribeMagazineHeader/sagas';
// import { getHomePollSaga } from 'containers/DynamicRegions/Poll/sagas';
// import { getHomeQuoteSaga } from 'containers/DynamicRegions/Quote/sagas';
// import { singleTileSaga } from 'containers/DynamicRegions/SingleTile/sagas';
// import { specialCatRecentPostsSaga } from 'containers/DynamicRegions/SpecialCatRecentPosts/sagas';
// import { standalonePollSaga } from 'containers/DynamicRegions/StandalonePoll/sagas';
import featuredPopularTrendingSaga from './FeaturedPopularTrending/sagas';
import { getHomeHeroSaga as homeHerosSaga } from './FullWidthPost/sagas';
import { getHotTopicsSaga as hotTopicsSaga } from './HotTopics/sagas';
import { getHomeFeatured4ColSaga as homeFeatured4ColSaga } from './HomeFeatured4Col/sagas';
import { getInsetFeaturedSaga as insetFeaturedSaga } from './InsetFullFeaturedPost/sagas';

import {
  LOAD_HOMESTART,
  LOAD_HOMESTART_SUCCESS,
  LOAD_HOMESTART_FAILURE
} from './constants';

import {
  makeSelectHomeQuote,
  makeSelectFeaturedFour,
  makeSelectLoading,
  makeSelectError,
} from './selectors';

import {
  loadHomeStart,
  loadHomeStartSuccess,
  loadHomeStartFailure,
} from './actions';

import { APICALLURL_GETHOMESTART } from 'containers/App/constants';

export function* firstLoadSaga() {
  msg(`firstLoadSaga()`);
  // pseudocode:
  // do we have the stuff already?
  // if not, are we already loading the stuff?
  // if not, then start loading it, and when it's done, dispatch an action, signifying the success or failure of that job
  const homeQuote = yield select(makeSelectHomeQuote());
  const doWeHaveDataYet = homeQuote !== false;
  const areWeLoading = yield select(makeSelectLoading());
  if (!doWeHaveDataYet && !areWeLoading) {
    yield put(loadHomeStart());// next time areWeLoading will be true, until success or failure, and then doWeHaveDataYet might be different.
    try {
      const someHomeStartData = yield call(request, APICALLURL_GETHOMESTART);
      yield put(loadHomeStartSuccess(someHomeStartData));
    } catch (e) {
      yield put(loadHomeStartFailure());
    }
  }
  return;
}



// now that we have a gethomestart endpoint that provides us with both ads and the featured four ...
// we need to stop using both of those, and put them into 1 saga. and an action and reducer that will handle it
// maybe just put it into the homepage saga? ok.

// All sagas to be loaded ...

// export default [
//   // ...dynamicSagas,
//   homePageSaga,
//   getFeaturedFourSaga,
//   getHomeHeroSaga,
//   getMostPopularSaga,
//   getFeaturedSingleBigSaga,
//   getTrendingListSaga,
//   getHomeTileSaga,
//   getHotTopicsSaga,
//   getCustomHotTopicsSaga,
//   getRecentPostsSaga,
//   getFeaturedBinSaga,
//   getInsetFeaturedSaga,
//   getCurrentMagSaga,
//   getHomeQuoteSaga,
//   singleTileSaga,
//   specialCatRecentPostsSaga,
// ];

export default function* rootSaga() {
  // why not, instead of making each one of these sagas check to see if it is on the clinet ort server, simply check here, and only call them if/when we need to. as opposed to always calling them, and leaving it up toi them wether or not they participate, based on whether they are on the client or server.
  // yield all([
  //   firstLoadSaga(),
  //
  //   // getFeaturedFourSaga(),
  //   // getHomeHeroSaga(),
  //   // getMostPopularSaga(),
  //   // getFeaturedSingleBigSaga(),
  //   // getTrendingListSaga(),
  //   // getHomeTileSaga(),
  //   // getHotTopicsSaga(),
  //   // getCustomHotTopicsSaga(),
  //   // getRecentPostsSaga(),
  //   // getFeaturedBinSaga(), // covered in firstLoadSaga
  //   // getInsetFeaturedSaga(),
  //   // getCurrentMagSaga(),
  //   // getHomeQuoteSaga(), // covered in firstLoadSaga
  //   // singleTileSaga(),
  //   // specialCatRecentPostsSaga(),
  // ]);
  // yield featuredPopularTrendingSaga();
  // yield homeHerosSaga();
  // yield hotTopicsSaga();
  // yield homeFeatured4ColSaga();
  // yield insetFeaturedSaga();


  // yield put(setLeaderboardContentCycleSafety(true));
  yield put(setAllAdsContentCycleSafety(false));
  if (typeof window === 'undefined') {
    // we are on the server
    yield firstLoadSaga();
  } else {
    // we are on the client
    yield firstLoadSaga();// we have to call it here, in case we are not arriving on this page, on first load
    yield featuredPopularTrendingSaga();
    yield homeHerosSaga();
    yield hotTopicsSaga();
    yield homeFeatured4ColSaga();
    yield insetFeaturedSaga();

    yield put(setAllAdsContentCycleSafety(true));// only on the client, do we set this to true!
  }

}
// setAllAdsContentCycleSafety

// for single render SSR, could we do something like this?
//
// import { createStore, applyMiddleware } from 'redux'
// import createSagaMiddleware from 'redux-saga'
//
// // ...
// import { serverLoad } from './sagas' // maybe we should call it firstLoad instead, because that way, using it would make sense in both contexts, in clinet and on server. but server would always only be concerned with firstLoad.
//
// const sagaMiddleware = createSagaMiddleware()
// const store = createStore(
//   reducer,
//   applyMiddleware(sagaMiddleware)
// )
// sagaMiddleware.run(serverLoad)

// we could adopt a consistant standard accross containers, for serverLoad - a saga that loads the essential data required to render a given content node.

// FOOD FOR THOUGHT! https://redux-saga.js.org/docs/introduction/BeginnerTutorial.html
