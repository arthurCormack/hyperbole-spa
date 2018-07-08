import { delay } from 'redux-saga'
import { take, call, put, select, fork, cancel } from 'redux-saga/effects';
import { LOCATION_CHANGE, push } from 'react-router-redux';

import { APICALLURL_GETDATEDPOST, SET_SCROLLTOP } from 'containers/App/constants';

import interstitialAdHolderSaga from 'containers/InterstitialAdHolder/sagas';

import { LOAD_POSTDATA_SUCCESS, LOAD_POSTDATA_ERROR, LOAD_POSTDATA,
  SET_CURRENTLYDISPLAYEDITEMINDEX, DEDUCE_CURRENTLYDISPLAYED_ITEMINDEX, SET_CURRENTPOSTSTACKDISPLAYDATA, BOTTOMOFSTACKREACHED,
} from './constants';


import {
  loadPostData, postDataLoaded, postDataLoadingError, updateWindowScrollPosition, createCB,
  setCurrentlyDisplayedItemIndex,
  scrollingAddressChange,
  zeroPostStack,
  autoScrollingToPost,
  updateCurrentlyDisplayedItemIndex,
  resetCurrentlyDisplayedItemIndexWaypointInitiated,
  setForceRender,
  setCurrentPostStackDisplayData,
  setDisplayedPostStack,
} from './actions';

import { setLeaderboardSafety, setLeaderboardTimerSafety, setLeaderboardContentCycleSafety } from 'containers/LeaderboardHolder/actions';
import { setAllAdsContentCycleSafety } from 'containers/App/actions';

import request from 'utils/request';
import { some, findIndex } from 'lodash';
import { makeSelectLocationState, makeSelectLoading, selectAdTimePastMinimumThreshold, selectCB } from 'containers/App/selectors';
import { selectPostStack,
  selectCurrentlyDisplayedItemIndex,
  selectCurrentlyDisplayedItemIndexWaypointInitiated,
  selectCurrentlyDisplayedItem,
  selectCurrentlyDisplayedItemPostTitle,
  selectCurrentlyDisplayedItemExcerpt,
  selectCurrentlyDisplayedItemFeaturedImage,
  selectCurrentlyDisplayedItemPermalink,
  selectNextItem,
  selectNextItemPermalink,
  selectNextItemID,
  selectLoading,
  selectStoredScrollTop,
  selectIsScrollingAddressChange,
  selectCurrentIDsOfItemsinPostStack,
  selectPostIDsThatAreLoadedButNotYetDisplayed,
  selectDisplayedPostIDs,
} from './selectors';

import { msg } from 'utils/msg'
import { selectIsUserLoggedIn } from 'containers/DynamicRegions/SimpleMagicEditButton/selectors';
// // import { pageSaga } from 'containers/PageWrapper/sagas';
// // import { radioSaga } from 'containers/DynamicRegions/RadioPlayer/sagas';
//
// // import dynamicSagas from 'containers/App/dynamicSagas';
//
// /*
//   some thoughts about how bst to scructure containers, and constants. Although it does make sense to group file by their function, in most cases.
//   in some cases, like the urls of rest APIs, i think that it wouold make a lot more sense to make oll of those REST PAI urls live together; so that they can be updated together, instead of having to go through multiple containers.
//
// */

function* getPostSlugElements(whichPermalink) {
  const slugArray = whichPermalink.split('/');
  // // console.log('slugArray==');
  // // console.log(slugArray);
  let categorySlug = slugArray[1];// the first / in the url path (at the beginning) makes the 0th item be empty. category slug comes after that.
  let postSlug = slugArray[5];
  let yearSlug = slugArray[2];
  let monthSlug = slugArray[3];
  let daySlug = slugArray[4];
  if (slugArray.length == 8) {
    categorySlug = slugArray[2];// the first / in the url path (at the beginning) makes the 0th item be empty. category slug comes after that.
    postSlug = slugArray[6];
    yearSlug = slugArray[3];
    monthSlug = slugArray[4];
    daySlug = slugArray[5];
  } else if (slugArray.length == 9) {
    categorySlug = slugArray[3];// the first / in the url path (at the beginning) makes the 0th item be empty. category slug comes after that.
    postSlug = slugArray[7];
    yearSlug = slugArray[4];
    monthSlug = slugArray[5];
    daySlug = slugArray[6];
  }
  return ({categorySlug, postSlug, yearSlug, monthSlug, daySlug});// return one object which can later be easily deconstructed
}

