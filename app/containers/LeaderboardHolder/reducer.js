// leaderboardIndex, leaderboardsInViewport, leaderboardSafety, leaderboardTimerSafety, leaderboardContentCycleSafety, lastLeaderboardFired


/*
 * Leaderboard Holder's reducers
 *
 *
 */


import { fromJS } from 'immutable';
import { combineReducers } from 'redux-immutable';
import { SET_LEADERBOARDINDEX, SET_LEADERBOARD_DISPLAYDATA, START_ADREFRESHTIMER, AD_LEADERBOARD_JUSTFIRED, SET_LEADERBOARD_TIMERSAFETY, SET_LEADERBOARD_CONTENTSAFETY, SET_LEADERBOARDSAFETY } from './constants';

export function leaderboardIndex(state = false, action) {
  switch (action.type) {
    case SET_LEADERBOARDINDEX:
      return action.leaderboardIndex;
    case SET_LEADERBOARD_DISPLAYDATA:
      return action.current;
    default:
      return state;
  }
}

export function leaderboardsInViewport(state = [], action) {
  switch (action.type) {
    case SET_LEADERBOARD_DISPLAYDATA:
      return [...action.inViewportWaypoints];
    default:
      return state;
  }
}

export function leaderboardSafety(state = false, action) {
  switch (action.type) {
    case SET_LEADERBOARDSAFETY:
      return action.isSafe;
    default:
      return state;
  }
}

export function leaderboardTimerSafety(state = false, action) {
  switch (action.type) {
    case SET_LEADERBOARD_TIMERSAFETY:
      return action.isSafe;
    default:
      return state;
  }
}

export function leaderboardContentCycleSafety(state = false, action) {
  switch (action.type) {
    case SET_LEADERBOARD_CONTENTSAFETY:
      return action.isSafe;
    default:
      return state;
  }
}

export function lastLeaderboardFired(state = false, action) {
  switch (action.type) {
    case AD_LEADERBOARD_JUSTFIRED:
      return action.index;
    default:
      return state;
  }
}

export default combineReducers(
  leaderboardIndex,
  leaderboardsInViewport,
  leaderboardSafety,
  leaderboardTimerSafety,
  leaderboardContentCycleSafety,
  lastLeaderboardFired,
);
