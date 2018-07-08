import { createSelector } from 'reselect';

import { makeSelectLocationState, makeSelectLoading } from 'containers/App/selectors';
/**
 * Direct selectors to the singlePosts state stuff
 */

 const selectGlobal = () => (state) => {
   return state.get('global').toJS();
 }


const selectSinglePosts = () => (state) => {
  // // console.log('selectSinglePosts')
  // // console.log(state.get('singlePosts'));
  if (typeof state === 'undefined') {
    return null;
  }
  const someSinglePosts = state.get('singlePostPage');
  if (typeof someSinglePosts === 'undefined') return false;
  return state.get('singlePostPage').toJS();
}
// comment

const selectPostStack = () => createSelector(
  selectSinglePosts(),
  (singlePosts) => {
    if (!singlePosts) return false;
    // // console.log('selectPostStack()');
    // // console.log(singlePosts.postStack);
    if (typeof singlePosts.postStack !== 'undefined') {
      return singlePosts.postStack;
    }
    return null;
  }
);

const selectWaypointsInViewport = () => createSelector(
  selectSinglePosts(),
  (singlePosts) => {
    // if (!singlePosts) return false;
    // // console.log('selectPostStack()');
    // // console.log(singlePosts.postStack);
    if (typeof singlePosts.waypointsInViewport !== 'undefined') {
      return singlePosts.waypointsInViewport;
    }
    return null;
  }
);

const selectCurrentlyDisplayedItemIndex = () => createSelector(
  selectSinglePosts(),
  (singlePosts) => {
    if (!singlePosts) return false;
    //// console.log(`selectCurrentlyDisplayedItemIndex()::${singlePosts.currentlyDisplayedItemIndex}`);
    // if ( singlePosts === null ) return null;
    // if (typeof singlePosts.postStack === 'object' && singlePosts.postStack !== null && singlePosts.postStack.length > 0) {
    //   if (singlePosts.currentlyDisplayedItemIndex === null || typeof singlePosts.currentlyDisplayedItemIndex === 'undefined') {
    //     return 0;// !!!
    //   } else {
    //     return singlePosts.currentlyDisplayedItemIndex;
    //   }
    // }
    return singlePosts.currentlyDisplayedItemIndex;
  }
);

const selectArrivedForFirstTime = () => createSelector(
  selectSinglePosts(),
  (singlePosts) => {
    if (singlePosts === null) return null;
    return singlePosts.arrivedForFirstTime;
  }
);

const selectCurrentlyDisplayedItemIndexWaypointInitiated = () => createSelector(
  selectSinglePosts(),
  (singlePosts) => {
    // // console.log(`selectCurrentlyDisplayedItemIndexWaypointInitiated()::${singlePosts.currentlyDisplayedItemIndexWaypointInitiated}`);
    return singlePosts.currentlyDisplayedItemIndexWaypointInitiated;
  }
);

const selectCurrentlyDisplayedItem = () => createSelector(
  selectPostStack(),
  selectCurrentlyDisplayedItemIndex(),
  (postStack, currentItemIndex) => {
    // // console.log('selectCurrentlyDisplayedItem('+postStack+', ' + currentItemIndex + '), ');
    if (postStack !== null && postStack.length > 0 && currentItemIndex !== null) {
      return typeof postStack[currentItemIndex] === 'undefined' ? null : postStack[currentItemIndex];
      //return null;
    } else {
      return null;
    }
  }
);
const selectCurrentlyDisplayedItemPostTitle = () => createSelector(
  selectCurrentlyDisplayedItem(),
  (currentItem) => {
    // // console.log('selectCurrentlyDisplayedItemPostTitle()');
    // return currentItem === null || typeof currentItem.post_title !== 'undefined' ? null : currentItem.post_title;
    // return null;
    if (currentItem === null) return null;
    return currentItem.post_title;
  }
);
const selectCurrentlyDisplayedItemExcerpt = () => createSelector(
  selectCurrentlyDisplayedItem(),
  (currentItem) => {
    if (currentItem === null) {
      return null;
    }
    return currentItem.excerpt;
  }
);

