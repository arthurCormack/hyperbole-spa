import { LOAD_HOMEQUOTE, LOAD_HOMEQUOTE_SUCCESS, LOAD_HOMEQUOTE_FAILURE } from './constants';

export function loadHomeQuote(data) {
  // console.log('homeQuoteLoaded');
  return {
    type: LOAD_HOMEQUOTE,
  };
}

export function loadHomeQuoteSuccess(data) {
  // console.log('homeQuoteLoaded');
  return {
    type: LOAD_HOMEQUOTE_SUCCESS,
    data,
  };
}

export function loadHomeQuoteFailure(data) {
  // console.log('homeQuoteLoaded');
  return {
    type: LOAD_HOMEQUOTE_FAILURE,
    data,
  };
}

export default loadHomeQuoteSuccess;
