
import { fromJS } from 'immutable';
import horoscopesPageReducer from '../reducer';

describe('horoscopesPageReducer', () => {
  it('returns the initial state', () => {
    expect(horoscopesPageReducer(undefined, {})).toEqual(fromJS({}));
  });
});
