import { LOAD_INSETFEATURED, LOAD_INSETFEATURED_SUCCESS, LOAD_INSETFEATURED_FAILURE } from './constants';


export function loadInsetFeatured() {
  return {
    type: LOAD_INSETFEATURED,
  };
}
export function loadInsetFeaturedSuccess(items) {
  return {
    type: LOAD_INSETFEATURED_SUCCESS,
    items,
  };
}
export function loadInsetFeaturedFailure() {
  return {
    type: LOAD_INSETFEATURED_FAILURE,
  };
}
