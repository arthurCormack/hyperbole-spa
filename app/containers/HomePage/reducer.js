/*
 * HomeReducer
 *
 * The reducer takes care of our data. Using actions, we can change our
 * application state.
 * To add a new action, add it to the switch statement in the reducer function
 *
 * Example:
 * case YOUR_ACTION_CONSTANT:
 *   return state.set('yourStateVariable', true);
 */


import { fromJS } from 'immutable';
import { combineReducers } from 'redux-immutable';
import { featuredPopularTrendingReducer as featuredPopularTrending } from './FeaturedPopularTrending/reducer';
import { homeHerosReducer as homeHeroes } from './FullWidthPost/reducer';
import { hotTopicsReducer as hotTopics } from './HotTopics/reducer';
import { homeFeatured4ColReducer as featured } from './HomeFeatured4Col/reducer';
import { insetFullFeaturedReducer as insetFeatured } from './InsetFullFeaturedPost/reducer';

import {
  LOAD_HOMESTART,
  LOAD_HOMESTART_SUCCESS,
  LOAD_HOMESTART_FAILURE,
} from './constants';

// reducers that have to do with the first load: ${API_URL}/gethomestart
function loading(state = false, action) {
  switch (action.type) {
    case LOAD_HOMESTART:
      return true;
    case LOAD_HOMESTART_SUCCESS:
      return false;
    case LOAD_HOMESTART_FAILURE:
      return false;
    default:
      return state;
  }
}
function error(state = false, action) {
  switch (action.type) {
    case LOAD_HOMESTART:
      return false;
    case LOAD_HOMESTART_SUCCESS:
      return false;
    case LOAD_HOMESTART_FAILURE:
      return true;
    default:
      return state;
  }
}
function featuredFour(state = false, action) {
  switch (action.type) {
    case LOAD_HOMESTART:
      return false;
    case LOAD_HOMESTART_SUCCESS:
      return action.data.featuredFour;
    case LOAD_HOMESTART_FAILURE:
      return false;
    default:
      return state;
  }

}

function quote(state = false, action) {
  switch (action.type) {
    case LOAD_HOMESTART:
      return false;
    case LOAD_HOMESTART_SUCCESS:
      // console.log(`quote::LOAD_HOMESTART_SUCCESS`);
      // console.log(action);
      // console.log(`LOAD_HOMESTART_SUCCESS`, action);
      return action.data.quote;
    case LOAD_HOMESTART_FAILURE:
      return false;
    default:
      return state;
  }
}
function ads(state = false, action) {
  switch (action.type) {
    case LOAD_HOMESTART:
      return false;
    case LOAD_HOMESTART_SUCCESS:
      return action.data.ads;
    case LOAD_HOMESTART_FAILURE:
      return false;
    default:
      return state;
  }
}

// what does the pipe look like on home page? do we load chunks in series, or in parallel?
// let's say, h'mm ... dunno.
// but if we have a general error, on the home page, what call does that pertain to, in specific?
// do we need seperate error/loading props? probably that makes the most sense to compose the data, so that each data api call process has state like error and loading. also possibly times initiated, so that we can try retrying if need be.
// or we need sequenced state flags.
//

export default combineReducers({
  loading,
  error,
  quote,
  featuredFour,
  featuredPopularTrending,
  homeHeroes,
  hotTopics,
  featured,
  insetFeatured,
});
