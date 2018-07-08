// import expect from 'expect';
import radioPlayerReducer from '../reducer';
import { fromJS } from 'immutable';

describe('radioPlayerReducer', () => {
  it('returns the initial state', () => {
    expect(radioPlayerReducer(undefined, {})).toEqual(fromJS({}));
  });
});
