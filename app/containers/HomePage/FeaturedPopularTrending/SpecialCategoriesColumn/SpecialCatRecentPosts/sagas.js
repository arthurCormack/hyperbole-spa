import { take, takeEvery, call, put, select, fork, cancel } from 'redux-saga/effects';
// Individual exports for testing
import request from 'utils/request';
import { specialCatRecentPostsDataLoaded, getSpecialRecentPostsForTag } from './actions';
import { APICALLURL_GETSPECIALCATRECENTPOSTS } from 'containers/App/constants';
import { LOCATION_CHANGE } from 'react-router-redux';
import { GETSPECIALRECENTPOSTSFORTAG } from './constants';
import { selectSpecialCatRecentPosts } from './selectors';

export function* getSpecialCatRecentPosts(tag) {
  if (typeof tag === 'object') {
    tag = tag.tag;
  }
  // console.log('getSpecialCatRecentPosts');
  const requestUrl = `${APICALLURL_GETSPECIALCATRECENTPOSTS}?tag=${tag}&range=3`;
  // console.log(`requestUrl==${requestUrl}`);
  try {
    const specialCatRecentPostsData = yield call(request, requestUrl);
    yield put(specialCatRecentPostsDataLoaded(specialCatRecentPostsData));
  } catch (e) {
    //
  }
}

function* getSpecialCatRecentPostsWatcher() {
  while(true) {
    const someAction = yield takeEvery(GETSPECIALRECENTPOSTSFORTAG);
    yield call(getSpecialCatRecentPosts, someAction.tag);
  }
}



export function* specialCatRecentPostsSaga() {
  // console.log('specialCatRecentPostsSaga!!!!!!');
  const everyGetSpecialCatRecentPosts = yield takeEvery(GETSPECIALRECENTPOSTSFORTAG, getSpecialCatRecentPosts);
  // const specialCatRecentPostsWatcher =  yield fork(getSpecialCatRecentPostsWatcher);
  // once we have set up, what is in essence, a forked listener, we can can simply dispatch actions that will load in a few specific.
  // this would replace the componentDidMount mechanism. this has the disadvantage of decoupling things a little bit. we need.
  // dispatch(getSpecialRecentPostsForTag(tag));
  const someSpecialCatRecentPosts = yield select(selectSpecialCatRecentPosts());
  const someSpecialCatRecentPostKeys = Object.keys(someSpecialCatRecentPosts);
  // console.log(`someSpecialCatRecentPostKeys==${someSpecialCatRecentPostKeys}`);
  if (someSpecialCatRecentPostKeys.length === 0 ) {
    // console.log(`specialCatRecentPostsSaga is loading`);
    yield put(getSpecialRecentPostsForTag('zoomer-daily'));
    yield put(getSpecialRecentPostsForTag('politics-policy'));
    yield put(getSpecialRecentPostsForTag('arts-and-entertainment'));
    yield put(getSpecialRecentPostsForTag('stars-and-royals'));
    yield put(getSpecialRecentPostsForTag('sex-love-relating'));
  } else {
    // console.log(`specialCatRecentPostsSaga is not loading`);
  }


  /*

  <Tab.Pane eventKey="tag1">
    <TagLink to="/tag/zoomer-daily"><h1>Zoomer Daily</h1></TagLink>
    <SpecialCatRecentPosts tag="zoomer-daily"/>
  </Tab.Pane>
  <Tab.Pane eventKey="tag2">
    <TagLink to="/tag/politics-policy/"><h1>Politics &amp; Policy</h1></TagLink>
    <SpecialCatRecentPosts tag="politics-policy"/>
  </Tab.Pane>
  <Tab.Pane eventKey="tag3">
    <TagLink to="/tag/arts-and-entertainment"><h1>Arts &amp; Entertainment</h1></TagLink>
    <SpecialCatRecentPosts tag="arts-and-entertainment"/>
  </Tab.Pane>
  <Tab.Pane eventKey="tag4">
    <TagLink to="/tag/stars-and-royals"><h1>Stars &amp; Royals</h1></TagLink>
    <SpecialCatRecentPosts tag="stars-and-royals"/>
  </Tab.Pane>
  <Tab.Pane eventKey="tag5">
    <TagLink to="/tag/sex-love-relating"><h1>Sex &amp; Love</h1></TagLink>
    <SpecialCatRecentPosts tag="sex-love-relating"/>

  */

  yield take(LOCATION_CHANGE);
  // yield cancel(specialCatRecentPostsWatcher);

}

export default specialCatRecentPostsSaga();
