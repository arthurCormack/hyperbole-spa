// import expect from 'expect';
import simpleEditButtonReducer from '../reducer';
import { fromJS } from 'immutable';

describe('SimpleMagicEditButtonReducer', () => {
  it('returns the initial state', () => {
    expect(simpleEditButtonReducer(undefined, {})).toEqual(fromJS({}));
  });
});
