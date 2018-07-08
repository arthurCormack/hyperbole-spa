import { createSelector } from 'reselect';
// selectSpecialCategories, selectHomeTile, selectTrendingColumn

const selectHome = (state) => state.get('home');

const selectFeaturedPopularTrending = () => createSelector(
  selectHome,
  (homeState) => {
    // if (!homeState) return false;
    // console.log(`selectFeaturedPopularTrending()`, homeState);
    let featuredPopularTrending = homeState.get('featuredPopularTrending');
    if (typeof featuredPopularTrending.toJS === 'function') {
      return featuredPopularTrending.toJS();
    }
    return featuredPopularTrending;

  }
);


const selectSpecialCategories = () => createSelector(
  selectFeaturedPopularTrending(),
  (fpt) => {
    // console.log(`selectSpecialCategories`, fpt);
    if (!fpt) return false;
    //
    // if (typeof specialCategories.toJS === 'function') {
    //   // return specialCategories.toJS();
    //   fpt.get('specialCategories');
    // }
    let specialCategories = fpt.specialCategories;
    return specialCategories;
  }
);

const selectHomeTile = () => createSelector(
  selectFeaturedPopularTrending(),
  (fpt) => {
    if (!fpt) return false;
    // let homeTile = fpt.get('homeTile');
    // if (typeof homeTile.toJS === 'function') {
    //   return homeTile.toJS();
    // }
    // return homeTile;
    return fpt.homeTile.hometile;
  }
);


const selectTrendingColumn = () => createSelector(
  selectFeaturedPopularTrending(),
  (fpt) => {
    // if (!fpt) return false;
    // let trendingColumn = fpt.get('trendingColumn');
    // if (typeof trendingColumn.toJS === 'function') {
    //   return trendingColumn.toJS();
    // }
    // return trendingColumn;
    return fpt.trendingColumn;
  }
);
const selectLoading = () => createSelector(
  selectFeaturedPopularTrending(),
  (fpt) => {
    return fpt.loading;
  }
);
const selectError = () => createSelector(
  selectFeaturedPopularTrending(),
  (fpt) => {
    return fpt.error;
  }
);

export default selectSpecialCategories;
export {
  selectSpecialCategories,
  selectHomeTile,
  selectTrendingColumn,
  selectLoading,
  selectError,
};
