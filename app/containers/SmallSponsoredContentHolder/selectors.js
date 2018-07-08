// import { selectActive, selectSidebarIndex } from './selectors';

import { createSelector } from 'reselect';
import { selectGlobal, selectAds } from 'containers/App/selectors';

const selectCurrentSponsoredContentIndex = () => createSelector(
  selectGlobal,
  (globalState) => globalState.get('sponsoredContentIndexOne')
);

// const selectAds = () => createSelector(
//   selectGlobal,
//   (globalState) => {
//     // // console.log('selectAds()');
//     return globalState.get('ads')
//   }
// );
const selectSponsoredContent = () => createSelector(
  selectAds(),
  (ads) => {
    if (!ads) return null;
    if (!ads.sponsored_one) return null;
    return ads.sponsored_one;
  }
);

const selectSecondSponsoredContent = () => createSelector(
  selectAds(),
  (ads) => {
    if (!ads) return null;
    if (!ads.sponsored_two) return null;
    return ads.sponsored_two;
  }
);

const selectSponsoredContentSizes = () => createSelector(
  selectSponsoredContent(),
  (sponsoredContent) => {
    // // console.log('selectSizes()');
    if (sponsoredContent === null ) {
      return null;
    } else {
      return sponsoredContent.sizes;
    }
  }
);

const selectSponsoredContentID = () => createSelector(
  selectSponsoredContent(),
  (sponsoredContent) => {
    // // console.log('selectSizes()');
    if (sponsoredContent === null ) {
      return null;
    } else {
      return sponsoredContent.id;
    }
  }
);
//selectSecondSponsoredContentID
const selectSecondSponsoredContentID = () => createSelector(
  selectSecondSponsoredContent(),
  (sponsoredContent) => {
    if (sponsoredContent === null ) {
      return null;
    } else {
      return sponsoredContent.id;
    }
  }
);

export {
  selectCurrentSponsoredContentIndex,
  selectAds,
  selectSponsoredContent,
  selectSponsoredContentSizes,
  selectSponsoredContentID,
  selectSecondSponsoredContentID,
};