const selectCurrentlyDisplayedItemFeaturedImage = () => createSelector(
  selectCurrentlyDisplayedItem(),
  (currentItem) => {
    // a quick check to make sure that the thumbnails are actually there before we try to return them. avoid the error of accessing a possibly non-existant thing
    if (currentItem === null) return null;

    let someFeaturedImage = null;
    // if ( typeof currentItem.thumbnails['large'] === 'object') {
    //   someFeaturedImage = currentItem.thumbnails['large'][0];
    // }
    if ( typeof currentItem.thumbnail_medium === 'object' && currentItem.thumbnail_medium !== null) {
      someFeaturedImage = currentItem.thumbnail_medium;
    }
    return someFeaturedImage;
  }
);

const selectCurrentlyDisplayedItemFeaturedImageSrc = () => createSelector(
  selectCurrentlyDisplayedItem(),
  (currentItem) => {
    // a quick check to make sure that the thumbnails are actually there before we try to return them. avoid the error of accessing a possibly non-existant thing
    if (currentItem === null) return null;

    let someFeaturedImage = null;
    // if ( typeof currentItem.thumbnails['large'] === 'object') {
    //   someFeaturedImage = currentItem.thumbnails['large'][0];
    // }
    if ( typeof currentItem.thumbnail_medium === 'object' && currentItem.thumbnail_medium !== null) {
      someFeaturedImage = currentItem.thumbnail_medium.src;
    }
    return someFeaturedImage;
  }
);

const selectCurrentlyDisplayedItemPermalink = () => createSelector(
  selectCurrentlyDisplayedItem(),
  (currentItem) => currentItem === null ? null : currentItem.permalink
);

const selectCurrentlyDisplayedItemPostID = () => createSelector(
  selectCurrentlyDisplayedItem(),
  (currentItem) => currentItem === null ? null : currentItem.id
);

const selectNextItem = () => createSelector(
  selectSinglePosts(),
  (someSinglePosts) => someSinglePosts.nextItem
);

const selectNextItemPermalink = () => createSelector(
  selectNextItem(),
  (nextItem) => {
    if (nextItem === null) return null;
    return nextItem.permalink;
  }
);
const selectNextItemID = () => createSelector(
  selectNextItem(),
  (nextItem) => {
    if (nextItem === null) return null;
    return nextItem.id;
  }
);
const selectLoading = () => createSelector(
  selectSinglePosts(),
  (singlePosts) => {
    // // console.log(`selectSinglePosts()`);
    if (singlePosts == null) {
      return null;
    }
    // const isLoading = singlePosts.loading;
    return singlePosts.loading;
  }
);

const selectError = () => createSelector(
  selectSinglePosts(),
  (singlePosts) => {
    // // console.log(`selectError()`);
    if (singlePosts == null) {
      return null;
    }
    // const isLoading = singlePosts.loading;
    return singlePosts.error;
  }
);

const selectStoredScrollTop = () => createSelector(
  selectSinglePosts(),
  (singlePosts) => {
    // // console.log(`selectStoredScrollTop()`);
    return singlePosts.storedScrollTop;
  }
);
const selectIsScrollingAddressChange = () => createSelector(
  selectSinglePosts(),
  (singlePosts) => {
    // // console.log(`selectIsScrollingAddressChange()`);
    return singlePosts.scrollingAddressChange;
  }
);
const selectAutoScrollingToPost = () => createSelector(
  selectSinglePosts(),
  (singlePosts) => {
    // // console.log(`selectAutoScrollingToPost`);
    return singlePosts.autoScrollingToPost;
  }
);

// const selectLeaderboardIndex = () => createSelector(
//   selectSinglePosts(),
//   (singlePosts) => {
//     // console.log(`selectLeaderboardIndex`);
//     return singlePosts.leaderboardIndex;
//   }
// );


const selectWPRequest = () => createSelector(
  selectGlobal(),
  (globalState) => globalState.wp_request
);
const selectPostID = () => createSelector(
  selectWPRequest(),
  (wpRequest) => {
    // // console.log(`selectPostID()`);
    return wpRequest.id;
  }
);

