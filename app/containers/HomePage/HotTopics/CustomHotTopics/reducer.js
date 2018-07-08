import { CUSTOMHOTTOPICS_LOADED } from './constants';
const defaultState = [];
export default function customHotTopicsReducer(state = defaultState, action) {
  switch (action.type){
    case CUSTOMHOTTOPICS_LOADED:
      return state.setIn(['dynamicRegions', 'customHotTopics'], action.data);
    default:
      return state;
  }
}
