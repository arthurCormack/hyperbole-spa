import { FEATUREDSINGLEBIG_LOADED } from './constants';
const defaultState = [];
export default function featuredSingleBigReducer(state = defaultState, action) {
  switch (action.type){
    case FEATUREDSINGLEBIG_LOADED:
      // // console.log('featuredSingleBigReducer');
      return state.setIn(['dynamicRegions', 'featuredSingleBig'], action.data);
    default:
      return state;
  }
}
