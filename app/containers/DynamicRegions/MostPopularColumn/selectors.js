import { createSelector } from 'reselect';
// import { selectGlobal } from 'containers/App/selectors';

 const selectGlobal = () => (state) => state.get('global');

const selectMostPopularItems = () => createSelector(
  selectGlobal(),
  (globalState) => {
    let someMostPopularItems = globalState.getIn(['dynamicRegions', 'mostPopular']);
    if (typeof someMostPopularItems.toJS === 'function') {
      someMostPopularItems = someMostPopularItems.toJS();
    }
    return someMostPopularItems;
  }
);

export default selectMostPopularItems;
export {
  selectMostPopularItems,
};
