import { createSelector } from 'reselect';

const selectGlobal = () => (state) => state.get('global');


/**
/**
 * Other specific selectors
 */


/**
 * Default selector used by WeatherWidget
 */

//selectWeatherData
const selectWeatherData = () => createSelector(
  selectGlobal(),
  (globalState) => {
    const someWeatherData = globalState.getIn(['dynamicRegions', 'weatherData']);
     // console.log('selectRecentEvents() returns:' + someRecentEvents);
    return someWeatherData;
  }
);
const selectGeolocationData = () => createSelector(
  selectGlobal(),
  (globalState) => {
    const someGeolocationData = globalState.getIn(['dynamicRegions', 'geolocationData']);
     // console.log('selectRecentEvents() returns:' + someRecentEvents);
    return someGeolocationData;
  }
);

export default selectWeatherData;
export {
  selectGeolocationData,
  selectWeatherData,
};
