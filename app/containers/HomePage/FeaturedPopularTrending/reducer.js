// featuredPopularTrending

import { fromJS } from 'immutable';

import {
  LOAD_FEATUREDPOPULARTRENDING,
  LOAD_FEATUREDPOPULARTRENDING_SUCCESS,
  LOAD_FEATUREDPOPULARTRENDING_FAILURE,
} from './constants';

const defaultState = fromJS({
  loading: false,
  error: false,
  specialCategories: false,
  homeTile: false,
  trendingColumn: false,
});


export function featuredPopularTrendingReducer(state = defaultState, action) {
  switch (action.type){
    case LOAD_FEATUREDPOPULARTRENDING:
      return state
        .set('error', false)
        .set('loading', true);
    case LOAD_FEATUREDPOPULARTRENDING_SUCCESS:
    
      return state
        .set('error', false)
        .set('loading', false)
        .set('specialCategories', action.specialCategories)
        .set('homeTile', action.homeTile)
        .set('trendingColumn', action.trendingColumn);
    case LOAD_FEATUREDPOPULARTRENDING_FAILURE:
      return state
        .set('loading', false)
        .set('error', true);
    default:
      return state;
  }
}
export default featuredPopularTrendingReducer;
