import { createSelector } from 'reselect';
// import { selectGlobal } from 'containers/App/selectors';


// const selectGlobal = (state) => {
//   if (typeof state === 'undefined') {
//     return () => null;
//   }
//   const globalState = state.get('global');
//   return globalState;
//   // return typeof globalState !== 'undefined' ? null : globalState;
// }
// const selectGlobal = () => (state) => state.get('global');
const selectHome = (state) => state.get('home');

const selectCustomHotTopicItems = () => createSelector(
  selectGlobal(),
  (globalState) => {
    let someCustomHotTopicItems = globalState.getIn(['dynamicRegions', 'customHotTopics']);
    if (typeof someCustomHotTopicItems.toJS === 'function') {
      someCustomHotTopicItems = someCustomHotTopicItems.toJS();
    }
    return someCustomHotTopicItems;
  }
);


export default selectCustomHotTopicItems;
export {
  selectCustomHotTopicItems,
};
