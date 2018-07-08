// import expect from 'expect';
import radioDisplayReducer from '../reducer';
import { fromJS } from 'immutable';

describe('radioDisplayReducer', () => {
  it('returns the initial state', () => {
    expect(radioDisplayReducer(undefined, {})).toEqual(fromJS({}));
  });
});
