/*
 *
 * SinglePostPage actions
 *
 */

import {
  DEFAULT_ACTION,
  LOAD_POSTDATA,
  LOAD_POSTDATA_SUCCESS,
  LOAD_POSTDATA_ERROR,

  SET_CURRENTLYDISPLAYEDITEMINDEX,
  SET_CURRENTLYDISPLAYEDITEMINDEXWAYPOINTINITIATED,
  RESET_CURRENTLYDISPLAYEDITEMINDEXWAYPOINTINITIATED,
  UPDATE_WINDOW_SCROLL_POSITION,
  SCROLLING_ADDRESS_CHANGE,
  AUTOSCROLLTOPOST,
  ZERO_POSTSTACK,
  DEDUCE_CURRENTLYDISPLAYED_ITEMINDEX,


  ARRIVINGFORFIRSTTIME,
  ADD_WAYPOINTTOVIEWPORT,
  REMOVE_WAYPOINTFROMVIEWPORT,
  SET_CURRENTPOSTSTACKDISPLAYDATA,
  BOTTOMOFSTACKREACHED,
  SET_FORCE_RENDER,
  SET_DISPLAYEDPOSTSTACK,
} from './constants';

/**
 * Load the post, this action starts the request saga
 *
 * @return {object} An action object with a type of LOAD_POSTDATA
 */
export function loadPostData(id) {
  // // console.log('loadPostData('+categorySlug+', '+postSlug+')');
  return {
    type: LOAD_POSTDATA,
    id,
  };
}
/**
 * Dispatched when the post is loaded by the request saga
 *
 * @return {object}      An action object with a type of LOAD_POSTDATA_SUCCESS passing the data of the response
 */
export function postDataLoaded(data) {
  // // console.log('postDataLoaded()');
  // // console.log(data);
  return {
    type: LOAD_POSTDATA_SUCCESS,
    data,
  };
}
/**
 * Dispatched when loading the post fails
 *
 * @param  {object} error The error
 *
 * @return {object}       An action object with a type of LOAD_POSTDATA_ERROR passing the error
 */
export function postDataLoadingError(error) {
  return {
    type: LOAD_POSTDATA_ERROR,
    error,
  };
}


export function setCurrentlyDisplayedItemIndex(itemIndex, waypointInitiated = false, id) {
  // // console.log('setCurrentlyDisplayedItemIndex('+itemIndex+')')
  return {
    type: SET_CURRENTLYDISPLAYEDITEMINDEX,
    itemIndex,
    waypointInitiated,
    id,
  };
}
export function setCurrentlyDisplayedItemIndexWaypointInitiated(waypointInitiated = false) {
  // console.log('setCurrentlyDisplayedItemIndexWaypointInitiated('+waypointInitiated+')')
  return {
    type: SET_CURRENTLYDISPLAYEDITEMINDEXWAYPOINTINITIATED,
    waypointInitiated,
  };
}

export function arrivingForFirstTime() {
  return {
    type: ARRIVINGFORFIRSTTIME,

  };
}
export function resetCurrentlyDisplayedItemIndexWaypointInitiated(waypointInitiated = null) {
  return {
    type: RESET_CURRENTLYDISPLAYEDITEMINDEXWAYPOINTINITIATED,
    waypointInitiated,
  }
}

export function addWaypointToViewport(index, current) {
  return {
    type: ADD_WAYPOINTTOVIEWPORT,
    index,
    current,
  }
}
export function removeWaypointFromViewport(index) {
  return {
    type: REMOVE_WAYPOINTFROMVIEWPORT,
    index,
  }
}
// dispatch(setCurrentPostStackDisplayData(farthestDownIndex, [...waypointsInViewport, waypointIndex]));// current, inViewportWaypoints,
export function setCurrentPostStackDisplayData(current, inViewportWaypoints) {
  console.log(`setCurrentPostStackDisplayData`, current, inViewportWaypoints);
  return {
    type: SET_CURRENTPOSTSTACKDISPLAYDATA,
    current,
    inViewportWaypoints,
  }
}

export function bottomOfStackReached() {
  return {
    type: BOTTOMOFSTACKREACHED,
  }
}

export function setForceRender(forceRender) {
  // console.log(`setForceRender(${forceRender})`);
  return {
    type: SET_FORCE_RENDER,
    forceRender,
  }

}

export function updateWindowScrollPosition (scrollTop) {
  // console.log('SinglePostPage action: updateWindowScrollPosition');
  return {
    type: UPDATE_WINDOW_SCROLL_POSITION,
    scrollTop,
  };
}
export function scrollingAddressChange(address) {
  return {
    type: SCROLLING_ADDRESS_CHANGE,
    address,
  };
}

export function autoScrollingToPost(autoScrollToPost) {

  return {
    type: AUTOSCROLLTOPOST,
    autoScrollToPost,
  };
}
export function zeroPostStack() {
  // console.log('zeroPostStack');
  return {
    type: ZERO_POSTSTACK,
  };
}
export function deduceCurrentlyDisplayedItemIndex() {
  return {
    type: DEDUCE_CURRENTLYDISPLAYED_ITEMINDEX,
  };
}
// export function setLeaderBoardIndex(leaderboardIndex) {
//   return {
//     type: SET_LEADERBOARDINDEX,
//     leaderboardIndex,
//   };
// }

export function setDisplayedPostStack(postIDs) {
  return {
    type: SET_DISPLAYEDPOSTSTACK,
    postIDs,
  };
}

export function defaultAction() {
  return {
    type: DEFAULT_ACTION,
  };
}
