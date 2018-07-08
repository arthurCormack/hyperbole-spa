import { createSelector } from 'reselect';
const selectGlobal = () => (state) => state.get('global');

const selectSingleTile = () => createSelector(
  selectGlobal(),
  (globalState) => {
    // const someSingleTile = globalState.getIn(['dynamicRegions', 'singleTile']);
    // return someSingleTile;
    //
    let someSingleTile = globalState.getIn(['dynamicRegions', 'singleTile']);
    if (typeof someSingleTile.toJS === 'function') {
      someSingleTile = someSingleTile.toJS();
    }
    return someSingleTile;
  }
);

export default selectSingleTile;
export {
  selectSingleTile,
};
