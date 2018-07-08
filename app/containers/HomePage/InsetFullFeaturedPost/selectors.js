import { createSelector } from 'reselect';

const selectHome = (state) => state.get('home');

const selectInsetFullFeatured = () => createSelector(
  selectHome,
  (homeState) => {
    // let someHotTopicItems = globalState.getIn(['dynamicRegions', 'hotTopics']);
    // console.log(`HotTopics selectItems()`, homeState);
    let insetFeatured = homeState.get('insetFeatured');
    // console.log(`items`, items);
    if (typeof insetFeatured.toJS === 'function') {
      return insetFeatured.toJS();
    }
    // const items = false;
    return insetFeatured;
  }
);

const selectItems = () => createSelector(
  selectInsetFullFeatured(),
  (insetFullFeatured) => {
    // console.log(`selectItems()`, hotTopics);
    // const someItems = hotTopics.get('items');
    // console.log(`someItems`, someItems);
    // return someItems;
    // return false;
    return insetFullFeatured.items;
  }
);

export default selectItems;
export {
  selectInsetFullFeatured,
  selectItems,
};
