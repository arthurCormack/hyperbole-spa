/*
 *
 * LiveVideoStreamPlayer reducer
 *
 */

import { fromJS } from 'immutable';


import { SOCKET_RECEIVE_LIVEVIDEOSTREAMDATA } from 'containers/App/constants';


const initialState = fromJS({});

function liveVideoStreamPlayerReducer(state = initialState, action) {
  switch (action.type) {
    case SOCKET_RECEIVE_LIVEVIDEOSTREAMDATA:
      // console.log('liveVideoStreamPlayerReducer reducer: SOCKET_RECEIVE_LIVEVIDEOSTREAMDATA');
      // console.log(action);
      return state
        .set('liveVideoStreamData', action.data);

    default:
      return state;
  }
}

export default liveVideoStreamPlayerReducer;
