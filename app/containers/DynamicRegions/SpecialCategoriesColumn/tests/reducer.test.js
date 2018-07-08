
import { fromJS } from 'immutable';
import specialCategoriesColumnReducer from '../reducer';

describe('specialCategoriesColumnReducer', () => {
  it('returns the initial state', () => {
    expect(specialCategoriesColumnReducer(undefined, {})).toEqual(fromJS({}));
  });
});
