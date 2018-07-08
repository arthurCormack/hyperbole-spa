import { CURRENTMAG_LOADED } from './constants';
export default function currentMagLoaded(data) {
  // console.log('currentMagLoaded');
  return {
    type: CURRENTMAG_LOADED,
    data,
  };
}
