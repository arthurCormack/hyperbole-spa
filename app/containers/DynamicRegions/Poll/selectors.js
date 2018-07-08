import { createSelector } from 'reselect';

/**
 * Direct selector to the globalState
 */
 const selectGlobal = () => (state) => state.get('global');

 /**
  * Other specific selectors
  */


 const selectHomePollItems = () => createSelector(
   selectGlobal(),
   (globalState) => {
     //const someHomeHero = globalState.getIn(['dynamicRegions', 'homeHero']);
     // we want to either return markup, that has the admin menu, or return null ...
     // perhaps the saga should inspect the markup before it dispatches the action for success ... and adjust what it sets in adminMenuMarkup data
     let someHomePollItems = globalState.getIn(['dynamicRegions', 'homePoll']);
     if (typeof someHomePollItems.toJS === 'function') {
       someHomePollItems = someHomePollItems.toJS();
     }
    //  // console.log('selectHomeHeroItems()');
    //  // console.log(someHomeHeroItems);
     return someHomePollItems;
   }
 );


 export default selectHomePollItems;
 export {
   selectHomePollItems,
 };