// could probably merge getPost and getNextPost into one function, w params deciding behaviour, without too much trouble; they are practically the same function anyways, except for 1 small difference.
export function* getNextPost(whichNextPostPermalink = null, whichNextPostID) {// need whichNextPostPermalink

  // msg('getNextPost('+whichNextPostPermalink+')');
  // console.log(`getNextPost()`, whichNextPostPermalink, whichNextPostID);


  if (whichNextPostPermalink === null) return false;
  // without the / at the beginning
  const { categorySlug, postSlug, yearSlug, monthSlug, daySlug } = yield call(getPostSlugElements, whichNextPostPermalink);
  const cb = yield select(selectCB());
  let requestURL = `${APICALLURL_GETDATEDPOST}/${categorySlug}/${yearSlug}/${monthSlug}/${daySlug}/${postSlug}?fullpermalink=${whichNextPostPermalink}`;// hard-coded for now. replace with the domain of the current site, from environment vars.
  const loggedInToWP = yield select(selectIsUserLoggedIn());
  // if (loggedInToWP) {
  //   requestURL += `&loggedintowp=true`;
  // }
  yield put(loadPostData(whichNextPostPermalink));
  try {
    const somePost = yield call(request, requestURL);
    yield put(postDataLoaded(somePost));
  } catch (err) {
    yield put(postDataLoadingError(err));
  }
}

export function* getPost() {
  // when we are getting the post, do we know the id of that post?


  const locationState = yield select(makeSelectLocationState());
  const somePermalink = locationState.locationBeforeTransitions.pathname;
  // without the / at the beginning!
  // const someFullPermalink = yield call(getFullPermalink);

  const cb = yield select(selectCB());
  const { categorySlug, postSlug, yearSlug, monthSlug, daySlug } = yield call(getPostSlugElements, somePermalink);
  let requestURL = `${APICALLURL_GETDATEDPOST}/${categorySlug}/${yearSlug}/${monthSlug}/${daySlug}/${postSlug}`;// hard-coded for now. replace with the domain of the current site, from environment vars.
  // const loggedInToWP = yield select(selectIsUserLoggedIn());
  // if (loggedInToWP) {
  //   requestURL += `&loggedintowp=true`;
  // }
  //
  const someNextPostID = null;// this is when we are on the server, or loading a new post directly, and don't know the id of it. we pass null.
  yield put(loadPostData(somePermalink));
  try {
    const somePost = yield call(request, requestURL);// will be null
    // console.log('getPost call complete');
    yield put(postDataLoaded(somePost));
  } catch (err) {
    yield put(postDataLoadingError(err));
  }
}

function* checkIfPostIsInStack(someURLPath) {

  const somePostStack = yield select(selectPostStack());
  const inStack = some(somePostStack, {'permalink': someURLPath});// does this actually work?
  // // console.log('inStack=='+inStack);
  // console.log(`checkIfPostIsInStack(${someURLPath})::${inStack}`);
  return inStack;
}
function* findPositionOfPostInStack(someURLPath) {

  const somePostStack = yield select(selectPostStack());
  const stackPos = findIndex(somePostStack, {'permalink': someURLPath});// does this actually work?
  // console.log(`findPositionOfPostInStack(${someURLPath})::${stackPos}`);
  return stackPos;
}

