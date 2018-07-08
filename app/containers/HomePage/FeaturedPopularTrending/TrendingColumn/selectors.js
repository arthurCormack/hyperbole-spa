import { createSelector } from 'reselect';

 const selectGlobal = () => (state) => state.get('global');


const selectTrendingList = () => createSelector(
  selectGlobal(),
  (globalState) => {
    let someTrendingList = globalState.getIn(['dynamicRegions', 'trendingList']);
    if (typeof someTrendingList.toJS === 'function') {
      someTrendingList = someTrendingList.toJS();
    }
    return someTrendingList;
  }
);


export default selectTrendingList;
export {
  selectTrendingList,
};
