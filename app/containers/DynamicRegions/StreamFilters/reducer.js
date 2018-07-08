import { fromJS } from 'immutable';
import {
  DEFAULT_ACTION,
} from './constants';

// import FILTER_REGION from 'containers/App/constants';


const initialState = fromJS({});

export function streamFiltersReducer(state = initialState, action) {
  switch (action.type) {
    case DEFAULT_ACTION:
      return state;
    // case FILTER_REGION:
    //   // console.log('FILTER_REGION');
    //   return state
    //   .set('selectedRegion', action.region);

    default:
      return state;
  }
}

export default streamFiltersReducer;