export function* getBottomOfStackWatcher() {
  while(true) {
    yield take(BOTTOMOFSTACKREACHED);
    // console.log(`saga BOTTOMOFSTACKREACHED`);
    // maybe before we force the re-render, is there a way to tell if there is a difference between what is currently being displayed, and what the poststack is?
    // and only force the re-render if there is additional stuff to put in.

    // new problem: we load ina new thing, and that triggers a re-render, displaying the next thing ... but it doesn't neccesarily push the BOTTOMOFSTACKREACHED waypoint down ... so it will not get entered again ... so we don't get the trigger to load the new next thing, even though we are at the bottom.
    // so ... what sort of solutions are possible in this scenario?

    // we need a way to check wherther or not the bottom of stack waypoint it in the viewport or not?
    // or maybe when we are done rendering, we could inspect the waypoints in viewport ...
    // if we use that method, then returning null is not an option, we need to have the waypoint ... but i think we might have it wrapped around the null anyways.
    // nope, its not there.

    // we need a little nuance here.
    // setForceRender is good, if we already have the thing loaded, but if it isn't in the stack yet; isLoading will be true (right?) and then we should wait.
    // so only take away the force render, if loading is false, otherwise
    const someNextItemPermalink = yield select(selectNextItemPermalink());
    const someNextItemID = yield select(selectNextItemID());

    yield call(getNextPost, someNextItemPermalink, someNextItemID);// we also have to pass along the id of the next thing. because th id's are needed for adStack keys
    yield put(setForceRender(true));
  }
}

function* getScrollingSafetyTimer() {
  // msg(`getScrollingSafetyTimer()`);
  yield delay(1337);

  const currentItemIndex = yield select(selectCurrentlyDisplayedItemIndex());

  const itemsLoaded = yield select(selectCurrentIDsOfItemsinPostStack());

  const numberOfItemsLoaded = itemsLoaded.length;
  // msg(`getScrollingSafetyTimer currentItemIndex==${currentItemIndex}, numberOfItemsLoaded==${numberOfItemsLoaded}`);
  // const numberOfItemsDisplayed = yield select(selectDisplayedPostIDs()).length;
  if (currentItemIndex + 3 <= numberOfItemsLoaded ) {
    // then do nothing.
    // msg(`currentItemIndex + 3 <= numberOfItemsLoaded`);
  } else {
    const isLoading = yield select(selectLoading());
    // msg(`isLoading==${isLoading}`);
    if (!isLoading) {
      // msg('!isLoading, and we are at the very end of the stack ... so ...');
      const someNextItemPermalink = yield select(selectNextItemPermalink());
      const someNextItemID = yield select(selectNextItemID());
      // msg(`someNextItemPermalink==${someNextItemPermalink}`);
      yield call(getNextPost, someNextItemPermalink, someNextItemID);
    }
  }

  const displayedPostIDs = yield select(selectDisplayedPostIDs());
  // msg(`displayedPostIDs==${displayedPostIDs}`);

  const postIDsThatAreLoadedButNotYetDisplayed = yield select(selectPostIDsThatAreLoadedButNotYetDisplayed());
  // msg(`postIDsThatAreLoadedButNotYetDisplayed==${postIDsThatAreLoadedButNotYetDisplayed}`);

  // selectAdTimePastMinimumThreshold


  if (postIDsThatAreLoadedButNotYetDisplayed.length > 0 ) {
    // msg(`getScrollingSafetyTimer::postsThatAreLoadedButNotYetDisplayed.length > 0`);
    // then lets add the items to the displayed items, and force render
    yield put(setDisplayedPostStack([...displayedPostIDs, ...postIDsThatAreLoadedButNotYetDisplayed]));
    // yield put(setForceRender(true));
  }
  // const adTimePastMinimumThreshold = yield select(selectAdTimePastMinimumThreshold());
  // if (adTimePastMinimumThreshold) {
  //   yield put(setForceRender(true));
  // }
}
// setScrollTop, SET_SCROLLTOP

export function* getScrollEventWatcher() {
  // msg(`getScrollEventWatcher()`);
  if (typeof window !== 'undefined') {
    while (true) {
      const safetyTimer = yield fork(getScrollingSafetyTimer);
      const someAction = yield take(SET_SCROLLTOP);
      yield cancel(safetyTimer);// cancel the scrollSafetyTimer, if it is there.
    }
  }
}

