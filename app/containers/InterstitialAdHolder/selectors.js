// import { selectActive, selectSidebarIndex } from './selectors';

import { createSelector } from 'reselect';
import { selectGlobal } from 'containers/App/selectors';
import { makeSelectLocationState, makeSelectLoading } from 'containers/App/selectors';
import { selectCurrentlyDisplayedItemPostID } from 'containers/SinglePostPage/selectors';


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

const selectWPRequest = () => createSelector(
  selectGlobal,
  (globalState) => {
    // console.log(`selectWPRequest`, globalState);
    return globalState.get('wp_request');
  }
);

const selectID = () => createSelector(
  selectInterstitial(),
  (interstitial) => {
    // // console.log('selectID()');
    if (interstitial === null ) {
      return null;
    } else {
      return interstitial.id;
    }
  }
);
const selectSizes = () => createSelector(
  selectInterstitial(),

  (interstitial) => {
    // // console.log('selectSizes()');
    if (interstitial === null ) {
      return null;
    } else {
      return interstitial.sizes;
    }
  }
);

const selectInterstitial = () => createSelector(
  selectAds(),
  (ads) => {
    if (!ads) return null;
    // console.log('selectInterstitial()');
    // console.log(ads.mobileInterstitial2);
    if (!ads.mobileInterstitial2) return null;
    return ads.mobileInterstitial2;
  }
);



const selectTower = () => createSelector(
  selectWPRequest(),
  selectAds(),
  selectAdStack(),
  selectCurrentlyDisplayedItemPostID(),
  (wp_request, ads, adStack, post_id) => {
    if (!ads) return null;
    if (!ads.bigbox) return null;
    if (wp_request.type === 'post') {
      if (!post_id) return null;
      let someAdStack = adStack;
      if (typeof adStack.toJS === 'function') someAdStack = adStack.toJS();
      return someAdStack[post_id].bigbox;
    }
    return ads.bigbox;
  }
);

const selectBigboxID = () => createSelector(
  selectTower(),
  (tower) => {
    if (tower === null ) {
      return null;
    } else {
      return tower.id;
    }
  }

);
const selectBigboxSizes = () => createSelector(
  selectTower(),
  (tower) => {
    // // console.log('selectSizes()');
    if (tower === null ) {
      return null;
    } else {
      return tower.sizes;
    }
  }
);





const selectLeaderboardSafety = () => createSelector(
  selectGlobal,
  (globalState) => {
    return globalState.get('leaderboardSafety')
  }
);


export {

  selectAds,
  selectID,
  selectSizes,
  selectBigboxID,
  selectBigboxSizes,
  selectInterstitial,
  selectLeaderboardSafety,

};
