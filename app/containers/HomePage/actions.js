/*
 * Home Actions
 *
 * Actions change things in your application
 * Since this boilerplate uses a uni-directional data flow, specifically redux,
 * we have these actions which are the only way your application interacts with
 * your application state. This guarantees that your state is up to date and nobody
 * messes it up weirdly somewhere.
 *
 * To add a new Action:
 * 1) Import your constant
 * 2) Add a function like this:
 *    export function yourAction(var) {
 *        return { type: YOUR_ACTION_CONSTANT, var: var }
 *    }
 */



import {
  FETCH_HOMEPAGE,
  LOAD_HOMESTART,
  LOAD_HOMESTART_SUCCESS,
  LOAD_HOMESTART_FAILURE,
} from './constants';
// all API_CALLs are imported from container/App/contsants
import { APICALLURL_GETHOMEQUOTE } from 'containers/App/constants';

/**
 * Changes the input field of the form
 *
 * @param {string} name The new text of the input field
 *
 * @return {object}    An action object with a type of CHANGE_USERNAME
 */


// export const FETCH_HOMEPAGE = 'fetch_admins';

// export const fetchHomePage = () => asynch (dispatch, getState, api) => {
//   // loadData function for HomePage.
//   // ReactSSRCasts ... use api, because it exists as a middleware, but the 3rd param is passed through automatically, request, however, is not. but maybe we could rig something up with redux thunk as well. maybe. we'll see.
//   // redux thunk is more specifically made for asych rest api calls.
//   // and gives us the ability to make actions that trigger a call, wait for the response, and then dispatch another action with the data.
//
//   // could we use the thunk middleware on the server, but not on the client?
//
//   // use request!
//   // use APICALLURL_GETHOMEQUOTE!
//
//   // can we await request the same way ReactSSRCasts does await api.get.
//
//   const res = await api(APICALLURL_GETHOMEQUOTE);// do we need to try catch this?
//
// }
export const fetchHomePage = () => async (dispatch, getState, api) => {
  // console.log(`fetchHomePage()`);
  try {
    const res = await api(APICALLURL_GETHOMEQUOTE);
    // console.log(res);
    dispatch({
      type: FETCH_HOMEPAGE,
      payload: res
    });
  } catch (e) {
    // console.log(`fetchHomePage failed :(`);
    // console.log(e);
  }

}


export function loadHomeStart() {
  return {
    type: LOAD_HOMESTART
  };
}
export function loadHomeStartSuccess(data) {
  return {
    type: LOAD_HOMESTART_SUCCESS,
    data,
  };
}
export function loadHomeStartFailure() {
  return {
    type: LOAD_HOMESTART_FAILURE
  };
}



// export const fetchCurrentUser = () => async (dispatch, getState, api) => {
//   const res = await api.get('/current_user');
//
//   dispatch({
//     type: FETCH_CURRENT_USER,
//     payload: res
//   });
// };
