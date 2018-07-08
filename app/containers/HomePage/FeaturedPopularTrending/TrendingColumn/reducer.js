import { TRENDINGLIST_LOADED } from './constants';
const defaultState = [];
export default function trendingListReducer(state = defaultState, action) {
  switch (action.type){
    case TRENDINGLIST_LOADED:
      // // console.log('featuredFourReducer');
      return state.setIn(['dynamicRegions', 'trendingList'], action.data);
    default:
      return state;
  }
}
