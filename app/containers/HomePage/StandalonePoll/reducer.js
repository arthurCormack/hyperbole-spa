/*
 *
 * RadioDisplay reducer
 *
 */

import { fromJS } from 'immutable';

import {
  DEFAULT_ACTION, TRIGGER_GETPOLLMARKUP, LOAD_POLLMARKUP, LOAD_POLLMARKUP_SUCCESS, LOAD_POLLMARKUP_FAILURE, ZERO_POLLMARKUP,
} from './constants';

const initialState = fromJS({});

function standalonePollReducer(state = initialState, action) {
  switch (action.type) {
    case DEFAULT_ACTION:
      return state;
    case LOAD_POLLMARKUP_SUCCESS:
      // console.log(`standalonePollReducer::LOAD_POLLMARKUP_SUCCESS`);
      return state
        .setIn(['dynamicRegions', 'standalonePoll'], action.pollMarkup);
    case ZERO_POLLMARKUP:
      // console.log(`standalonePollReducer::ZERO_POLLMARKUP`);
      return state
        .setIn(['dynamicRegions', 'standalonePoll'], 1);//Zero'ing it takes a slightly new meaning. the markup disappears, but the thing that is left in its place is not a 0, its a one, to indicate that it had been there. Be sure to dangerously set befor zero'ing.
    default:
      return state;
  }
}

export default standalonePollReducer;
