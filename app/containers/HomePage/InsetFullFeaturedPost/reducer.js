import { fromJS } from 'immutable';

import { LOAD_INSETFEATURED, LOAD_INSETFEATURED_SUCCESS, LOAD_INSETFEATURED_FAILURE } from './constants';

const defaultState = fromJS({
  loading: false,
  error: false,
  items: false,
});

export function insetFullFeaturedReducer(state = defaultState, action) {
  switch (action.type){
    case LOAD_INSETFEATURED:
      return state
        .set('error', false)
        .set('loading', true);
    case LOAD_INSETFEATURED_SUCCESS:
      return state
        .set('error', false)
        .set('loading', false)
        .set('items', action.items);
    case LOAD_INSETFEATURED_FAILURE:
      return state
        .set('loading', false)
        .set('error', true);
    default:
      return state;
  }
}
export default insetFullFeaturedReducer;
