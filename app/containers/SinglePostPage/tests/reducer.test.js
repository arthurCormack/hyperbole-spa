
import { fromJS } from 'immutable';
import singlePageReducer from '../reducer';

describe('singlePageReducer', () => {
  it('returns the initial state', () => {
    expect(singlePageReducer(undefined, {})).toEqual(fromJS({}));
  });
});
