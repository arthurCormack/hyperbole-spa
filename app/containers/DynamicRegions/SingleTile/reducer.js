import { LOAD_TILEDATA, LOAD_TILEDATA_SUCCESS, LOAD_TILEDATA_ERROR } from 'containers/TilesPage/constants';

const defaultState = [];
export default function homeTileReducer(state = defaultState, action) {
  switch (action.type){
    case LOAD_TILEDATA_SUCCESS:
      // console.log(`homeTileReducer::LOAD_TILEDATA_SUCCESS`);
      // console.log(action);
      return state.setIn(['dynamicRegions', 'singleTile'], action.data[0]);
    default:
      return state;
  }
}
