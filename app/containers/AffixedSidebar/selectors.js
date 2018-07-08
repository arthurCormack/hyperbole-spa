// import { selectActive, selectSidebarIndex } from './selectors';

import { createSelector } from 'reselect';
import { selectGlobal } from 'containers/App/selectors';
import { selectCurrentlyDisplayedItemPostID } from 'containers/SinglePostPage/selectors';

const selectCurrentSidebarIndex = () => createSelector(
  selectGlobal,
  (globalState) => globalState.get('sidebarIndex')
);

// const selectIsActive = (index) => {
//
// }
// const selectIsActive = ( index ) => {
//   index === props.currentSidebarIndex ? true : false;
// }

const selectIsActive = (index) => createSelector(
  selectCurrentSidebarIndex, (currentSidebarIndex, index) => index === selectCurrentSidebarIndex ? true : false
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

const selectWPRequest = () => createSelector(
  selectGlobal,
  (globalState) => {
    // console.log(`selectWPRequest`, globalState);
    return globalState.get('wp_request');
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

const selectID = () => createSelector(
  selectTower(),
  (tower) => {
    // // console.log('selectID()');
    if (tower === null ) {
      return null;
    } else {
      return tower.id;
    }
  }

);
const selectSizes = () => createSelector(
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

// selectSidebarsInViewport
const selectSidebarsInViewport = () => createSelector(
  selectGlobal,
  (globalState) => globalState.get('sidebarsInViewport')
);

const selectLastSidebarFired = () => createSelector(
  selectGlobal,
  (globalState) => globalState.get('lastSidebarFired')
);

export {
  selectCurrentSidebarIndex,
  selectIsActive,
  selectAds,
  selectAdStack,
  selectTower,
  selectID,
  selectSizes,
  selectSidebarsInViewport,
  selectLastSidebarFired,
};
