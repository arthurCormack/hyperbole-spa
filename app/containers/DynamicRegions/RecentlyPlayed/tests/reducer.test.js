// import expect from 'expect';
import recentlyPlayedReducer from '../reducer';
import { fromJS } from 'immutable';

describe('recentlyPlayedReducer', () => {
  it('returns the initial state', () => {
    expect(recentlyPlayedReducer(undefined, {})).toEqual(fromJS({}));
  });
});
