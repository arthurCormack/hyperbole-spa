import { RECENTPOSTS_LOADED } from './constants';
const defaultState = [];
export default function recentPostsReducer(state = defaultState, action) {
  switch (action.type){
    case RECENTPOSTS_LOADED:
      // // console.log('featuredFourReducer');
      return state.setIn(['dynamicRegions', 'recentPosts'], action.data);
    default:
      return state;
  }
}
