/*
 *
 * SinglePostPage reducer
 *
 */

import { fromJS } from 'immutable';

// import {
//   LOAD_ARCHIVEDATA,
//   LOAD_ARCHIVEDATA_SUCCESS,
//   LOAD_ARCHIVEDATA_FAILURE,
// } from 'containers/App/constants';

import {
  LOAD_ARCHIVEDATA,
  LOAD_ARCHIVEDATA_SUCCESS,
  LOAD_ARCHIVEDATA_FAILURE,
  SET_CURRENTLYDISPLAYEDCHUNKINDEX,
  SET_CURRENTLYDISPLAYEDCHUNKDATA,
  // UPDATE_WINDOW_SCROLL_POSITION,
  ZERO_ARCHIVESTACK,
  SAVE_INITIALPAGENUMBER,
  // SCROLLING_ADDRESS_CHANGE,
  // AUTOSCROLLTOPOST,
  // SET_LEADERBOARDINDEX,
  SET_FORCE_RENDER,
  DEFAULT_ACTION,
} from './constants';

import { LOCATION_CHANGE } from 'react-router-redux';


//const initialState = fromJS({});
const initialState = fromJS({
  loading: false,
  error: false,
  archiveStack: [],
  termData: null,
  currentlyDisplayedChunkIndex: 0,
  initialPageNumber: 1,
  waypointsInViewport: [],
  // nextItem: null,
  // storedScrollTop: null,
  // scrollingAddressChange: false,
  foundRoute: null,
  leaderboardIndex: 0,
  forceRender: false,
});//

function archivePageReducer(state = initialState, action) {
  switch (action.type) {
    case DEFAULT_ACTION:
      return state;
    case LOAD_ARCHIVEDATA:
      return state
      .set('loading', true)
      .set('error', false);
    case LOAD_ARCHIVEDATA_SUCCESS:
      // console.log('Reducer: LOAD_ARCHIVEDATA_SUCCESS!');
      if (action.data.notFound) {// bail out, avoid errors, let App take care of CAARRDD
        // we have to store this in state, and

        return state.set('foundRoute', false);
      }
      // we have to be prepared to do like we do on post pages, and if notFound is true, then look for redirect url, and set it in the CAARDD.

      // // console.log(action);
      //// console.log(`state.getIn(['termData', 'term_id']==${state.getIn(['termData', 'term_id']}`);
      // // console.log(`state.getIn(['termData', 'term_id'] == ${state.getIn(['termData', 'term_id'])}`);// why would this return undefined?!
      // console.log('heres some termData');
      // console.log(state.get('termData'));//
      // const currentTerm = state.get('termData') === null ? null : state.get('termData').toJS();
      // console.log(`action.data.resultSetData.termData.term_id==${action.data.resultSetData.termData.term_id}`);

      // const currentTermData = state.get('termData') !== null ? state.get('termData').toJS() : null;
      // const currentTermData = state.get('termData') !== null && ? state.get('termData').toJS() : null;
      //let currentTermData = null;
      let currentTermID = null;

      if (state.get('termData') !== null) {
        if (typeof state.get('termData').toJS === 'function') {
          // then it is an immutable map, ie first render.
          currentTermID = state.getIn(['termData', 'term_id']);
        } else {
          currentTermID = state.get('termData').term_id;
        }
      }

      // if (currentTermData === null) {
      //   // stays null
      // } else {
      //   currentTermID = currentTermData.term_id;
      // }

      // console.log(`currentTermID==${currentTermID}`);

      if ( state.get('termData') === null || currentTermID !== action.data.resultSetData.termData.term_id ) {
        // console.log(' ARCHIVE RESET HAS OCCURRED');
        return state
          .set('loading', false)
          .set('error', false)
          .set('archiveStack', action.data.resultSet)
          .set('foundRoute', true)
          .set('termData', action.data.resultSetData.termData);
          // how precisely do we want to do this here?
          // we want to append / merge into the stack, we don't want to replace it, we want to add to it, but without any duplicates.
          // the first load will be different from subsequent loads. how do we want to handle that?
          // so ... if we already have an archiveStack ... and termData ... is it of the same category? if so, then append. if not, then replace.
      } else {
        // then append
        // console.log('it looks like we are updating / appending instead of replacing');
        return state
          .set('loading', false)
          .set('error', false)
          // .update('archiveStack', (arr) => arr.push(action.data.resultSet))// push seems to replace instead of merge
          .update('archiveStack', (arr) => arr.concat(action.data.resultSet))
          .set('termData', action.data.resultSetData.termData);// termData can stay the same, but let's see if setting it can eliminate the accidental replace
          // .set('termData', action.data.resultSetData.termData);// we don't need to set this, because it was already set + has same term_id
          // but is this true? do we really want to handle it this way, where we just unintelligently append it?
          // two errors are happening here. 1) we are sending data back from the api, where there shouldn't be any. in the case where the offset is greater than the total number of possible results, then the reusltSet should be empty!
          // maybe we shouldn't even be asking for it, if the total number of valid items in the archiveStack is already greater than or equal to the total number of items available, then stop asking for more!
          // in addition to this, we could also do a merge when new data comes in, so that we prevent duplicates. Maybe lodash has a thing for that.

      }

    case SET_CURRENTLYDISPLAYEDCHUNKINDEX:
        // // console.log('SET_CURRENTLYDISPLAYEDCHUNKINDEX');
        return state
          .set('currentlyDisplayedChunkIndex', action.chunkIndex);
    case SET_CURRENTLYDISPLAYEDCHUNKDATA:
        return state
          .set('currentlyDisplayedChunkIndex', action.current)
          .update('waypointsInViewport', (arr) => [...action.inViewportWaypoints]);
          // .set('waypointsInViewport', action.inViewportWaypoints);
    case ZERO_ARCHIVESTACK:
        // console.log('ZERO_ARCHIVESTACK reducer here');
        return state
          .set('loading', false)
          .update('archiveStack', (arr) => arr.slice(0, 0))
          .set('termData', null)
          .set('currentlyDisplayedChunkIndex', 0)
          .set('initialPageNumber', 1)
          .set('forceRender', false)
          .set('waypointsInViewport', []);
    case SAVE_INITIALPAGENUMBER:
        return state
          .set('initialPageNumber', Number(action.page));
    case SET_FORCE_RENDER:
      return state.set('forceRender', action.forceRender);
    default:
      return state;
  }
}

export default archivePageReducer;
