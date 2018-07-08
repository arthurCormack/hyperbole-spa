import { take, call, put, select } from 'redux-saga/effects';
// Individual exports for testing
import request from 'utils/request';
import { loadHomeQuote, loadHomeQuoteSuccess, loadHomeQuoteFailure } from './actions';
import { APICALLURL_GETHOMEQUOTE } from 'containers/App/constants';

import { selectHomeQuoteItems } from './selectors';

import { msg } from 'utils/msg';

export function* getHomeQuoteSaga() {
  // console.log(`!!!!!!!!!getHomeQuoteSaga()`);
  const someHomeQuoteItems = yield(select(selectHomeQuoteItems()));
  console.log(`someHomeQuoteItems`);
  console.log(someHomeQuoteItems)
  if (typeof someHomeQuoteItems !== 'object' || someHomeQuoteItems.length === 0) {
    msg('getHomeQuoteSaga is loading');
    yield put(loadHomeQuote());
    try {
      const homeQuoteData = yield call(request, APICALLURL_GETHOMEQUOTE);
      // msg(homeQuoteData);
      yield put(loadHomeQuoteSuccess(homeQuoteData));
    } catch (e) {
      msg(e);
      yield put(loadHomeQuoteFailure());
    }
  } else {
    // console.log('getHomeQuoteSaga is not loading');
  }

}
export default getHomeQuoteSaga();