// set a timer, that will, after 30 seconds dispatch an action, telling us that it is safe to refresh ads; rerender the post stack.
//

// export function* getTriggerPostStackChangeWatcher() {
//   // TRIGGER_POSTSTACK_CHANGE
//   while (true) {// eslint-disable-line forked generator
//     // store something transient in state? that we can compare against the next time that we get back here?
//     // the re-render that happens will cause two waypoints to each do their thing?
//     const someAction = yield take(TRIGGER_POSTSTACK_CHANGE);//
//     const someItemIndex = someAction.current;
//     const locationState = yield select(makeSelectLocationState());
//     const currentPathName = locationState.locationBeforeTransitions.pathname;
//     const currentPostStack = yield select(selectPostStack());
//     // in situations, where we come to a post page not from a post page ... there might not be a previous permalink, so we have to prevent errors by assuming the presence of data that may not be there.
//     const someItemPermalink = currentPostStack[someItemIndex].permalink;
//     // isLoading should not stop us from changing the address here.
//     if (currentPathName !== someItemPermalink) {
//       // we need to adjust waypointsInViewport here.
//       // rememer that the SinglePostPage container won't re-render until it sees an address change.
//       // so ... set the data, then do the push. we don't need to use redux-saga's both to do them in parallel
//       // remember to set it to what it will be, once the push has happened.
//       yield put(setCurrentPostStackDisplayData(someAction.current, someAction.inViewportWaypoints));
//       yield put(push(someItemPermalink));// this is why we appear to have a delay!
//     } else {
//       yield put(setCurrentPostStackDisplayData(someAction.current, someAction.inViewportWaypoints));
//     }
//   }
// }

