
import { createSelector } from 'reselect';
import { selectGlobal } from 'containers/App/selectors';

const selectIsSearchPanelOpen = () => createSelector(
  selectGlobal,
  (globalState) => globalState.get('isSearchPanelOpen')
);

export {
  selectIsSearchPanelOpen,
};
