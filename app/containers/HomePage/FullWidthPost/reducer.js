//
import { List, fromJS } from 'immutable';

import { LOAD_HOMEHERO, LOAD_HOMEHERO_SUCCESS, LOAD_HOMEHERO_FAILURE } from './constants';

const defaultState = fromJS({
  loading: false,
  error: false,
  items: false,
});

// const defaultState = {
//   loading: false,
//   error: false,
//   items: false,
// };

export function homeHerosReducer(state = defaultState, action) {
  switch (action.type){
    case LOAD_HOMEHERO:
      return state
        .set('loading', true)
        .set('error', false);
    case LOAD_HOMEHERO_SUCCESS:
      // console.log(`homeHerosReducer`, action.items);
      return state
        .set('loading', false)
        .set('error', false)
        .set('items', action.items);
    case LOAD_HOMEHERO_FAILURE:
      return state
        .set('loading', false)
        .set('error', true);

    default:
      return state;
  }
}

export default homeHerosReducer;
