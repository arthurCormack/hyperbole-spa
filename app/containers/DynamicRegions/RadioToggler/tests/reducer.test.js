// import expect from 'expect';
import radioTogglerReducer from '../reducer';
import { fromJS } from 'immutable';

describe('radioTogglerReducer', () => {
  it('returns the initial state', () => {
    expect(radioTogglerReducer(undefined, {})).toEqual(fromJS({}));
  });
});
