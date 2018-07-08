/*
 *
 * RadioToggler reducer
 *
 */

import { fromJS } from 'immutable';
import {
  DEFAULT_ACTION,
} from './constants';
import { CONTROL_RADIO } from 'containers/App/constants';

const initialState = fromJS({radioPlayState:false});

function radioTogglerReducer(state = initialState, action) {
  // // console.log('radioTogglerReducer');
  switch (action.type) {
    case DEFAULT_ACTION:
      return state;
    case CONTROL_RADIO:
      // console.log('CONTROL_RADIO!!');
      return state
        .set('radioPlayState', action.playCommand);
    default:
      return state;
  }
}

export default radioTogglerReducer;
