// import { selectActive, selectSidebarIndex } from './selectors';

import { createSelector } from 'reselect';
import { selectGlobal } from 'containers/App/selectors';

const selectAds = () => createSelector(
  selectGlobal,
  (globalState) => {
    // // console.log('selectAds()');
    return globalState.get('ads')
  }
);
const selectAdID = () => createSelector(
  selectAds(),
  (ads) => {
    if (!ads) return null;
    if (!ads.wallpaper) return null;
    return ads.wallpaper.id;
  }
);


export {
  selectAds,
  selectAdID,
};
