/*
 *
 * RecentEvents reducer
 *
 */

import { fromJS } from 'immutable';
import {
  DEFAULT_ACTION,
} from './constants';

import { LOAD_UPCOMINGEVENTSDATA, LOAD_UPCOMINGEVENTSDATA_SUCCESS, LOAD_UPCOMINGEVENTSDATA_ERROR } from 'containers/App/constants';
const initialState = fromJS({});

function recentEventsReducer(state = initialState, action) {
  // // console.log('recentEventsReducer() ...action.type==' + action.type );

  switch (action.type) {
    case LOAD_UPCOMINGEVENTSDATA:

      return state;
    case LOAD_UPCOMINGEVENTSDATA_SUCCESS:
      // // console.log('UpcomingEvents.reducer:LOAD_UPCOMINGEVENTSDATA_SUCCESS, action.data')
      // // console.log(action.data);

      // // console.log(action.data);
      // now what do we do? we update some state stuff
      // and the component will then do what?
      // return state.set('recentEvents', action.data);
      // this is already getting set by the App reducer ...

      return state;
      /*
      return state
      .set('id', action.data.id)
      .set('post_title', action.data.post_title)
      .set('post_content', action.data.post_content)
      .set('post_author', action.data.author)
      .set('post_date', action.data.post_date)
      .set('post_categories', action.data.cats)
      .set('post_thumbnails', action.data.thumbnails);
      */

    case LOAD_UPCOMINGEVENTSDATA_ERROR:
      //
      return state;
    case DEFAULT_ACTION:
      return state;
    default:
      return state;
  }
}

export default recentEventsReducer;
