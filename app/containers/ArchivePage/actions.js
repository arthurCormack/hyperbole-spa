/*
 *
 * ArchivePage actions
 *
 */

import {
  DEFAULT_ACTION,
  LOAD_ARCHIVEDATA,
  LOAD_ARCHIVEDATA_SUCCESS,
  LOAD_ARCHIVEDATA_FAILURE,
  SET_CURRENTLYDISPLAYEDCHUNKINDEX,
  SET_CURRENTLYDISPLAYEDCHUNKDATA,
  UPDATE_WINDOW_SCROLL_POSITION,
  SCROLLING_ADDRESS_CHANGE,
  AUTOSCROLLTOPOST,
  ZERO_ARCHIVESTACK,
  DEDUCE_CURRENTLYDISPLAYED_ITEMINDEX,
  SET_LEADERBOARDINDEX,
  SAVE_INITIALPAGENUMBER,
  SET_FORCE_RENDER,
  BOTTOMOFSTACKREACHED,
} from './constants';

import { msg } from 'utils/msg';


export function loadArchiveData(termSlug) {
  
  return {
    type: LOAD_ARCHIVEDATA,
    termSlug,
  };
}
/**
 * Dispatched when the archive is loaded by the request saga
 *
 * @return {object}      An action object with a type of LOAD_POSTDATA_SUCCESS passing the data of the response
 */
export function archiveDataLoaded(data) {
  // // console.log('postDataLoaded()');
  // // console.log(data);
  return {
    type: LOAD_ARCHIVEDATA_SUCCESS,
    data,
  };
}
/**
 * Dispatched when loading the archive fails
 *
 * @param  {object} error The error
 *
 * @return {object}       An action object with a type of LOAD_POSTDATA_ERROR passing the error
 */
export function archiveDataLoadingError(error) {
  return {
    type: LOAD_ARCHIVEDATA_FAILURE,
    error,
  };
}


export function setCurrentlyDisplayedChunkIndex(chunkIndex) {
  // // console.log('setCurrentlyDisplayedItemIndex('+itemIndex+')')
  return {
    type: SET_CURRENTLYDISPLAYEDCHUNKINDEX,
    chunkIndex,
  }
}
export function setCurrentChunkStackDisplayData(current, inViewportWaypoints) {
  msg(`setCurrentChunkStackDisplayData(${current}, [${inViewportWaypoints}])`);
  return {
    type: SET_CURRENTLYDISPLAYEDCHUNKDATA,
    current,
    inViewportWaypoints,
  }
}
export function updateWindowScrollPosition (scrollTop) {
  // console.log('SinglePostPage action: updateWindowScrollPosition');
  return {
    type: UPDATE_WINDOW_SCROLL_POSITION,
    scrollTop,
  }
}
export function saveInitialPageNumber(page) {
  return {
    type: SAVE_INITIALPAGENUMBER,
    page,
  };
}

export function scrollingAddressChange(address) {
  return {
    type: SCROLLING_ADDRESS_CHANGE,
    address,
  }
}

export function autoScrollingToPost(autoScrollToPost) {
  return {
    type: AUTOSCROLLTOPOST,
    autoScrollToPost,
  }
}
export function zeroArchiveStack() {
  // console.log('zeroArchiveStack');
  return {
    type: ZERO_ARCHIVESTACK,
  }
}
export function deduceCurrentlyDisplayedItemIndex() {
  return {
    type: DEDUCE_CURRENTLYDISPLAYED_ITEMINDEX,
  }
}
export function setLeaderBoardIndex(leaderboardIndex) {
  return {
    type: SET_LEADERBOARDINDEX,
    leaderboardIndex,
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

export function defaultAction() {
  return {
    type: DEFAULT_ACTION,
  };
}
