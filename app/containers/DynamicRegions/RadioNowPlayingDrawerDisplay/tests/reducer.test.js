// import expect from 'expect';
import radioNowPlayingDrawerDisplayReducer from '../reducer';
import { fromJS } from 'immutable';

describe('radioNowPlayingDrawerDisplay', () => {
  it('returns the initial state', () => {
    expect(radioNowPlayingDrawerDisplayReducer(undefined, {})).toEqual(fromJS({}));
  });
});
