import { createSelector } from 'reselect';

/**
 * Direct selector to the tilesPage state domain
 */
const selectTilesPageDomain = () => (state) => state.get('tilesPage');

/**
 * Other specific selectors
 */


/**
 * Default selector used by TilesPage
 */

const makeSelectTilesPage = () => createSelector(
  selectTilesPageDomain(),
  (substate) => substate.toJS()
);

const makeSelectTileStack = createSelector(
  makeSelectTilesPage(),
  (tilePage) => {
    tilePage.get('tileStack');
  }
);

export default makeSelectTilesPage;
export {
  makeSelectTilesPage,
  makeSelectTileStack,
  selectTilesPageDomain,
};
