/**
 * Create the store with dynamic reducers
 */

import { createStore, applyMiddleware, compose } from 'redux';
import { fromJS } from 'immutable';
import { routerMiddleware } from 'react-router-redux';

// import createHistory from 'history/createBrowserHistory'

// import createBrowserHistory from 'history/createBrowserHistory';
// import createMemoryHistory from 'history/createMemoryHistory';

import createSagaMiddleware from 'redux-saga';
import createReducer from './reducers';

import { API_URL } from 'containers/App/constants';

import thunk from 'redux-thunk';
import axios from 'axios'
const axiosInstance = axios.create({
  // baseURL: '/api'
});
// maybe we can use request instead of axios, and not need to import 2 different libraries?
import request from 'utils/request';

const thunkMiddleware = thunk.withExtraArgument(axiosInstance);

const sagaMiddleware = createSagaMiddleware();


// initialState will always be Object{} on the server...
  // this will pass to the client so that it will be able to
  // initialize with what the server originally rendered

// let history;
// const fromServer = typeof window === 'undefined';
//
// if (fromServer) {
//   // since the server has no HTML5 push states,
//   // history must be temporarily created in memory
//   history = createMemoryHistory();
// }
// else {
//   // on the client, we can go ahead and make a standard
//   // `history` state
//   history = createBrowserHistory();
// }


export default function configureStore(initialState = {}, history) {
  console.log(`configureStore()`);
  // console.log(history);
  // Create the store with two middlewares
  // 1. sagaMiddleware: Makes redux-sagas work
  // 2. routerMiddleware: Syncs the location/URL path to the state
  // let's try adding a third middleware: redux thunk!
  const someRouterMiddleware = routerMiddleware(history);
  // console.log(`someRouterMiddleware:`);
  // console.log(history);
  // console.log(someRouterMiddleware);

  const middlewares = [
    sagaMiddleware,
    // thunkMiddleware,
    // routerMiddleware(history),
    someRouterMiddleware,
  ];

  const enhancers = [
    applyMiddleware(...middlewares),
  ];

  // If Redux DevTools Extension is installed use it, otherwise use Redux compose
  /* eslint-disable no-underscore-dangle */
  const composeEnhancers =
    process.env.NODE_ENV !== 'production' &&
    typeof window === 'object' &&
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
      ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({
        // TODO Try to remove when `react-router-redux` is out of beta, LOCATION_CHANGE should not be fired more than once after hot reloading
        // Prevent recomputing reducers for `replaceReducer`
        // shouldHotReload: false,
      })
      : compose;
  /* eslint-enable */

  const store = createStore(
    createReducer(),
    fromJS(initialState),
    composeEnhancers(...enhancers)

  );
  // console.log(`here is the store that was just made:`);
  // console.log(store.getState());

  // Extensions
  store.runSaga = sagaMiddleware.run;
  store.injectedReducers = {}; // Reducer registry
  store.injectedSagas = {}; // Saga registry

  // Make reducers hot reloadable, see http://mxs.is/googmo
  /* istanbul ignore next */
  if (module.hot) {
    module.hot.accept('./reducers', () => {
      store.replaceReducer(createReducer(store.injectedReducers));
    });
  }

  return store;
}
