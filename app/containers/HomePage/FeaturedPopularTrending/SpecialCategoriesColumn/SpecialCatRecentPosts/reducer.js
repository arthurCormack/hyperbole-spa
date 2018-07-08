import { SPECIALCATRECENTPOSTSDATALOADED } from './constants';
const defaultState = [];
export default function specialCatRecentPostsReducer(state = defaultState, action) {
  switch (action.type){
    case SPECIALCATRECENTPOSTSDATALOADED:
      // // console.log('SPECIALCATRECENTPOSTSDATALOADED>>>!!!');
      // // console.log(action);
      return state.setIn(['dynamicRegions', 'specialCatRecentPosts', action.data.resultSetData.tag], action.data.resultSet);
    default:
      return state;
  }
}
