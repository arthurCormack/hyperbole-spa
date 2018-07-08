import { HOMETILE_LOADED } from './constants';
export default function homeTileDataLoaded(data) {
  return {
    type: HOMETILE_LOADED,
    data,
  };
}
