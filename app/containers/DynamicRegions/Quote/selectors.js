import { createSelector } from 'reselect';

  /**
  * Direct selector to the homeState
  */
const selectHome = () => (state) => state.get('home');

  /**
   * Other specific selectors
   */
// const selectQuote = () => createSelector(
//   selectHome(),
//   (homeState) => {
//     // do weed to put any defensive code in here?
//     console.log(`selectQuote`, homeState);
//     return homeState.get('quote');
//   }
// );

const selectQuote = () => createSelector(
  selectHome(),
  (homeState) => {
    // do weed to put any defensive code in here?
    // console.log(`selectQuote`, homeState);
    // return homeState.get('quote');
    if (typeof homeState !== 'undefined') {
      return homeState.get('quote');
    }
    return null;
  }
);

export {
  selectHome,
  selectQuote,
};

export default selectQuote;
