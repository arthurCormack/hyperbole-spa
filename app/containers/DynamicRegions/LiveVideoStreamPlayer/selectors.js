import { createSelector } from 'reselect';

// const selectHome = () => (state) => state.get('home');
const selectGlobal = () => (state) => state.get('global');

const selectVideoStreamData = () => createSelector(
  selectGlobal(),
  (globalState) => {
    const someVideoStreamData = globalState.get('liveVideoStreamData');
    // // console.log('selectRecentEvents() returns:' + someRecentEvents);
    // // console.log('someVideoStreamData=='+someVideoStreamData+'!!!!!!!');
    return someVideoStreamData;
  }
);



export default selectVideoStreamData;
export {
  selectVideoStreamData,
};
