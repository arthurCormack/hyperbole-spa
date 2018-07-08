import { fromJS } from 'immutable';

import { LOAD_HOTTOPICS, LOAD_HOTTOPICS_SUCCESS, LOAD_HOTTOPICS_FAILURE } from './constants';

// const defaultState = [];

const defaultState = fromJS({
  loading: false,
  error: false,
  items: false,
});

export function hotTopicsReducer(state = defaultState, action) {
  switch (action.type){
    case LOAD_HOTTOPICS:
      return state
        .set('error', false)
        .set('loading', true);
    case LOAD_HOTTOPICS_SUCCESS:
      return state
        .set('error', false)
        .set('loading', false)
        .set('items', action.items);
    case LOAD_HOTTOPICS_FAILURE:
      return state
        .set('loading', false)
        .set('error', true);
    default:
      return state;
  }
}
export default hotTopicsReducer;
