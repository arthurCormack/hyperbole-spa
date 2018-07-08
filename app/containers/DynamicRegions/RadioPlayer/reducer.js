/*
 *
 * RadioPlayer reducer
 *
 */

import { fromJS } from 'immutable';
import {
  DEFAULT_ACTION,
} from './constants';

import { SOCKET_RECEIVE_DOCHANNELREGISTRATION, SOCKET_RECEIVE_PERFORMANCESDATA, SOCKET_SEND_CHANNELREGISTRATION, SOCKET_RECEIVE_STREAMDATA } from 'containers/App/constants';


const initialState = fromJS({});

function radioPlayerReducer(state = initialState, action) {
  switch (action.type) {
    case SOCKET_RECEIVE_DOCHANNELREGISTRATION:
      // console.log('RadioPlayer reducer: SOCKET_RECEIVE_DOCHANNELREGISTRATION');
      // console.log(action);
      /*return state
        .setIn(['dynamicRegions', 'radio', 'socketConnectionEstablished'], true);*/
        return state
          .set('socketConnectionEstablished', true);
    case SOCKET_RECEIVE_PERFORMANCESDATA:
      return state
        .setIn(['dynamicRegions', 'lastPerformances'], action.data)
        .setIn(['dynamicRegions', 'currentlyPlaying'], action.data[0]);
    case SOCKET_RECEIVE_STREAMDATA:
      // console.log('RadioPlayer SOCKET_RECEIVE_STREAMDATA!!!');
      // // console.log(action.data);
      let someURL = null;
      if (typeof action.data.stream.urls === 'string') {
        someURL = action.data.stream.urls;
      } else {
        // we assume that it is an array, and take the 0th item
        someURL = action.data.stream.urls[0];
      }
      return state
        .setIn(['dynamicRegions', 'streamData'], someURL);
    case DEFAULT_ACTION:
      return state;
    default:
      return state;
  }
}

export default radioPlayerReducer;
