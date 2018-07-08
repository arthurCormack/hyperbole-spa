// import expect from 'expect';
import upcomingEventsReducer from '../reducer';
import { fromJS } from 'immutable';

describe('upcomingEventsReducer', () => {
  it('returns the initial state', () => {
    expect(upcomingEventsReducer(undefined, {})).toEqual(fromJS({}));
  });
});
