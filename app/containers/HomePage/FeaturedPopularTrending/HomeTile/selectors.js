import { createSelector } from 'reselect';

//  const selectGlobal = () => (state) => state.get('global');
//
//
// const selectHomeTile = () => createSelector(
//   selectGlobal(),
//   (globalState) => {
//     let someHomeTile = globalState.getIn(['dynamicRegions', 'homeTile']);
//     if (typeof someHomeTile.toJS === 'function') {
//       someHomeTile = someHomeTile.toJS();
//     }
//     return someHomeTile;
//   }
// );


const selectHome = (state) => state.get('home');


export default selectHomeTile;
export {
  selectHomeTile,
};
