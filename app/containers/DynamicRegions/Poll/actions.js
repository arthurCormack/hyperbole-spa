import { HOMEPOLL_LOADED } from './constants';
export default function homePollLoaded(data) {
  // console.log('homePollLoaded');
  return {
    type: HOMEPOLL_LOADED,
    data,
  };
}
