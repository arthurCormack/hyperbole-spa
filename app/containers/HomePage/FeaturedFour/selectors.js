import { createSelector } from 'reselect';
// import { selectGlobal } from 'containers/App/selectors';


// const selectGlobal = (state) => {
//   if (typeof state === 'undefined') {
//     return () => null;
//   }
//   const globalState = state.get('global');
//   return globalState;
//   // return typeof globalState !== 'undefined' ? null : globalState;
// }

// const selectGlobal = (state) => state.get('global');
const selectHome = (state) => state.get('home');

const selectFeaturedFourItems = () => createSelector(
  selectHome,
  (homeState) => {
    let items = homeState.get('featuredFour');
    if (typeof items.toJS === 'function') {
      return items.toJS();
    }
    return items;
  }
);

// const selectFeaturedFourItems = () => createSelector(
//   selectFeaturedFour(),
//   (featuredFour) => {
//     console.log(`selectFeaturedFourItems`, featuredFour.items);
//     // let items = featuredFour.get('items');
//     // if (typeof items.toJS === 'function') {
//     //   return items.toJS();
//     // }
//     // return items;
//     return featuredFour.items;
//   }
// );


export default selectFeaturedFourItems;
export {
  selectFeaturedFourItems,
};