export function* postLoadingSaga() {
  let isLoading = yield select(selectLoading());
  // if (isLoading) msg(`isLoading`);// that means that we got an address change while something was loading ... what happens to the request promise? what happens to the postLoadingSaga ... ?
  // setLeaderboardTimerSafety, setLeaderboardContentCycleSafety
  console.log(`*************postLoadingSaga, isLoading==${isLoading}`);
  const currentlyDisplayedItemIndexWatcher = yield fork(getCurrentlyDisplayedItemIndexWatcher);
  const deduceCurrentlyDisplayedItemIndexWatcher = yield fork(getDeduceCurrentlyDisplayedItemIndexWatcher);
  const currentPostStackDisplayDataWatcher = yield fork(getCurrentPostStackDisplayDataWatcher);
  const bottomOfStackWatcher = yield fork(getBottomOfStackWatcher);
  // let's check to see if the isScrollingAddressChange is true
  // const isScrollingAddressChange = select(selectIsScrollingAddressChange());
  const scollEventWatcher = yield fork(getScrollEventWatcher);


  const currentPostStack = yield select(selectPostStack());

  // if (!isScrollingAddressChange && currentPostStack.length > 0) {
  //   // unless the stack is 1 item long, and that 1 item matches the current address, then kill it.
  //   // or maybe a better solution would be to simply remove anything it that isn't the current one.
  //   // yield put(zeroPostStack());
  //   // but wait a sec ... hold on, hold on ... what about when the user uses the back / forward buttons in browser to navigate / switch address ...
  //   // we don't want to zero the stack then.
  //   // so ... our scheme needs to accomodate that.
  //   // i think we could maybe just use the getPost clause. the isLoading thing shouldn't matter. unless the thing loading isn't the thing that should be.
  // }

  const locationState = yield select(makeSelectLocationState());
  const currentPathName = locationState.locationBeforeTransitions.pathname;
  // so let's say that when we initiate the load
  const inStackAlready = yield call(checkIfPostIsInStack, currentPathName);
  // we need to find a way to re-trigger the getNextPost, if it hasn't successfully completed ...
  if (isLoading) {
    msg(`isLoading==${isLoading}, so we try getNextPost again ...`);
  }

  // console.log('currentPathName=='+currentPathName+', inStackAlready=='+inStackAlready+', isLoading=='+isLoading);
  // if (!inStackAlready && !isLoading) {//

  const loggedInToWP = yield select(selectIsUserLoggedIn());

  if ((!inStackAlready || (loggedInToWP && currentPostStack.length === 1) ) && !isLoading) {// the isLoading == true is negating our ability to zero the postStack, occasionally.
    // console.log('!inStackAlready');
    // console.log('currentPostStack.length=='+currentPostStack.length);
    // if (currentPostStack.length > 0) {// we can zero it, even if doesn't have more than 0, if it does have 0.
    //   // console.log('currentPostStack.length > 0');
    //   yield put(zeroPostStack());// this will set it to 0, but only if its not already empty
    // } else {
    //   // // console.log('!(currentPostStack.length > 0)');
    // }
    yield put(zeroPostStack());// zero it!

    // i think this is the crux of the matter,
    // it will be not in stack, until it has finished loading, which it will not have done.
    // that function needs to be rewritten, in order to allow for dealyed time of asynch calls
    // i think that the 2nd postLoadingSaga will see that checkIfPostIsInStack returns false,
    // // console.log('this is where we call getPost from within postLoadingSaga!');
    yield call(getPost);// this will trigget a load action, which wil set loading to true, which should stop other load attempts

    yield put(setAllAdsContentCycleSafety(true));
    //

    // // console.log('ok ... we have just called getPost');
  } else {
    // it is in the stack already ... so, in that case, we need to window.scrollTo some position. but what position.
    const stackPos = yield call(findPositionOfPostInStack, currentPathName);
    // console.log('inStackAlready');
    // console.log('currentPostStack.length=='+currentPostStack.length+', stackPos=='+stackPos);
    if (stackPos !== -1) {
      yield put(setAllAdsContentCycleSafety(true));
      // // console.log(stackPos !== -1);
      // now what do we do?
      // we need to pu an action that will set the new index in the stack.
      // if we are going to scroll to a new place, over a duration of time, then we will need to find a way to suppress waypoints triggering new address changes, until such a time as we have reached our destination
      // we may not be able to
      // // console.log('so we are detecting a circumstance when we should might need to be scrolling ...');
      // only if currentPathName != postStack[currentIndex].permalink
      // what is a safe, smart way to determine whether or not we should be scrolling to a post here?
      // a Waypoint triggered change in address should not trigger the scrolling business! thats the key
      // so we need a Waypoint triggered flag to look for, and only if it is not there, do we initiate the autoscrolling mechanism

      // need to get at currentlyDisplayedItemIndexWaypointInitiated
      const currentlyDisplayedItemIndex = yield select(selectCurrentlyDisplayedItemIndex());// we need to updateCurrentlyDisplayedItemIndex every time that we complete an autoscroll cycle.
      const currentlyDisplayedItemIndexWaypointInitiated = yield select(selectCurrentlyDisplayedItemIndexWaypointInitiated());
      if (!currentlyDisplayedItemIndexWaypointInitiated) {
        // console.log('!currentlyDisplayedItemIndexWaypointInitiated !!! stackPos=='+stackPos+', currentlyDisplayedItemIndex=='+currentlyDisplayedItemIndex);
        if (currentlyDisplayedItemIndex !== null) {
          if (stackPos !== currentlyDisplayedItemIndex) {
            // console.log(`stackPos !== currentlyDisplayedItemIndex ... so we need to scroll to ${currentPathName}`);
            yield put(autoScrollingToPost(currentPathName));// iff we didn't get change url, and reload saga, by Waypoint triggered scrolling!
          } else {
            // console.log('huh');
          }
        } else {
          // console.log('currentlyDisplayedItemIndex === null !!!');
        }
      } else {
        // we need to reset currentlyDisplayedItemIndexWaypointInitiated to null, so that the next time, if there is one, it will be fresh again
        // console.log('currentlyDisplayedItemIndexWaypointInitiated');
        yield put(resetCurrentlyDisplayedItemIndexWaypointInitiated(null));
      }
      // if we are at the last position, then load in the next one!
      // const isLoading = yield select(selectLoading());
      // console.log(`isLoading==${isLoading}`);
      if (stackPos+1 >= currentPostStack.length && !isLoading) {
        msg('at end of stack, and not currently loading anything, so we loading in next thing ... but wait ... lets not');
        const someNextItemPermalink = yield select(selectNextItemPermalink());
        const someNextItemID = yield select(selectNextItemID());
        // this triggers an endless loop!!!
        if (someNextItemPermalink !== null && someNextItemID !== null) {
          yield call(getNextPost, someNextItemPermalink, someNextItemID);
        }

        // do we load in the next post here?
        // or do we only load it in, when we
      } else {
        // msg(`WTF! stackPos==${stackPos},  currentPostStack.length==${currentPostStack.length}, && isLoading===${isLoading}`);
        // why we don't load in a second one when we go here, asynchronously? becasue we will be loading! right from the get go.
      }

    } else {
      // console.log('how is that even possible?!');
    }
  }


  // this might be the correct place to fire off an ad safety notice.

  yield take( LOCATION_CHANGE );
  // postLoadingSaga sees a LOCATION_CHANGE and will now cancel forked watchers
  // console.log(`postLoadingSaga sees a LOCATION_CHANGE and will now cancel forked watchers`);
  // I think that what might be happening here, is that all of these watchers are getting cancelled, but in re-invoked! so after the first address change, that's it, no more!

  // yield cancel(currentlyDisplayedItemIndexWatcher);
  // yield cancel(deduceCurrentlyDisplayedItemIndexWatcher);
  // yield cancel(currentPostStackDisplayDataWatcher);
  // yield cancel(bottomOfStackWatcher);
  // yield cancel(scollEventWatcher);
}

