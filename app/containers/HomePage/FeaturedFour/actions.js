import { FEATUREDFOUR_LOADED } from './constants';
export default function featuredFourDataLoaded(data) {
  // console.log('featuredFourLoaded');
  return {
    type: FEATUREDFOUR_LOADED,
    data,
  };
}
