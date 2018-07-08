/*
 *
 * SinglePostPage reducer
 *
 */

import { fromJS } from 'immutable';

import {
  LOAD_POSTDATA,
  LOAD_POSTDATA_SUCCESS,
  LOAD_POSTDATA_ERROR,
} from './constants';

import {
  SET_CURRENTLYDISPLAYEDITEMINDEX,
  SET_CURRENTLYDISPLAYEDITEMINDEXWAYPOINTINITIATED,
  RESET_CURRENTLYDISPLAYEDITEMINDEXWAYPOINTINITIATED,
  UPDATE_WINDOW_SCROLL_POSITION,
  ZERO_POSTSTACK,
  SCROLLING_ADDRESS_CHANGE,
  AUTOSCROLLTOPOST,
  ARRIVINGFORFIRSTTIME,
  ADD_WAYPOINTTOVIEWPORT,
  REMOVE_WAYPOINTFROMVIEWPORT,
  SET_CURRENTPOSTSTACKDISPLAYDATA,
  SET_FORCE_RENDER,
  SET_DISPLAYEDPOSTSTACK,
  DEFAULT_ACTION,

} from './constants';

import { LOCATION_CHANGE } from 'react-router-redux';

import { msg } from 'utils/msg';

// import { CONTROL_DRAWER } from 'containers/PageWrapper/constants';
// import pageWrapperReducer from 'containers/PageWrapper/reducer';


//const initialState = fromJS({});
const initialState = fromJS({
  loading: false,
  error: false,
  postStack: [],
  displayedPostStack: [],
  currentlyDisplayedItemIndex: null,
  nextItem: null,
  storedScrollTop: null,
  scrollingAddressChange: false,
  arrivedForFirstTime: false,
  waypointsInViewport: [],
  forceRender: false,
});//

