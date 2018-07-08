/*
 *
 * TilesPage reducer
 *
 */

import { fromJS } from 'immutable';
import {
  DEFAULT_ACTION,
  LOAD_TILEDATA,
  LOAD_TILEDATA_SUCCESS,
  LOAD_TILEDATA_FAILURE,
} from './constants';

const initialState = fromJS({});

function tilesPageReducer(state = initialState, action) {
  switch (action.type) {
    case DEFAULT_ACTION:
      return state;
    case LOAD_TILEDATA:
      return state;
    case LOAD_TILEDATA_SUCCESS:
      return state
        .set('tileStack', action.data);

    case LOAD_TILEDATA_FAILURE:
      return state;
    default:
      return state;
  }
}

export default tilesPageReducer;
