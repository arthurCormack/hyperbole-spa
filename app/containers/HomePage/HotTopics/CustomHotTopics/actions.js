import { CUSTOMHOTTOPICS_LOADED } from './constants';
export default function customHotTopicsDataLoaded(data) {
  // console.log('customHotTopicsDataLoaded');
  return {
    type: CUSTOMHOTTOPICS_LOADED,
    data,
  };
}
