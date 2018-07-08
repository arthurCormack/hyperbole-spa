import { HOMETILE_LOADED } from './constants';
const defaultState = [];
export default function homeTileReducer(state = defaultState, action) {
  switch (action.type){
    case HOMETILE_LOADED:
      // // console.log('featuredFourReducer');
      return state.setIn(['dynamicRegions', 'homeTile'], action.data);
    default:
      return state;
  }
}
