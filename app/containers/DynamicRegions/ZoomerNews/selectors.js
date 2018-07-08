import { createSelector } from 'reselect';

const selectGlobal = () => (state) => state.get('global');

const selectZoomerNews = () => createSelector(
  selectGlobal(),
  (globalState) => {
    const someZoomerNews = globalState.getIn(['dynamicRegions', 'zoomerNews']);
    // // console.log('selectRecentEvents() returns:' + someRecentEvents);
    return someZoomerNews;
  }
);

export default selectZoomerNews;
export {
  selectZoomerNews,
};
