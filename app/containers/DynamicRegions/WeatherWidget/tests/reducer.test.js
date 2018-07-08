// import expect from 'expect';
import weatherWidgetReducer from '../reducer';
import { fromJS } from 'immutable';

describe('weatherWidgetReducer', () => {
  it('returns the initial state', () => {
    expect(weatherWidgetReducer(undefined, {})).toEqual(fromJS({}));
  });
});
