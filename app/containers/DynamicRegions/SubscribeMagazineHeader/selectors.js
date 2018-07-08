import { createSelector } from 'reselect';

/**
 * Direct selector to the globalState
 */
 const selectGlobal = () => (state) => state.get('global');

 /**
  * Other specific selectors
  */


 const selectCurrentMagItems = () => createSelector(
   selectGlobal(),
   (globalState) => {
    let someCurrentMagItems = globalState.getIn(['dynamicRegions', 'currentMag']);
    if (typeof someCurrentMagItems.toJS === 'function') {
     someCurrentMagItems = someCurrentMagItems.toJS();
    }
    return someCurrentMagItems;
   }
 );


 export default selectCurrentMagItems;
 export {
   selectCurrentMagItems,
 };
