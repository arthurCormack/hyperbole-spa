import { take, call, put, select, fork } from 'redux-saga/effects';
import { takeEvery } from 'redux-saga';
import request from 'utils/request';
import { APICALLURL_NEWSLETTERSIGNUP, NEWSLETTER_SUBSCRIPTION_SIGNUP, NEWSLETTER_SUBSCRIPTION_SIGNUP_DONE } from 'containers/App/constants';
import { newsletterSignupSubscriptionDone } from 'containers/App/actions';

// Individual exports for testing
export function* newsLetterSignupSaga() {
  // console.log('newsLetterSignupSaga Here ;)');
  yield fork(getNewsletterIDSagaWatcher);
}

function* getNewsletterIDSagaWatcher() {
  // a watcher for an action of a particular variety ... and then we will handle it when we get it.
  // console.log('getNewsletterIDSagaWatcher');
  while (true) {
    const someAction = yield take(NEWSLETTER_SUBSCRIPTION_SIGNUP);
    // console.log('This is the watcher for APICALLURL_NEWSLETTERSIGNUP actions ... and it got called ....');
    // console.log(someAction);
    yield call(getNewsletterID, someAction.values);
    // // console.log(result);
    //
  }
}
function* getNewsletterID(values) {// this is the handler for when we get that particular action
  //  call the salesforce API to get email/id
  const requestURL = APICALLURL_NEWSLETTERSIGNUP;
  const bodyObj = values.get('Personemail');
  const getDate = new Date();
  // console.log(bodyObj);
  const requestObj = {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded; charset=utf-8', 'Accept': 'application/json, application/xml, text/plain, text/html, *.*' },
    body: `Classical963_Subscribed__pc=true&Classical963_Contact_Status__pc=Subscribed&Classical963_Last_Update_Date__pc=2017-02-06T15%3A59%3A49.197Z&Salutation=&firstname=&lastname=testLastname&Personemail=${bodyObj}`,
  };
  // const requestObj = 'VisionTV_Subscribed__pc=true&VisionTV_Contact_Status__pc=Subscribed&VisionTV_Last_Update_Date__pc=2017-02-06T15%3A59%3A49.197Z&Salutation=Mr.&firstname=testFirstname&lastname=testLastname&Personemail=ysprikut%40mail.com&PersonBirthdate=1991&PersonMailingPostalCode=m4m4m4';
  const newsletterSubmission = yield call(request, requestURL, requestObj);
  if (!newsletterSubmission.err) {
    yield put(newsletterSignupSubscriptionDone(newsletterSubmission));
  } else {
    // handle error
  }
}

// function* callNewsletterAPI({ values }) {
//   const result = yield call(getNewsletterID, values);
//   // console.log(result);
//   yield put({ type: NEWSLETTER_SUBSCRIPTION_SIGNUP_DONE, result });
// }

export function* getNewsletterIDSaga() {
  // console.log('getNewsletterIDSaga() .... :) :) :)');
  yield* takeEvery(NEWSLETTER_SUBSCRIPTION_SIGNUP, callNewsletterAPI);

}

// All sagas to be loaded
export default [
  newsLetterSignupSaga,
];
