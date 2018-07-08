// specialCatRecentPostsDataLoaded, getSpecialRecentPostsForTag
import { SPECIALCATRECENTPOSTSDATALOADED, GETSPECIALRECENTPOSTSFORTAG  } from './constants';

export function specialCatRecentPostsDataLoaded(data) {
  return {
    type : SPECIALCATRECENTPOSTSDATALOADED,
    data,
  };
}
export function getSpecialRecentPostsForTag(tag) {
  // console.log(`getSpecialRecentPostsForTag tag=${tag}`);
  return {
    type : GETSPECIALRECENTPOSTSFORTAG,
    tag,
  };
}