const selectForceRender = () => createSelector(
  selectSinglePosts(),
  (singlePosts) => {
    return singlePosts.forceRender;
  }
);
const makeSelectDoesCurrentItemMatchCurrentAddressYet = () => createSelector(

  makeSelectLocationState(),
  selectCurrentlyDisplayedItemPermalink(),
  (locationState, currentItemPermalink) => {
    // return singlePosts.forceRender;

    const currentLocationPath = locationState.locationBeforeTransitions.pathname;

    // const currentItemsLocationPath =
    // console.log(`makeSelectDoesCurrentItemMatchCurrentAddressYet( ${currentLocationPath}, ${currentItemPermalink})`);
    // console.log(currentLocationPath);
    if (currentItemPermalink === currentLocationPath) {
      return true;
    } else {
      return false;
    }
  }
);

const selectFoundRoute = () => createSelector(
  selectSinglePosts(),
  (singlePosts) => {
    return singlePosts.foundRoute;
  }
);

const selectCurrentIDsOfItemsinPostStack = () => createSelector(
  selectPostStack(),
  (somePostStack) => {
    console.log(`selectCurrentIDsOfItemsinPostStack,`, somePostStack);
    // msg(somePostStack);
    let someIDs = [];
    somePostStack.forEach(
      (item, i) => {
        someIDs.push(item.id);
      }
    );
    return someIDs;
  }
);

const selectDisplayedPostIDs = () => createSelector(
  selectSinglePosts(),
  (singlePosts) => {
    return singlePosts.displayedPostStack;
  }
);

// selectDisplayedPosts uses
const selectDisplayedPostStack = () => createSelector(
  selectPostStack(),
  selectDisplayedPostIDs(),
  (somePostStack, someDisplayedPostIDs) => {
    // return just the items in somePostStack that have ids in someDisplayedPostIDs
    let somePosts = [];
    somePostStack.forEach(
      (item, i) => {
        if (someDisplayedPostIDs.indexOf(item.id) !== -1) {
          somePosts.push(item);
        }
      }
    );
    return somePosts;
  }
);

const selectPostIDsThatAreLoadedButNotYetDisplayed = () => createSelector(
  selectPostStack(),
  selectDisplayedPostIDs(),
  (somePostStack, someDisplayedPostIDs) => {
    // return just the items in somePostStack that are not in someDisplayedPostIDs
    let somePosts = [];
    somePostStack.forEach(
      (item, i) => {
        if (someDisplayedPostIDs.indexOf(item.id) === -1) {
          somePosts.push(item.id);
        }
      }
    );
    return somePosts;
  }
);

export default selectSinglePosts;
export {
  selectGlobal,
  selectSinglePosts,
  selectCurrentlyDisplayedItemIndex,
  selectCurrentlyDisplayedItemIndexWaypointInitiated,
  selectPostStack,
  selectCurrentlyDisplayedItem,
  selectCurrentlyDisplayedItemPostTitle,
  selectCurrentlyDisplayedItemExcerpt,
  selectCurrentlyDisplayedItemFeaturedImage,
  selectCurrentlyDisplayedItemFeaturedImageSrc,
  selectCurrentlyDisplayedItemPermalink,
  selectCurrentlyDisplayedItemPostID,
  selectNextItem,
  selectNextItemPermalink,
  selectNextItemID,
  selectLoading,
  selectError,
  selectStoredScrollTop,
  selectIsScrollingAddressChange,
  selectAutoScrollingToPost,
  selectWaypointsInViewport,
  selectArrivedForFirstTime,
  selectPostID,
  selectForceRender,
  makeSelectDoesCurrentItemMatchCurrentAddressYet,
  selectFoundRoute,
  selectCurrentIDsOfItemsinPostStack,
  selectDisplayedPostIDs,
  selectDisplayedPostStack,
  selectPostIDsThatAreLoadedButNotYetDisplayed,
};
