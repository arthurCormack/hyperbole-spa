import { createSelector } from 'reselect';
// import { selectGlobal } from 'containers/App/selectors';

//
// const selectGlobal = (state) => {
//   if (typeof state === 'undefined') {
//     return () => null;
//   }
//   const globalState = state.get('global');
//   return globalState;
//   // return typeof globalState !== 'undefined' ? null : globalState;
// }

const selectGlobal = () => (state) => state.get('global');



const selectFeaturedSingleBig = () => createSelector(
  selectGlobal(),
  (globalState) => {
    let someFeaturedSingleBig = globalState.getIn(['dynamicRegions', 'featuredSingleBig']);
    if (typeof someFeaturedSingleBig.toJS === 'function') {
      someFeaturedSingleBig = someFeaturedSingleBig.toJS();
    }
    return someFeaturedSingleBig;
  }
);


export default selectFeaturedSingleBig;
export {
  selectFeaturedSingleBig,
};
