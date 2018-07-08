// import expect from 'expect';
import newsletterWidgetReducer from '../reducer';
import { fromJS } from 'immutable';

describe('newsletterWidgetReducer', () => {
  it('returns the initial state', () => {
    expect(newsletterWidgetReducer(undefined, {})).toEqual(fromJS({}));
  });
});
