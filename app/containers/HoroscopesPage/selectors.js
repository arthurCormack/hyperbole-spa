import { createSelector } from 'reselect';

/**
 * Direct selector to the horoscopesPage state domain
 */
const selectHoroscopesPageDomain = () => (state) => state.get('horoscopesPage');

/**
 * Other specific selectors
 */


/**
 * Default selector used by HoroscopesPage
 */

const makeSelectHoroscopeData = () => createSelector(
  selectHoroscopesPageDomain(),
  (substate) => substate.toJS()
);

const makeSelectHoroscopes = () => createSelector(
  makeSelectHoroscopeData(),
  (horoscopeData) => {
    // console.log('makeSelectHoroscopes!');
    // console.log(horoscopeData);
    if (horoscopeData === null) {
      return null;
    }
    // return horoscopeData !== null ? horoscopeData.horoscopes : null
    return horoscopeData.horoscopes;
  }
);
const makeSelectHoroscopesDate = () => createSelector(
  makeSelectHoroscopeData(),
  (horoscopeData) => horoscopeData !== null ? horoscopeData.date : null
);
const makeSelectHoroscopesTitle = () => createSelector(
  makeSelectHoroscopeData(),
  (horoscopeData) => horoscopeData !== null ? horoscopeData.title : null
);
const makeSelectHoroscopesLink = () => createSelector(
  makeSelectHoroscopeData(),
  (horoscopeData) => horoscopeData !== null ? horoscopeData.link : null
);



export default makeSelectHoroscopeData;
export {
  makeSelectHoroscopeData,
  makeSelectHoroscopes,
  makeSelectHoroscopesDate,
  makeSelectHoroscopesTitle,
  makeSelectHoroscopesLink
};
