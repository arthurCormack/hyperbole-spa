import { CURRENTMAG_LOADED } from './constants';
import { List, fromJS } from 'immutable';

const defaultState = [];
export default function currentMagReducer(state = defaultState, action) {
  switch (action.type){
    case CURRENTMAG_LOADED:
      // // console.log('featuredFourReducer');
      return state.setIn(['dynamicRegions', 'currentMag'], action.data);
    default:
      return state;
  }
}
