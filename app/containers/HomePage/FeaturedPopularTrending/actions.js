import { LOAD_FEATUREDPOPULARTRENDING, LOAD_FEATUREDPOPULARTRENDING_SUCCESS, LOAD_FEATUREDPOPULARTRENDING_FAILURE } from './constants';

export function loadFeaturedPopularTrending() {
  return {
    type: LOAD_FEATUREDPOPULARTRENDING,
  };
}

export function loadFeaturedPopularTrendingSuccess({ specialCategories, homeTile, trendingColumn }) {
  return {
    type: LOAD_FEATUREDPOPULARTRENDING_SUCCESS,
    specialCategories,
    homeTile,
    trendingColumn,
  };
}

export function loadFeaturedPopularTrendingFailure() {
  return {
    type: LOAD_FEATUREDPOPULARTRENDING_FAILURE,
  };
}
export default loadFeaturedPopularTrending;
