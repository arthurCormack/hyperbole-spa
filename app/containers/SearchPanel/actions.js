import { TOGGLE_SEARCHPANEL } from './constants';

export function toggleSearchPanel(isSearchPanelOpen) {// state will be true for 'open' or false for 'closed'
  return {
    type: TOGGLE_SEARCHPANEL,
    isSearchPanelOpen,
  };
}



// export function searchLinkClicked() {
//   return {
//     type: SEAARCH_LINKCLICKED,
//   }
// }
