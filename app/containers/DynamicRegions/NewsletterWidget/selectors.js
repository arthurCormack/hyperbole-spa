import { createSelector } from 'reselect';

/**
 * Direct selector to the NewsletterWidget state domain
 */

const selectGlobal = () => (state) => state.get('global');
//const selectRecentlyPlayedDomain = () => (state) => state.get('recentlyPlayed');

/**
 * Other specific selectors
 */
const selectFormNewsletterWidget = () => (state) => state.getIn(['form', 'newsletterWidget']);
const selectFormEmail = () => createSelector(
  selectFormNewsletterWidget(),
  (formNewsletterWidgetState) => {
    return formNewsletterWidgetState.getIn(['registeredFields', 'Personemail']);
  }
);
/**
 * Default selector used by NewsletterWidget
 */

const selectNewsletterWidget = () => createSelector(
  selectGlobal(),
  (globalState) => {
    return globalState.getIn(['dynamicRegions', 'lastPerformances']);
  }
);

export default selectNewsletterWidget;
export {
  selectNewsletterWidget,
  selectFormNewsletterWidget,
  selectFormEmail,
};
