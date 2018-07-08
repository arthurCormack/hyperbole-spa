/*
 *
 * StandaloneAdminMenu actions
 *
 */

import {
  DEFAULT_ACTION,
  TRIGGER_LOADPOLLMARKUP,
  LOAD_POLLMARKUP,
  LOAD_POLLMARKUP_SUCCESS,
  LOAD_POLLMARKUP_FAILURE,
  ZERO_POLLMARKUP,
} from './constants';


export function triggerLoadPollMarkup() {// we don't need to pass anything along here, at this point
  // // console.log('triggerGetAdminMenuMarkup action!');
  return {
    type: TRIGGER_LOADPOLLMARKUP,
  }
}

// //loadAdminMenuMarkup, adminMenuMarkupLoaded, adminMenuMarkupFailure
export function loadPollMarkup() {
  return {
    type: LOAD_POLLMARKUP,
  }
}
//
export function loadPollMarkupSuccess(pollMarkup) {
  // console.log('LoadPollMarkupSuccess action here');
  return {
    type: LOAD_POLLMARKUP_SUCCESS,
    pollMarkup,
  }
}
//
export function loadPollMarkupFailure(error) {
  return {
    type: LOAD_POLLMARKUP_FAILURE,
    error,
  }
}

export function zeroPollMarkup() {
  // after the container has dangerouslySetInnerHTML'd the poll markup into an iframe, we don't need it sticking around in state any longer.
  //
  return {
    type: ZERO_POLLMARKUP,
  }
}

export function defaultAction() {
  return {
    type: DEFAULT_ACTION,
  };
}
