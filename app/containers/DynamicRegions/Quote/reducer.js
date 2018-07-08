import { LOAD_HOMEQUOTE, LOAD_HOMEQUOTE_SUCCESS, LOAD_HOMEQUOTE_FAILURE } from './constants';

import { List, fromJS } from 'immutable';

const initialState = fromJS({});
export default function homeQuoteReducer(state = initialState, action) {
  switch (action.type){
    case LOAD_HOMEQUOTE:
      // return state.set('homeQuote', 'pending');// unequivocal. not 0 or null, but something specically, which can only mean, that we are waiting for it.
      // return state.set('homeQuote', 'pending');// unequivocal. not 0 or null, but something specically, which can only mean, that we are waiting for it.
      return 'pending';
    case LOAD_HOMEQUOTE_SUCCESS:
      // return state
        // .set('homeQuote', action.data);
        return action.data;
      // return state.setIn(['dynamicRegions', 'homeQuote'], action.data);// unequivocal. not 0 or null, but something specically, which can only mean, that we are waiting for it.

      // .set('ads', action.data.ads) // ads all get handled, at the App reducer. All of them.
      // .set('wp_request', {type: 'home'});
    case LOAD_HOMEQUOTE_FAILURE:
      return false;
        // .set('homeQuote', action.data);
    default:
      return state;
  }
}