export function* getCurrentPostStackDisplayDataWatcher() {
  //
  while (true) {
    const someAction = yield take(SET_CURRENTPOSTSTACKDISPLAYDATA);//
    console.log('saga take(SET_CURRENTPOSTSTACKDISPLAYDATA)', someAction);
    // console.log(someAction);
    // this is where the new magic will happen now.
    // current, inViewportWaypoints
    // the question is, is currentlyDisplayedItemIndex the lasst one in the stack? do we need to load any new ones into the stack?
    const someItemIndex = someAction.current;
    // now check to see if the itemIndex is the last one in the stack, and if it is, load in the next one
    const locationState = yield select(makeSelectLocationState());
    const currentPathName = locationState.locationBeforeTransitions.pathname;
    const currentPostStack = yield select(selectPostStack());
    // in situations, where we come to a post page not from a post page ... there might not be a previous permalink, so we have to prevent errors by assuming the presence of data that may not be there.
    // console.log(currentPostStack);
    const someItemPermalink = currentPostStack[someItemIndex].permalink;// this sometimes is undefined. need to protect!

    // isLoading should not stop us from changing the address here.
    if (currentPathName !== someItemPermalink) {
      console.log(currentPathName, ' !== ', someItemPermalink, '∴ pushing');
      yield put(push(someItemPermalink));// this is why we appear to have a delay!
    } else {
      // console.log('currentPathName === someItemPermalink: not pushing');

      if (someItemIndex + 1 === currentPostStack.length) {
        const isLoading = yield select(selectLoading());
        if (!isLoading) {
          // console.log('!isLoading, and we are at the very end of the stack ... so ...');
          const someNextItemID = yield select(selectNextItemID());
          const someNextItemPermalink = yield select(selectNextItemPermalink());
          yield call(getNextPost, someNextItemPermalink, someNextItemID);
        }
        // const someNextItemPermalink = yield select(selectNextItemPermalink());
      }
    }
  }
}

