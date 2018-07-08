import { MOSTPOPULAR_LOADED } from './constants';
const defaultState = [];
export default function mostPopularReducer(state = defaultState, action) {
  switch (action.type){
    case MOSTPOPULAR_LOADED:
      return state.setIn(['dynamicRegions', 'mostPopular'], action.data);
    default:
      return state;
  }
}
