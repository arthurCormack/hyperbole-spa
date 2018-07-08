/*
 *
 * HoroscopesPage reducer
 *
 */

import { fromJS } from 'immutable';
import {
  DEFAULT_ACTION,
  LOAD_HOROSCOPES,
  LOAD_HOROSCOPES_SUCCESS,
  LOAD_HOROSCOPES_FAILURE,
  
} from './constants';

const initialState = fromJS({
  loading: false,
  error: false,
  horoscopes: null,
  date: null,
  title: null,
  link: null,
});

// export const LOAD_HOROSCOPES = 'app/HoroscopesPage/LOAD_HOROSCOPES';// is this the trigger, or the thing that we call right before? does the saga need to do it,
// // or can it be called from the componentDidMount; is it redundant / unnessecary for both the compoonentDidMount to dispatch a trigger,
// // and for the saga to also dispatch an action that is really nothing more than an announcement that the call is taking place immediedately afterwards?
// // maybe it does make sense to have both? it might be more versatile?
// export const LOAD_HOROSCOPES_SUCCESS = 'app/HoroscopesPage/LOAD_HOROSCOPES_SUCCESS';
// export const LOAD_HOROSCOPES_FAILURE = 'app/HoroscopesPage/LOAD_HOROSCOPES_FAILURE';

function horoscopesPageReducer(state = initialState, action) {
  switch (action.type) {
    case DEFAULT_ACTION:
      return state;
    case LOAD_HOROSCOPES:
      return state
      .set('loading', true)
      .set('error', false);

    case LOAD_HOROSCOPES_SUCCESS:
      return state
      .set('loading', false)
      .set('error', false)
      .set('horoscopes', action.data.horoscopes)
      .set('date', action.data.pubDate)
      .set('title', action.data.pubTitle)
      .set('link', action.data.pubLink);
    case LOAD_HOROSCOPES_FAILURE:
      return state
      .set('loading', false)
      .set('error', true);

    default:
      return state;
  }
}

export default horoscopesPageReducer;
