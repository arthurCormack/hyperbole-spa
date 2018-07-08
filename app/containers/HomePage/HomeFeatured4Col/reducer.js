// getHomeFeatured4ColSaga
import { fromJS } from 'immutable';
import { LOAD_HOMEFEATURED4COL, LOAD_HOMEFEATURED4COL_SUCCESS, LOAD_HOMEFEATURED4COL_FAILURE } from './constants';

const defaultState = fromJS({
  loading: false,
  error: false,
  items: false,
});

export function homeFeatured4ColReducer(state = defaultState, action) {
  switch (action.type){
    case LOAD_HOMEFEATURED4COL:
      return state
        .set('error', false)
        .set('loading', true);
    case LOAD_HOMEFEATURED4COL_SUCCESS:
      return state
        .set('error', false)
        .set('loading', false)
        .set('items', action.items);
    case LOAD_HOMEFEATURED4COL_FAILURE:
      return state
        .set('loading', false)
        .set('error', true);
    default:
      return state;
  }
}
export default homeFeatured4ColReducer;
