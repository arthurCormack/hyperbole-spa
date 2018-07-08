import { createSelector } from 'reselect';

const selectHome = (state) => state.get('home');

const selectFeatured = () => createSelector(
  selectHome,
  (homeState) => {

    let featuredStuff = homeState.get('featured');
    // console.log(`items`, items);
    if (typeof featuredStuff.toJS === 'function') {
      return featuredStuff.toJS();
    }
    // const items = false;
    return featuredStuff;
  }
);

const selectItems = () => createSelector(
  selectFeatured(),
  (featuredStuff) => {
    // console.log(`selectItems()`, featuredStuff);

    return featuredStuff.items;
  }
);

export default selectItems;
export {
  selectFeatured,
  selectItems,
};
