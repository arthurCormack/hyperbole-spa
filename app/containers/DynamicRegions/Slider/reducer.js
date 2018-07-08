/*
 *
 * Slider reducer
 *
 */

import { fromJS } from 'immutable';
import {
  DEFAULT_ACTION,
} from './constants';

import { LOAD_SLIDESHOWDATA_SUCCESS, LOAD_SLIDESHOWDATA_ERROR } from 'containers/App/constants';
const initialState = fromJS({slider:{}});

function sliderReducer(state = initialState, action) {
  switch (action.type) {
    case DEFAULT_ACTION:
      return state;
    case LOAD_SLIDESHOWDATA_SUCCESS:
      return state
      .setIn(['dynamicRegions', 'slider'], action.data);
      
    default:
      return state;
  }
}

export default sliderReducer;
