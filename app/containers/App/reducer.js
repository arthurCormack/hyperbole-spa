/*
 * AppReducer
 *
 * The reducer takes care of our data. Using actions, we can change our
 * application state.
 * To add a new action, add it to the switch statement in the reducer function
 *
 * Example:
 * case YOUR_ACTION_CONSTANT:
 *   return state.set('yourStateVariable', true);
 */

import { combineReducers } from 'redux-immutable';
// import { reducer as burgerMenu } from 'redux-burger-menu';
import homeQuoteReducer from 'containers/DynamicRegions/Quote/reducer';// this is not actually being used!

import { leaderboardIndex, leaderboardsInViewport, leaderboardSafety, leaderboardTimerSafety, leaderboardContentCycleSafety, lastLeaderboardFired } from 'containers/LeaderboardHolder/reducer';

import { sidebarIndex, sidebarsInViewport, sidebarSafety, sidebarTimerSafety, sidebarContentCycleSafety, lastSidebarFired } from 'containers/AffixedSidebar/reducer';

import { LOAD_HOMESTART, LOAD_HOMESTART_SUCCESS, LOAD_HOMESTART_FAILURE } from 'containers/HomePage/constants';
import { LOAD_POSTDATA_SUCCESS } from 'containers/SinglePostPage/constants';
import { LOAD_ARCHIVEDATA_SUCCESS } from 'containers/ArchivePage/constants';
import { SET_WPUSERDATA } from 'containers/DynamicRegions/SimpleMagicEditButton/constants';

// need to add reducers / constants for all other adstuff for other routes, including adStack, which.

import {
  SET_ALLADS_CONTENTCYCLESAFETY,
} from './constants';

//   .set('wp_request', {type: 'home'});

function wp_request(state = false, action) {
    switch (action.type) {
      case LOAD_HOMESTART_SUCCESS:
        return { type: 'home' };
      default:
        return state;
    }
}

function wp_userdata(state = false, action) {
  switch (action.type) {
    case SET_WPUSERDATA:
      return action.wp_userdata;
    default:
      return state;
  }
}

function ads(state = false, action) {
  switch (action.type) {
    case LOAD_HOMESTART:
      return false;
    case LOAD_HOMESTART_SUCCESS:
      return action.data.ads;
    case LOAD_HOMESTART_FAILURE:
      return false;
    // we also need to be able to recieve ads from the other different content loads, like singlePostPage's getdatedpost call.
    case LOAD_POSTDATA_SUCCESS:
      // console.log(`App: LOAD_POSTDATA_SUCCESS`);
      return action.data.ads;
    case LOAD_ARCHIVEDATA_SUCCESS:
      return action.data.ads;
    default:
      return state;
  }
}

function allAdsContentCycleSafety(state = false, action) {
  switch (action.type) {
    case SET_ALLADS_CONTENTCYCLESAFETY:
      return action.isSafe;
    default:
      return state;
  }
}

export default combineReducers({
  dynamicRegions: combineReducers({
    homeQuote: homeQuoteReducer,
  }),
  wp_request,
  wp_userdata,
  ads,
  allAdsContentCycleSafety,
  leaderboardIndex,
  leaderboardsInViewport,
  leaderboardSafety,
  leaderboardTimerSafety,
  leaderboardContentCycleSafety,
  lastLeaderboardFired,
  sidebarIndex,
  sidebarsInViewport,
  sidebarSafety,
  sidebarTimerSafety,
  sidebarContentCycleSafety,
  lastSidebarFired,
});
