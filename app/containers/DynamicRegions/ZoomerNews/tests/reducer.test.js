// import expect from 'expect';
import zoomerNewsReducer from '../reducer';
import { fromJS } from 'immutable';

describe('zoomerNewsReducer', () => {
  it('returns the initial state', () => {
    expect(zoomerNewsReducer(undefined, {})).toEqual(fromJS({}));
  });
});
