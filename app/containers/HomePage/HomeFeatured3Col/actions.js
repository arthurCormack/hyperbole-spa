import { RECENTPOSTS_LOADED } from './constants';
export default function recentPostsDataLoaded(data) {
  // console.log('recentPostsDataLoaded');
  return {
    type: RECENTPOSTS_LOADED,
    data,
  };
}
