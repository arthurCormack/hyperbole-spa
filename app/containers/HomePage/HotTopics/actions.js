import { LOAD_HOTTOPICS, LOAD_HOTTOPICS_SUCCESS, LOAD_HOTTOPICS_FAILURE } from './constants';



export function loadHotTopics() {
  // console.log('hotTopicsDataLoaded');
  return {
    type: LOAD_HOTTOPICS,
  };
}

export function loadHotTopicsSuccess(items) {
  // console.log('hotTopicsDataLoaded');
  return {
    type: LOAD_HOTTOPICS_SUCCESS,
    items,
  };
}

export function loadHotTopicsFailure() {
  // console.log('hotTopicsDataLoaded');
  return {
    type: LOAD_HOTTOPICS_FAILURE,
  };
}
export default loadHotTopics;
