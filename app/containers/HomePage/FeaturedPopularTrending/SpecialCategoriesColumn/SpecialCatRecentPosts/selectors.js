import { createSelector } from 'reselect';

import { selectSpecialCategories } from 'containers/HomePage/FeaturedPopularTrending/selectors';

//  const selectGlobal = () => (state) => state.get('global');
//
//
// const selectSpecialCatRecentPosts = () => createSelector(
//   selectGlobal(),
//   (globalState) => {
//     let someSpecialCatRecentPosts = globalState.getIn(['dynamicRegions', 'specialCatRecentPosts']);
//     console.log(`selectSpecialCatRecentPosts()`, someSpecialCatRecentPosts);
//     if (someSpecialCatRecentPosts && typeof someSpecialCatRecentPosts.toJS === 'function') {
//       someSpecialCatRecentPosts = someSpecialCatRecentPosts.toJS();
//     }
//     return someSpecialCatRecentPosts;
//   }
// );
//
//
// export default selectSpecialCatRecentPosts;
// export {
//   selectSpecialCatRecentPosts,
// };

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


export default selectFeaturedFourItems;
export {
  selectFeaturedFourItems,
};