export function* getCurrentlyDisplayedItemIndexWatcher() {
  // we want to pay attention to the SET_CURRENTLYDISPLAYEDITEMINDEX action
  // and inspect it agains the current post stack. and see if the next item has already loaded. if it has, then do nothing.
  // if not, then load it.

  // console.log('getCurrentlyDisplayedItemIndexWatcher()');
  while (true) {

    const someAction = yield take(SET_CURRENTLYDISPLAYEDITEMINDEX);//
    // console.log('take(SET_CURRENTLYDISPLAYEDITEMINDEX)');
    // return false;
    // so ... we look in the postStack, at currentItemIndex and get the permalink, and then
    //  1) store the scrollTop, and then 2) switch to that address ...
    // so that when the container loads afresh, it will have a storedScrollTop waiting for it,
    const someItemIndex = someAction.itemIndex;
    // now check to see if the itemIndex is the last one in the stack, and if it is, load in the next one

    const locationState = yield select(makeSelectLocationState());
    const currentPathName = locationState.locationBeforeTransitions.pathname;
    const currentPostStack = yield select(selectPostStack());
    const someItemPermalink = currentPostStack[someItemIndex].permalink;

    const someNextItemPermalink = yield select(selectNextItemPermalink());
    // // console.log('oi');
    const isLoading = yield select(selectLoading());
    // console.log(`someItemIndex==${someItemIndex}, currentPostStack.length==${currentPostStack.length}, isLoading==${isLoading}`);
    if (someItemIndex + 1 === currentPostStack.length) {
      // then it is the last one.
      // console.log(`someItemIndex + 1 === currentPostStack.length`);
      if (!isLoading) {
        // console.log('!isLoading');
        // then start loading
        // yield call(getNextPost, someNextItemPermalink);// it seems that this starts loading, before the address change ... which results in a delay :(
        // yield all([
        //   call(getNextPost, someNextItemPermalink),
        //   put(push(someItemPermalink)),
        // ]);

        //
        // yield call(getNextPost, someNextItemPermalink);

        //change oif plans here ... we will still load the next one ... but we will change the address first!
        // console.log(`someItemPermalink==${someItemPermalink} and currentPathName==${currentPathName}`);
        if (currentPathName !== someItemPermalink) {
          // console.log('pushing');
          yield put(push(someItemPermalink));// this is why we appear to have a delay!
        } else {
          // console.log('not pushing');
        }

        // could we be pushing the same address that we already have, over and over here?!

        // when we load a page ... and the pageloadSga runs, it can compare the current index to the number of items in the stack, and load i+1 if necc
        // we are waiting to get the next post before triggering the address change ... so there is a dealy while the API call completes. this is probably sub optimal


        // // console.log('ha');
      } else {
        // console.log('dont push if loading?!');
        // yield put(push(someItemPermalink));
      }
    } else {
      // it is not the last one
      if (someItemPermalink !== null && someItemPermalink !== currentPathName) {
        yield put(scrollingAddressChange(true));
        // so that the next thime this thing gets loaded, we know not to zero the stack.
        // but could we not also glean that from the !inStackAlready && !isLoading?
        yield put(push(someItemPermalink));
      }
    }

  }
}

export function* getDeduceCurrentlyDisplayedItemIndexWatcher() {
  // DEDUCE_CURRENTLYDISPLAYED_ITEMINDEX
  // // console.log('getDeduceCurrentlyDisplayedItemIndexWatcher()');
  while (true) {
    const someAction = yield take(DEDUCE_CURRENTLYDISPLAYED_ITEMINDEX);
    // console.log('DEDUCE_CURRENTLYDISPLAYED_ITEMINDEX');
    // look at the current address, and figure out what index in the stack that is. then chain to another action ( setCurrentlyDisplayedItemIndex --> SET_CURRENTLYDISPLAYEDITEMINDEX) that will update state
    const locationState = yield select(makeSelectLocationState());
    const currentPathName = locationState.locationBeforeTransitions.pathname;
    const currentPostStack = yield select(selectPostStack());
    const deducedStackPos = findIndex(currentPostStack, (o) => {
      return o.permalink = currentPathName;
    });
    if (deducedStackPos !== -1) {
      // put action that updates stack index
      yield put(setCurrentlyDisplayedItemIndex(deducedStackPos))
    } else {
      // // console.log('not found in stack');
    }
  }
}


// export default [
//   postLoadingSaga,
//   interstitialAdHolderSaga,
// ];
export default postLoadingSaga;
