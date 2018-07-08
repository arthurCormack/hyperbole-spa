/*
 *
 * HoroscopesPage actions
 *
 */

import {
  DEFAULT_ACTION,
  TRIGGER_LOAD_HOROSCOPES,
  LOAD_HOROSCOPES,
  LOAD_HOROSCOPES_SUCCESS,
  LOAD_HOROSCOPES_FAILURE,
  ZERO_HOROSCOPES
} from './constants';

//loadHoroscopesData, horoscopesDataLoaded, horoscopesDataLoadingFailure

// export const TRIGGER_LOAD_HOROSCOPES = 'app/HoroscopesPage/TRIGGER_LOAD_HOROSCOPES';
// export const LOAD_HOROSCOPES = 'app/HoroscopesPage/LOAD_HOROSCOPES';// is this the trigger, or the thing that we call right before? does the saga need to do it,
// export const LOAD_HOROSCOPES_SUCCESS = 'app/HoroscopesPage/LOAD_HOROSCOPES_SUCCESS';
// export const LOAD_HOROSCOPES_FAILURE = 'app/HoroscopesPage/LOAD_HOROSCOPES_FAILURE';
// export const ZERO_HOROSCOPES = 'app/HoroscopesPage/ZERO_HOROSCOPES';


export function  triggerLoadHoroscopes() {
  return {
    type: TRIGGER_LOAD_HOROSCOPES,
  }
}
export function loadHoroscopesData() {
  return {
    type: LOAD_HOROSCOPES,
  }
}
export function horoscopesDataLoaded(data) {
  return {
    type: LOAD_HOROSCOPES_SUCCESS,
    data,
  }
}
export function horoscopesDataLoadingFailure() {
  return {
    type: LOAD_HOROSCOPES_FAILURE,

  }
}
export function zeroHoroscopes() {
  return {
    type: ZERO_HOROSCOPES,

  }
}

export function defaultAction() {
  return {
    type: DEFAULT_ACTION,
  };
}
