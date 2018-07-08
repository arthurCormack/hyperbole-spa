import { createSelector } from 'reselect';
const selectGlobal = () => (state) => state.get('global');

/**
 * Default selector used by RadioPlayer
 */


const selectSocketConnectionEstablished = () => createSelector(
  selectGlobal(),
  (globalState) => {
    let socketConnectionEstablished = globalState.getIn(['socketConnectionEstablished']);
    return socketConnectionEstablished;
  }
);

const selectPerformances = () => createSelector(
  selectGlobal(),
  (globalState) => {
    let somePerformances = globalState.getIn(['dynamicRegions', 'latestPerformances']);
    return somePerformances;
  }
);

const selectRadioPlayer = () => createSelector(
  selectGlobal(),
  (globalState) => {
    const someRadioPlayer = globalState.getIn(['radio']);
    return someRadioPlayer;
  }
);

const selectParsedScheduleData = () => createSelector(
  selectGlobal(),
  (globalState) => {
    const parsedScheduleData = globalState.getIn(['dynamicRegions', 'parsedScheduleData']);
    return parsedScheduleData;
  }
);

const selectStreamURL = () => createSelector(
  selectGlobal(),
  (globalState) => {
    // // console.log('selectStreamURL()');
    //return 'cheese';
    let streamURL = globalState.getIn(['dynamicRegions', 'streamData']);
    // // console.log('streamURL=='+streamURL);
    if (typeof streamURL !== 'string'){
      streamURL = null;
    }
    return streamURL;
  }

);


export default selectRadioPlayer;
export {
  selectSocketConnectionEstablished,
  selectPerformances,
  selectRadioPlayer,
  selectStreamURL,
};
