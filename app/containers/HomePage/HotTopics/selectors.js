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
// const selectHome = () => (state) => state.get('home');
const selectHome = (state) => state.get('home');

const selectHotTopics = () => createSelector(
  selectHome,
  (homeState) => {
    // let someHotTopicItems = globalState.getIn(['dynamicRegions', 'hotTopics']);
    // console.log(`HotTopics selectItems()`, homeState);
    let hotTopics = homeState.get('hotTopics');
    // console.log(`items`, items);
    if (typeof hotTopics.toJS === 'function') {
      return hotTopics.toJS();
    }
    // const items = false;
    return hotTopics;
  }
);

const selectItems = () => createSelector(
  selectHotTopics(),
  (hotTopics) => {
    // console.log(`selectItems()`, hotTopics);
    // const someItems = hotTopics.get('items');
    // console.log(`someItems`, someItems);
    // return someItems;
    // return false;
    return hotTopics.items;
  }
);

export default selectItems;
export {
  selectHotTopics,
  selectItems,
};
