import { LOAD_HOMEHERO, LOAD_HOMEHERO_SUCCESS, LOAD_HOMEHERO_FAILURE } from './constants';

export function loadHomeHero() {
  return {
    type: LOAD_HOMEHERO,
  };
}

export function loadHomeHeroSuccess(items) {
  return {
    type: LOAD_HOMEHERO_SUCCESS,
    items,
  };
}

export function loadHomeHeroFailure() {
  return {
    type: LOAD_HOMEHERO_FAILURE,
  };
}
export default loadHomeHero;
