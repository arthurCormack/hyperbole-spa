import { take, call, put, select } from 'redux-saga/effects';
// Individual exports for testing
import request from 'utils/request';
import featuredFourDataLoaded from './actions';
import { APICALLURL_GETFEATUREDFOUR } from 'containers/App/constants';

import { selectFeaturedFourItems } from './selectors';
import { selectIsUserLoggedIn } from 'containers/DynamicRegions/SimpleMagicEditButton/selectors';


export function* getFeaturedFourSaga() {
  // we don't do anything anymore, because - the data call for this, and the home quote is handled inside home directly.
  return;

  // let's only call it if it isn't there yet
  // let someFeaturedFourData = [];
  // const statePresence = yield select(getStatePresence());
  // if (statePresence) {
  //   someFeaturedFourData = yield select(selectFeaturedFourItems());
  // }
  // const someFeaturedFourData = yield select(selectFeaturedFourItems());
  // // // console.log(someFeaturedFourData);
  // // // console.log(typeof someFeaturedFourData);
  // const loggedInToWP = yield select(selectIsUserLoggedIn());
  //
  // if ((typeof someFeaturedFourData === 'object' && someFeaturedFourData.length === 0) || loggedInToWP ) {
  //   // console.log('*getFeaturedFourSaga() ... loading');
  //
  //   let requestURL = APICALLURL_GETFEATUREDFOUR;
  //   if (loggedInToWP) {
  //     requestURL += `&loggedintowp=true`;
  //   }
  //
  //   try {
  //     const featuredFourData = yield call(request, requestURL);
  //     // // console.log('we called featuredFourData');
  //     // // console.log(featuredFourData);
  //
  //     yield put(featuredFourDataLoaded(featuredFourData));
  //   } catch (e) {
  //     //error
  //   }
  // } else {
  //   // // console.log('we are not loading featuredFourData, because we already got one!');
  //   // console.log('*getFeaturedFourSaga() ... not loading');
  // }


  // // console.log('featured four data loaded');
  // // console.log(featuredFourData);
}
export default getFeaturedFourSaga();
