import { MOSTPOPULAR_LOADED } from './constants';
export default function mostPopularDataLoaded(data) {
  // console.log('mostPopularLoaded');
  return {
    type: MOSTPOPULAR_LOADED,
    data,
  };
}
