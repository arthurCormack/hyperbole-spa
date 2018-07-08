/*
 *
 * newsletterWidget reducer
 *
 */

import { fromJS } from 'immutable';
import {
  APICALLURL_NEWSLETTERSIGNUP,
} from 'containers/App/constants';

const initialState = fromJS({});

function newsletterWidgetReducer(state = initialState, action) {
  switch (action.type) {
    case APICALLURL_NEWSLETTERSIGNUP:
      return state;
    default:
      return state;
  }
}

export const load = (data) => ({ type: APICALLURL_NEWSLETTERSIGNUP, data });

export default newsletterWidgetReducer;