function singlePostPageReducer(state = initialState, action) {
  switch (action.type) {
    case DEFAULT_ACTION:
      return state;
    case LOAD_POSTDATA:
      // // console.log('singlePostPageReducer:LOAD_POSTDATA');
      return state
        .set('loading', true)
        .set('error', false);// don't delete the post stack! we'll want to append to it

    case LOAD_POSTDATA_SUCCESS:

      // msg('LOAD_POSTDATA_SUCCESS');
      // setting currentlyDisplayedItemIndex to state.postStack.length is beautifully simple, if you think about it.
      // if the length, is 0; there is nothing in the array yet. There will be one, after the next step, but before that, there is 0,
      // so we will end up displaying the 0th item, whcih is the first one.
      // and besides, we don't really have to know what the currently displayed item is. o wait, yes we do. because we have to display that uri/url path, when we are. huh.
      // resultItem goes into the stack, and nextItem sits outside of that
      // const currentPostStack = state.get('postStack').toJS();
      if (action.data.notFound) {// bail out, avoid errors, let App take care of CAARRDD
        // we have to store this in state, and
        return state.set('foundRoute', false);
      }

      const currentPostStack = state.get('postStack');
      const currentPostStackLength = currentPostStack.length;
      // // console.log(currentPostStackLength);
      // // console.log(action);
      return state
        // .set('loading', false)
        // .set('error', false)
        // .set('currentlyDisplayedItemIndex', currentPostStackLength)
        // .set('postStack', [...currentPostStack, action.data.resultItem])
        // .set('nextItem', action.data.nextItem);
        .set('loading', false)
        .set('error', false)
        .update('postStack', (arr) => arr.push(action.data.resultItem))
        .set('nextItem', action.data.nextItem);


    case LOAD_POSTDATA_ERROR:
      return state
        .set('error', action.error)
        .set('loading', false);
    case SET_DISPLAYEDPOSTSTACK:
    // msg(`SET_DISPLAYEDPOSTSTACK`);
    // msg(action);
    return state
      .set('displayedPostStack', action.postIDs);
    case SET_CURRENTLYDISPLAYEDITEMINDEXWAYPOINTINITIATED:
      // console.log(`reducer SET_CURRENTLYDISPLAYEDITEMINDEXWAYPOINTINITIATED`);
      return state
        .set('currentlyDisplayedItemIndexWaypointInitiated', action.waypointInitiated);
        // need to split these into two different actions, so that the saga can respond to the change, and know, if it was initiated by a waypoint or not.

    case SET_CURRENTLYDISPLAYEDITEMINDEX:
      // // console.log('SET_CURRENTLYDISPLAYEDITEMINDEX');
      // // console.log(action);
      return state
        .set('currentlyDisplayedItemIndexWaypointInitiated', action.waypointInitiated)
        .set('currentlyDisplayedItemIndex', action.itemIndex);
    case ARRIVINGFORFIRSTTIME:
      return state
        .set('arrivedForFirstTime', true);
    case RESET_CURRENTLYDISPLAYEDITEMINDEXWAYPOINTINITIATED:
      // console.log(`reducer RESET_CURRENTLYDISPLAYEDITEMINDEXWAYPOINTINITIATED`);
      return state
      .set('currentlyDisplayedItemIndexWaypointInitiated', action.waypointInitiated);

    case UPDATE_WINDOW_SCROLL_POSITION:
      return state
        .set('storedScrollTop', action.scrollTop);

    case ZERO_POSTSTACK:
      // msg('ZERO_POSTSTACK');
      // return state.set('postStack', []);// a fresh, empty array// but this doesn't set it to an empty array, it appears to set it to 1 ?! wtf?!
      return state
        .set('loading', false)
        .set('waypointsInViewport', [])
        .set('nextItem', null)
        .update('postStack', (arr) => {
        return arr.slice(0, 0);
      })
        .set('waypointsInViewport', []);
// ADD_WAYPOINTTOVIEWPORT, REMOVE_WAYPOINTFROMVIEWPORT
    case ADD_WAYPOINTTOVIEWPORT:
      if (action.current) {
        return state
          .update('waypointsInViewport', (arr) => arr.push(action.index))
          .set('currentlyDisplayedItemIndex', action.index);
      } else {
        return state
          .update('waypointsInViewport', (arr) => arr.push(action.index))
      }


    case REMOVE_WAYPOINTFROMVIEWPORT:
      const someIndex = state.get('waypointsInViewport').indexOf(action.index);
      if (someIndex !== -1) {
        // return state.set('waypointsInViewport', [...state.get('waypointsInViewport').splice(someIndex, 1)]);
        return state.update('waypointsInViewport', (arr) => {
          return arr.splice(someIndex, 1);
        });
      }
      return state;// otherwise just return state untouched
    case SET_CURRENTPOSTSTACKDISPLAYDATA:
      // // console.log(`SinglePostPage.reducer::SET_CURRENTPOSTSTACKDISPLAYDATA`);
      // // console.log(action);
      /*
      current,
      inViewportWaypoints,
      */

      // so we have a reducer that gets this action, and we have a saga that is going to do something with the data; use the new index to navigate the browser away to a new page.
      // the question is, when the data propagates, through reducer-->state, does the saga get to respond, before the component re-renders? if so, then we need an action that the saga will get, which will navigate us to a new page, before the component rerenders!
      // for now, lets presume that component rerendering before saga does navigation is not a propblem: if it is, we can deal w that later.
      // inViewportWaypoints is returned instead of arr. it completely replaces it.
      // and, we have our answer, the render happens before the saga! so ... if we want the side effect to happen before a render, and prevent an additional render, we have to dispatch an action that only the saga is listening for. or if there is a reducer, its not one that is going to result in props being set on the component and causing a re-render
      // a trigger action.
      return state
        .update('waypointsInViewport', (arr) => [...action.inViewportWaypoints])
        .set('currentlyDisplayedItemIndex', action.current);
    case SET_FORCE_RENDER:
      return state.set('forceRender', action.forceRender);
    case SCROLLING_ADDRESS_CHANGE:
      // // console.log('SCROLLING_ADDRESS_CHANGE, action.address=='+action.address);
      return state.set('scrollingAddressChange', action.address);
    case AUTOSCROLLTOPOST:
      // console.log(`singlePostPageReducer::AUTOSCROLLTOPOST, action.autoScrollToPost==${action.autoScrollToPost}`);
      return state.set('autoScrollingToPost', action.autoScrollToPost);

    default:
      return state;
  }
}

export default singlePostPageReducer;
