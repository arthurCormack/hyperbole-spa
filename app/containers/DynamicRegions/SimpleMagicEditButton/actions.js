/*
 *
 * SimpleMagicEditButton actions
 *
 */

import {
  DEFAULT_ACTION,
  SET_WPUSERDATA,
} from './constants';




export function defaultAction() {
  return {
    type: DEFAULT_ACTION,
  };
}

export function setWPUserData(wp_userdata = {}) {

  return {
    type: SET_WPUSERDATA,
    wp_userdata,
  }
}
