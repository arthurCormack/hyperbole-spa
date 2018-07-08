import { FEATUREDSINGLEBIG_LOADED } from './constants';
export default function featuredSingleBigDataLoaded(data) {
  // console.log('featuredSingleBigDataLoaded');
  return {
    type: FEATUREDSINGLEBIG_LOADED,
    data,
  };
}
