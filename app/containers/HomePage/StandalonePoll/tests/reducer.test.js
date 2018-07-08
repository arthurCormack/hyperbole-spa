// import expect from 'expect';
import radioDisplayReducer from '../reducer';
import { fromJS } from 'immutable';

describe('atandalonePollReducer', () => {
  it('returns the initial state', () => {
    expect(standalonePollReducer(undefined, {})).toEqual(fromJS({}));
  });
});
