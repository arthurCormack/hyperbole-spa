/*
 *
 * ZoomerNews reducer
 *
 */

import { fromJS } from 'immutable';
import {
  DEFAULT_ACTION,
} from './constants';

import { LOAD_POSTSDATA, LOAD_POSTSDATA_SUCCESS, LOAD_POSTSDATA_ERROR } from 'containers/App/constants';
const initialState = fromJS({});

function zoomerNewsDataReducer(state = initialState, action) {
  // // console.log('recentEventsReducer() ...action.type==' + action.type );
  switch (action.type) {
    case LOAD_POSTSDATA:
      return state;
    case LOAD_POSTSDATA_SUCCESS:
        return state
        .setIn(['dynamicRegions', 'zoomerNews'], action.data)
        .set('pageNum', action.pageNum)
        .set('itemsPerPage', action.itemsPerPage);
    case LOAD_POSTSDATA_ERROR:
      //
      return state;
    case DEFAULT_ACTION:
      return state;
    default:
      return state;
  }
}

export default zoomerNewsDataReducer;
