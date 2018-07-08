import { HOMEPOLL_LOADED } from './constants';
import { List, fromJS } from 'immutable';

const defaultState = [];
export default function homePollReducer(state = defaultState, action) {
  switch (action.type){
    case HOMEPOLL_LOADED:
      // // console.log('featuredFourReducer');
      return state.setIn(['dynamicRegions', 'homePoll'], action.data);
    default:
      return state;
  }
}
