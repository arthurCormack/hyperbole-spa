// import { take, call, put, select } from 'redux-saga/effects';


/*
* so ... how is the geolocation stuff going to work? we get 2500 request per dat for free, and then it costs US$0.50/100 requests.
* One idea is to store geolocation data for a user in a cookie, and retreive the data from that. And only refresh if their IP address / device location has changed
*
*
*/


// Individual exports for testing

// getStoredGeoLocationData
// getGeoLocationData
// checkStoredWeatherData --> check timestamp - do we need an update? ( weatherCheckPeriod = once per day ... every 24 hours )
// getWeatherForLocation --> store with timestamp
// 

export function* defaultSaga() {
  return;
}

// All sagas to be loaded
export default [
  defaultSaga,
];
