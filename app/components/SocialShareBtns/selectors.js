
import { createSelector } from 'reselect';
import { selectGlobal } from 'containers/App/selectors';

const selectIsSocialSharingPanelOpen = () => createSelector(
  selectGlobal,
  (globalState) => globalState.get('isSocialSharingPanelOpen')
);
const selectSocialSharingTitle = () => createSelector(
  selectGlobal,
  (globalState) => globalState.get('socialSharingPanelTitle')
);

const selectSocialSharingURL = () => createSelector(
  selectGlobal,
  (globalState) => globalState.get('socialSharingPanelURL')
);
export {
  selectIsSocialSharingPanelOpen,
  selectSocialSharingTitle,
  selectSocialSharingURL,
};
