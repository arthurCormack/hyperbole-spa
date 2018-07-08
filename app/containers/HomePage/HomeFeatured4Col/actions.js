/*

//

*/

import { LOAD_HOMEFEATURED4COL, LOAD_HOMEFEATURED4COL_SUCCESS, LOAD_HOMEFEATURED4COL_FAILURE } from './constants';
export function loadHomeFeatured4Col(data) {
  return {
    type: LOAD_HOMEFEATURED4COL,
  };
}

export function loadHomeFeatured4ColSuccess(items) {
  return {
    type: LOAD_HOMEFEATURED4COL_SUCCESS,
    items,
  };
}

export function loadHomeFeatured4ColFailure(data) {
  return {
    type: LOAD_HOMEFEATURED4COL_FAILURE,
  };
}
export default loadHomeFeatured4ColSuccess;
