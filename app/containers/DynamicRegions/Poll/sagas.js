import { take, call, put, select } from 'redux-saga/effects';
// Individual exports for testing
import request from 'utils/request';
import homePollLoaded from './actions';
import { APICALLURL_GETHOMEPOLL } from 'containers/App/constants';

export function* getHomePollSaga() {
  // console.log('get home poll');
  try {
    const homePollData = yield call(request, APICALLURL_GETHOMEPOLL);
    yield put(homePollLoaded(homePollData));
  } catch (e) {
    //error
  }
}
export default getHomePollSaga();
