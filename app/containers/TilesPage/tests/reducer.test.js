
import { fromJS } from 'immutable';
import tilesPageReducer from '../reducer';

describe('tilesPageReducer', () => {
  it('returns the initial state', () => {
    expect(tilesPageReducer(undefined, {})).toEqual(fromJS({}));
  });
});
