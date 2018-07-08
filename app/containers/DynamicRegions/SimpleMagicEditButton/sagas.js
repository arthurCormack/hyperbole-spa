import { take, call, put, select, fork, cancel } from 'redux-saga/effects';
import { LOCATION_CHANGE } from 'react-router-redux';


import _ from 'lodash';
import { makeSelectLocationState } from 'containers/App/selectors';
// import { selectWPRequestObjType } from './selectors';

import { selectTermData } from 'containers/ArchivePage/selectors';
import { selectPostID } from 'containers/SinglePostPage/selectors';
import { selectWPUserData } from './selectors';

import { setWPUserData } from './actions';

import { TRIGGER_GETWPUSERSTATUS, GETWPUSERSTATUS_SUCCESS } from './constants';

function* getTypeOfThing(whichPermalink = '/') {
  // console.log(`getTypeOfThing(${whichPermalink})`);
  if (whichPermalink === '/') {
    return 'home';
  } else {
    if (whichPermalink.indexOf('/tiles') !== -1) {
      return 'tiles';
    }
    if (whichPermalink.indexOf('/tag') !== -1) {
      return 'tag';
    }
    const slugArray = whichPermalink.split('/');
    // // console.log('slugArray');
    // // console.log(slugArray);

    //   switch slugArray
    // }
    if (slugArray.length >= 7) {
      return 'post';
    }

    const specificPages = ['about', 'privacy-policy', 'contact', 'terms', 'advertise-with-us', 'horoscopes', 'whatever', 'sign-up', 'newsletter', 'signup'];// pages have asingle slug. All that should theoretically be left are the category pages

    if (slugArray.length === 2 && _.findIndex(specificPages, (slug) => {return slug === slugArray[1]}) !== -1) {
      return 'page';
    } else {
      return 'category';
    }
  }
  return false;
}

export function* getWPUserStatus() {
  // console.log('getWPUserStatus()');
  if (typeof window === 'undefined') {
    return false;// bail out, and don't try reading cookis from the browser on the server which doesn't make sense and causes errors
  }

  const someUserData = yield select(selectWPUserData());

  // try {
  //   const someUserData = yield select(selectWPUserData());
  // } catch (e) {
  //   // console.log(`selectWPUserData failed`);
  //   console.log(e);
  //   return false;
  // }

  // console.log('someUserData==');
  // console.log(someUserData);
  if (someUserData && typeof someUserData.loggedintowp !== 'undefined' && someUserData.loggedintowp !== null) {
    return false;// bailing out
  }
  // find the cookie, then put
  const locationState = yield select(makeSelectLocationState());
  const somePermalink = locationState.locationBeforeTransitions.pathname;

  // check state to see if we have already checked this. it will either equal true/false/null. null means try reading the cookie.
  // but if its true or false, then we stop checking
  // the check puts an action that sets this in state.
  // we need a selector for that
  let ca = document.cookie.split(';');
  // // console.log(ca);
  //ok ... that mechanism is not going to work - the cookie expires instantly, so can't be detected.
  if (document.cookie.indexOf("zm_loggedintowp") !== -1) {//we can't see that cookie, because it is http only!
    // // console.log('COOKIE FOUND with zm_loggedintowp')
    // then we are logged in. simplest  , most direct, quickest and lightest. very specific and non-reusable though.
    yield put(setWPUserData({ loggedintowp: true }))

    const typeOfWPRequestObject = yield call(getTypeOfThing, somePermalink);
    // console.log('typeOfWPRequestObject==');
    // console.log(typeOfWPRequestObject);

    // let requestURL;
    let someTermData;
    let someTermID;
    let post_id;
    //http://ez2.local/wp-admin/post.php?post=417884&action=edit
    switch(typeOfWPRequestObject) {
      case 'home':
        // requestURL = `${APICALLURL_GETADMINMENUMARKUP}?thingtype=home`;
        break;
      case 'post':
        post_id = yield select(selectPostID());
        // requestURL = `${APICALLURL_GETADMINMENUMARKUP}?thingtype=post&post=${post_id}`;// remember to actually add the post id here !
        break;
      case 'page':
        post_id = yield select(selectPostID());
        // requestURL = `${APICALLURL_GETADMINMENUMARKUP}?thingtype=page&post=${post_id}`;
        break;
      case 'category':
        someTermData = yield select(selectTermData());
        someTermID = someTermData !== null ? someTermData.term_id : 0;
        // requestURL = `${APICALLURL_GETADMINMENUMARKUP}?thingtype=category&term_id=${someTermID}`;
        break;
      case 'tag':
        someTermData = yield select(selectTermData());
        someTermID = someTermData !== null ? someTermData.term_id : 0;
        // requestURL = `${APICALLURL_GETADMINMENUMARKUP}?thingtype=tag&term_id=${someTermID}`;
        break;
      default:
        return false;
    }
    /*
    // console.log(requestURL);
    yield put(loadAdminMenuMarkup());
    try {
      //  // console.log('... ... ...');
      const someAdminMenu = yield call(requestHTML, requestURL, {credentials:'same-origin'});// the thrid parameter, will be the 2nd parameter passed to requestHTML, which is it's options.
      // // console.log('someAdminMenu==');
      // // console.log(someAdminMenu);
      // the problem is, that the request, is attempting to parse it as if it were json, but it is not, it is html ... so we need to handle it differently.
      // wpadminbar
      // console.log('someAdminMenu==');
      // // console.log(someAdminMenu);
      if (someAdminMenu.indexOf('wpadminbar') !== -1) {
        yield put(adminMenuMarkupLoaded(someAdminMenu));
        // otherwise, return null
        //
      } else {
        yield put(adminMenuMarkupLoaded(null));
      }

    } catch (err) {
      // // console.log('adminMenuMarkupFailure :()');
      // // console.log(err)
      yield put(adminMenuMarkupFailure(err));
    }*/
  } else {
    // // console.log('NO zm_loggedintowp found in COOKIES');// interesting ...
    yield put(setWPUserData({ loggedintowp: false }))
  }
}

// function* getTriggerWatcher() {
//   // // console.log('getTriggerWatcher()');
//   while (true) {
//     yield take(TRIGGER_GETDEFAULTADMINMARKUP);
//     // // console.log('trigger watcher received a TRIGGER_GETDEFAULTADMINMARKUP');
//     yield call(getAdminMarkup);
//   }
// }
export function* simpleEditButtonSaga() {

  // // const triggerWatcher = yield fork(getTriggerWatcher);
  // // let's simplify ... we don't need all this rigamarole
  // console.log(`simpleEditButtonSaga()`);
  // // lets see if we have already made a call to get
  yield call(getWPUserStatus);
  // yield take(LOCATION_CHANGE);
  // yield cancel(triggerWatcher);
  return;
}

// All sagas to be loaded
export default [
  simpleEditButtonSaga,
];
