import { TRENDINGLIST_LOADED } from './constants';
export default function trendingListDataLoaded(data) {
  // console.log('trendingListDataLoaded');
  return {
    type: TRENDINGLIST_LOADED,
    data,
  };
}
