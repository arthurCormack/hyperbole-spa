/*
 * App Actions
 *
 * Actions change things in your application
 * Since this boilerplate uses a uni-directional data flow, specifically redux,
 * we have these actions which are the only way your application interacts with
 * your appliction state. This guarantees that your state is up to date and nobody
 * messes it up weirdly somewhere.
 *
 * To add a new Action:
 * 1) Import your constant
 * 2) Add a function like this:
 *    export function yourAction(var) {
 *        return { type: YOUR_ACTION_CONSTANT, var: var }
 *    }
 */

import {

  LOAD_POSTDATA,
  LOAD_POSTDATA_SUCCESS,
  LOAD_POSTDATA_ERROR,
  LOAD_ARCHIVEDATA,
  LOAD_ARCHIVEDATA_SUCCESS,
  LOAD_ARCHIVEDATA_FAILURE,
  LOAD_NEXTPOSTINTOSTACK,
  UPDATE_WINDOW_SCROLL_POSITION,
  SET_SIDEBARINDEX,
  SET_LEADERBOARDINDEX,

  SET_SIDEBAR_DISPLAYDATA,
  SET_LEADERBOARD_DISPLAYDATA,
  START_ADREFRESHTIMER,

  NEWSLETTER_SUBSCRIPTION_SIGNUP,
  NEWSLETTER_SUBSCRIPTION_SIGNUP_DONE,

  ACTIVATE_GENERAL_WAYPOINT_SLEEP_TIMEOUT,
  DEACTIVATE_GENERAL_WAYPOINT_SLEEP_TIMEOUT,

  SET_SCROLLTOP,

  CLEAR_CAARDD,
  SET_CAARDD,
  CREATE_CB,
  SET_ALLADS_CONTENTCYCLESAFETY,
} from './constants';


export function loadNextPostIntoStack() {
  // we don't need to pass in the next url path into here, becasue we arleady have it available in state. it is/was pre-determined!
  // // console.log('loadNextPostIntoStack()');
  return {
    type: LOAD_NEXTPOSTINTOSTACK,
  }
}
export function updateWindowScrollPosition (scrollTop) {
  // console.log(`updateWindowScrollPosition(${scrollTop})`);
  return {
    type: UPDATE_WINDOW_SCROLL_POSITION,
    scrollTop,
  }
}

export function scrollingAddressChange (address) {
  return {
    type: SCROLLING_ADDRESS_CHANGE,
    address,
  }
}

export function newsletterSignupAPICall(values) {
  return {
    type: NEWSLETTER_SUBSCRIPTION_SIGNUP,
    values,
  };
}

export function newsletterSignupSubscriptionDone(data) {
  return {
    type: NEWSLETTER_SUBSCRIPTION_SIGNUP_DONE,
    data,
  };
}

/*
export const ACTIVATE_GENERAL_WAYPOINT_SLEEP_TIMEOUT = 'app/App/ACTIVATE_GENERAL_WAYPOINT_SLEEP_TIMEOUT';
export const DEACTIVATE_GENERAL_WAYPOINT_SLEEP_TIMEOUT = 'app/App/DEACTIVATE_GENERAL_WAYPOINT_SLEEP_TIMEOUT';
*/
export function activateGeneralWaypointSleepTimeout(duration = null) {// if duration is null, then we will use default duration instead
  return {
    type: ACTIVATE_GENERAL_WAYPOINT_SLEEP_TIMEOUT,
    duration,
  };
}

export function deActivateGeneralWaypointSleepTimeout(duration = null) {// if duration is null, then we will use default duration instead
  return {
    type: DEACTIVATE_GENERAL_WAYPOINT_SLEEP_TIMEOUT,

  };
}

export function setScrollTop(scrollTop) {
  return {
    type: SET_SCROLLTOP,
    scrollTop,
  }
}
export function createCB(cb) {
  return {
    type: CREATE_CB,
    cb,
  }
}
export function setAllAdsContentCycleSafety(isSafe) {
  return {
    type: SET_ALLADS_CONTENTCYCLESAFETY,
    isSafe,
  }
}
