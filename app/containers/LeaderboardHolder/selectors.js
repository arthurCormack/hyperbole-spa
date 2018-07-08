// import { selectActive, selectSidebarIndex } from './selectors';

import { createSelector } from 'reselect';
import { selectGlobal } from 'containers/App/selectors';
import { makeSelectLocationState, makeSelectLoading } from 'containers/App/selectors';
import { selectCurrentlyDisplayedItemPostID } from 'containers/SinglePostPage/selectors';

const selectCurrentLeaderboardIndex = () => createSelector(
  selectGlobal,
  (globalState) => globalState.get('leaderboardIndex')
);

const selectWPRequest = () => createSelector(
  selectGlobal,
  (globalState) => globalState.get('wp_request')
);

const selectLeaderboardsInViewport = () => createSelector(
  selectGlobal,
  (globalState) => globalState.get('leaderboardsInViewport')
);

const selectAds = () => createSelector(
  selectGlobal,
  (globalState) => {
    // // console.log('selectAds()');
    return globalState.get('ads')
  }
);

const selectAdStack = () => createSelector(
  selectGlobal,
  (globalState) => {
    return globalState.get('adStack')
  }
);

const selectLeaderboard = () => createSelector(
  selectWPRequest(),
  selectAds(),
  selectAdStack(),
  selectCurrentlyDisplayedItemPostID(),
  (wp_request, ads, adStack, post_id) => {

    if (wp_request.type === 'post') {
      if (!post_id) return null;
      let someAdStack = adStack;
      if (typeof adStack.toJS === 'function') someAdStack = adStack.toJS();
      return someAdStack[post_id].leaderboard;
    }

    if (!ads) return null;
    if (typeof ads.toJS === 'function') {
      ads = ads.toJS();
    }
    if (!ads.leaderboard) {

      return null;
    }
    return ads.leaderboard;
  }
);

const selectID = () => createSelector(
  selectLeaderboard(),
  (leaderboard) => {
    // // console.log('selectID()');
    if (leaderboard === null ) {
      return null;
    } else {
      return leaderboard.id;
    }
  }
);
const selectSizes = () => createSelector(
  selectLeaderboard(),

  (leaderboard) => {
    // // console.log('selectSizes()');
    if (leaderboard === null ) {
      return null;
    } else {
      return leaderboard.sizes;
    }
  }
);

const selectMobileInterstitial = () => createSelector(
  selectAds(),
  (ads) => {
    if (!ads) return null;
    if (!ads.mobileInterstitial) return null;
    return ads.mobileInterstitial;
  }
);
const selectMobileInterstitialID = () => createSelector(
  selectMobileInterstitial(),
  (mobileInterstitial) => {
    // // console.log('selectID()');
    if (mobileInterstitial === null ) {
      return null;
    } else {
      return mobileInterstitial.id;
    }
  }
);
const selectMobileInterstitialSizes = () => createSelector(
  selectMobileInterstitial(),
  (mobileInterstitial) => {
    // // console.log('selectSizes()');
    if (mobileInterstitial === null ) {
      return null;
    } else {
      return mobileInterstitial.sizes;
    }
  }
);
//

const selectSinglePosts = () => (state) => {
  if (typeof state === 'undefined') {
    return false;
  }
  const someSinglePosts = state.get('singlePostPage');
  if (typeof someSinglePosts !== 'undefined' && someSinglePosts !== null) {
    return someSinglePosts.toJS();
  }
  // if (typeof someSinglePosts.toJS === 'function') {
  //   return state.get('singlePostPage').toJS();
  // }

  return false;
  // return state.get('singlePosts').toJS();
}

const makeSelectDoesCurrentItemMatchCurrentAddressYet = () => createSelector(
  makeSelectLocationState(),
  selectSinglePosts(),
  (locationState, singlePosts) => {
    // console.log('makeSelectDoesCurrentItemMatchCurrentAddressYet()');
    // // console.log(locationState);
    // console.log(`singlePosts`, singlePosts);

    const currentLocationPath = locationState.locationBeforeTransitions.pathname;
    // console.log(`currentLocationPath==${currentLocationPath}`);

    if (!singlePosts || !currentLocationPath) {
      // console.log('returning false A');
      return false;
    } else {
      // // console.log('returning something else');
      const currentlyDisplayedItemIndex = singlePosts.currentlyDisplayedItemIndex;
      if (currentlyDisplayedItemIndex === null) {
        // // console.log('returning false B');
        return false;
      }
      if (typeof singlePosts.postStack !== 'object') {
        // // console.log('returning false C');
        return false;
      }
      if (!singlePosts.postStack.length > 0) {
        // // console.log('returning false D');
        return false;
      }

      if (typeof singlePosts.postStack[singlePosts.currentlyDisplayedItemIndex] !== 'object' || typeof singlePosts.postStack[singlePosts.currentlyDisplayedItemIndex].permalink !== 'string') {
        return false;
      }

      // console.log(`currentlyDisplayedItemIndex==${currentlyDisplayedItemIndex}`);
      // console.log(`singlePosts.poststack[${singlePosts.currentlyDisplayedItemIndex}].permalink==${singlePosts.postStack[singlePosts.currentlyDisplayedItemIndex].permalink}`);
      const doesCurrentItemMatchCurrentAddressYet = currentLocationPath === singlePosts.postStack[singlePosts.currentlyDisplayedItemIndex].permalink;
      // // console.log(`doesCurrentItemMatchCurrentAddressYet==${doesCurrentItemMatchCurrentAddressYet}`);
      return doesCurrentItemMatchCurrentAddressYet;
    }

  }
);

const selectLeaderboardSafety = () => createSelector(
  selectGlobal,
  (globalState) => {
    return globalState.get('leaderboardSafety')
  }
);
const selectLeaderboardTimerSafety = () => createSelector(
  selectGlobal,
  (globalState) => {
    return globalState.get('leaderboardTimerSafety')
  }
);

const selectLeaderboardContentCycleSafety = () => createSelector(
  selectGlobal,
  (globalState) => {
    return globalState.get('leaderboardContentCycleSafety')
  }
);
const selectAllAdsContentCycleSafety = () => createSelector(
  selectGlobal,
  (globalState) => {
    return globalState.get('allAdsContentCycleSafety')
  }
);


const selectLastLeaderboardFired = () => createSelector(
  selectGlobal,
  (globalState) => {
    return globalState.get('lastLeaderboardFired')
  }
);

export {
  selectCurrentLeaderboardIndex,
  selectLeaderboardsInViewport,
  selectAds,
  selectAdStack,
  selectLeaderboard,
  selectID,
  selectSizes,
  selectMobileInterstitial,
  selectMobileInterstitialID,
  selectMobileInterstitialSizes,
  makeSelectDoesCurrentItemMatchCurrentAddressYet,
  selectLeaderboardSafety,
  selectLeaderboardTimerSafety,
  selectLeaderboardContentCycleSafety,
  selectAllAdsContentCycleSafety,
  selectLastLeaderboardFired,
};
