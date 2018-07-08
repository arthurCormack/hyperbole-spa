import { createSelector } from 'reselect';
import { selectGlobal } from 'containers/App/selectors';
/**
 * Direct selectors to the singlePosts state stuff
 */

const selectArchive = () => (state) => {
  return state.get('archive').toJS();
}

const selectLoading = () => createSelector(
  selectArchive(),
  (archive) => {
    if (archive == null) {
      return null;
    }
    return archive.loading;
  }
);


const selectCurrentlyDisplayedArchiveTitle = () => createSelector(
  selectTermData(),
  (termData) => {
    if (termData === null) return '';
    return termData.name;
  }
);

// selectTermData,
// selectArchiveStack,
const selectTermData = () => createSelector(
  selectArchive(),
  (archive) => {
    // // console.log('selectTermData()');
    // // console.log(archive);
    // return archive.archiveStack;
    return archive.termData
  }
);

const selectArchiveStack = () => createSelector(
  selectArchive(),
  (archive) => {
    return archive.archiveStack;
  }
);

const selectCurrentlyDisplayedChunkIndex = () => createSelector(
  selectArchive(),
  (archive) => {
    return archive.currentlyDisplayedChunkIndex;
  }
);
const selectWaypointsInViewport = () => createSelector(
  selectArchive(),
  (archive) => {
    return archive.waypointsInViewport;
  }
);

const selectInitialPageNumber = () => createSelector(
  selectArchive(),
  (archive) => {
    return archive.initialPageNumber;
  }
);


const selectForceRender = () => createSelector(
  selectArchive(),
  (archive) => {
    return archive.forceRender;
  }
);

// chunkIndex
const selectFoundRoute = () => createSelector(
  selectArchive(),
  (archive) => {
    return archive.foundRoute;
  }
);
const selectAds = () => createSelector(
  selectGlobal,
  (globalState) => {
    return globalState.get('ads')
  }
);
const selectBigBoxAOne = () => createSelector(
  selectAds(),
  (ads) => {
    return ads.bigboxAOne;
  }
);
const selectBigBoxATwo = () => createSelector(
  selectAds(),
  (ads) => {
    return ads.bigboxATwo;
  }
);
const selectBigBoxBOne = () => createSelector(
  selectAds(),
  (ads) => {
    return ads.bigboxBOne;
  }
);
const selectBigBoxBTwo = () => createSelector(
  selectAds(),
  (ads) => {
    return ads.bigboxBTwo;
  }
);
const selectSponsoredContentAOne = () => createSelector(
  selectAds(),
  (ads) => {
    return ads.sponsoredAOne;
  }
);
const selectSponsoredContentATwo = () => createSelector(
  selectAds(),
  (ads) => {
    return ads.sponsoredATwo;
  }
);
const selectSponsoredContentBOne = () => createSelector(
  selectAds(),
  (ads) => {
    return ads.sponsoredBOne;
  }
);
const selectSponsoredContentBTwo = () => createSelector(
  selectAds(),
  (ads) => {
    return ads.sponsoredBTwo;
  }
);
const selectWallpaper = () => createSelector(
  selectAds(),
  (ads) => {
    return ads.wallpaper;
  }
);

export default selectArchive;
export {
  selectArchive,
  selectLoading,
  selectTermData,
  selectArchiveStack,
  selectCurrentlyDisplayedArchiveTitle,
  selectCurrentlyDisplayedChunkIndex,
  selectFoundRoute,
  selectWaypointsInViewport,
  selectInitialPageNumber,
  selectForceRender,
  selectBigBoxAOne,
  selectBigBoxATwo,
  selectBigBoxBOne,
  selectBigBoxBTwo,
  selectSponsoredContentAOne,
  selectSponsoredContentATwo,
  selectSponsoredContentBOne,
  selectSponsoredContentBTwo,
  selectWallpaper,
};
