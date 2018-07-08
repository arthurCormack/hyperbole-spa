import { LOAD_TILEDATA, LOAD_TILEDATA_SUCCESS, LOAD_TILEDATA_FAILURE } from './constants';

export function loadTilesData(data) {
  // console.log('loadTilesData');
  return {
    type: LOAD_TILEDATA,
  };
}


export function tilesDataLoaded(data) {
  // console.log('tilesDataLoaded');
  return {
    type: LOAD_TILEDATA_SUCCESS,
    data,
  };
}

export function tilesDataLoadingFailure(err) {
  // console.log('tilesDataLoadingFailure');
  return {
    type: LOAD_TILEDATA_FAILURE,
  };
}
