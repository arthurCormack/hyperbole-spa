// selectSelectedRegion

import { createSelector } from 'reselect';

const selectGlobal = () => (state) => state.get('global');

const selectSelectedStream = () => createSelector(
  selectGlobal(),
  (globalState) => {
    const someSelectedStream = globalState.get('selectedStream');
    // // console.log('someSelectedStream=='+someSelectedStream);
    return someSelectedStream;
  }
);

export default selectSelectedStream;
export {
  selectSelectedStream,
};
