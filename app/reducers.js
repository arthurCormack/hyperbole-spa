/**
 * Combine all reducers in this file and export the combined reducers.
 */

import { combineReducers } from 'redux-immutable';

import { LOCATION_CHANGE, ConnectedRouter, routerReducer, routerMiddleware, push } from 'react-router-redux'

import globalReducer from 'containers/App/reducer';
import languageProviderReducer from 'containers/LanguageProvider/reducer';

import { reducer as burgerMenu } from 'redux-burger-menu/immutable';
import { reducer as formReducer } from 'redux-form/lib/immutable';

/*
 * routeReducer
 *
 * The reducer merges route location changes into our immutable state.
 * The change is necessitated by moving to react-router-redux@5
 *
 */

export function location(state = null, action) {
  // console.log(`location reducer recieved and action:`);
  // console.log(action);
  switch (action.type) {

    case LOCATION_CHANGE:
      return action.payload;
    default:
      return state;
  }
}
const routeReducer = combineReducers({ locationBeforeTransitions: location });

/**
 * Creates the main reducer with the dynamically injected ones
 */
export default function createReducer(injectedReducers) {
  return combineReducers({
    // route: routeReducer,
    route: routeReducer,
    global: globalReducer,
    language: languageProviderReducer,
    burgerMenu,
    form: formReducer,
    ...injectedReducers,
  });
}
