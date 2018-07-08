import { fromJS } from 'immutable';
import { combineReducers } from 'redux-immutable';
import { SET_SIDEBARINDEX, SET_SIDEBAR_DISPLAYDATA, START_ADREFRESHTIMER, AD_SIDEBAR_JUSTFIRED, SET_SIDEBAR_TIMERSAFETY, SET_SIDEBAR_CONTENTSAFETY, SET_SIDEBARSAFETY } from './constants';

export function sidebarIndex(state = false, action) {
  switch (action.type) {
    case SET_SIDEBARINDEX:
      return action.leaderboardIndex;
    case SET_SIDEBAR_DISPLAYDATA:
      return action.current;
    default:
      return state;
  }
}

export function sidebarsInViewport(state = [], action) {
  switch (action.type) {
    case SET_SIDEBAR_DISPLAYDATA:
      return [...action.inViewportWaypoints];
    default:
      return state;
  }
}

export function sidebarSafety(state = false, action) {
  switch (action.type) {
    case SET_SIDEBARSAFETY:
      return action.isSafe;
    default:
      return state;
  }
}

export function sidebarTimerSafety(state = false, action) {
  switch (action.type) {
    case SET_SIDEBAR_TIMERSAFETY:
      return action.isSafe;
    default:
      return state;
  }
}

export function sidebarContentCycleSafety(state = false, action) {
  switch (action.type) {
    case SET_SIDEBAR_CONTENTSAFETY:
      return action.isSafe;
    default:
      return state;
  }
}

export function lastSidebarFired(state = false, action) {
  switch (action.type) {
    case AD_SIDEBAR_JUSTFIRED:
      return action.index;
    default:
      return state;
  }
}

export default combineReducers(
  sidebarIndex,
  sidebarsInViewport,
  sidebarSafety,
  sidebarTimerSafety,
  sidebarContentCycleSafety,
  lastSidebarFired,
);
