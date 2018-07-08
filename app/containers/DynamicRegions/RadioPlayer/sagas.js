import { take, call, put, select, fork } from 'redux-saga/effects';
import { takeLatest, takeEvery } from 'redux-saga';

import { SOCKET_RECEIVE_DOCHANNELREGISTRATION,  SOCKET_SEND_CHANNELREGISTRATION, SOCKET_RECEIVE_PERFORMANCESDATA, YOUTUBE_VIDEO_PLAYCOMMAND } from 'containers/App/constants';
import { CONTROL_DRAWER } from 'containers/PageWrapper/constants';

import { sendChannelRegistration, controlRadio } from 'containers/App/actions';

import { selectPerformances, selectSocketConnectionEstablished, selectRadioPlayer } from './selectors';
import { selectSelectedStream } from 'containers/DynamicRegions/StreamFilters/selectors';
// Individual exports for testing
function* factorCurrentShow() {
  // // console.log('factorCurrentShow()');
  // look at what day/time it is now, and look inside the
  // global.dynamicRegions.parsedScheduleData and figure out what the current show is. and set that in global.
  // should this be a reselect selector?
  // maybe ... it cares about what the current piece is ...
}

function* receivePerformanceData(action) {
  // // console.log('RadioPlayer Saga: receivePerformanceData()')
  // // console.log(action.data);
  // let's also update the currentShow!
  const todaysDateTime = new Date();
  // what dayNum is today, what day of the week is today? what year is Today?
  const todaysDaynum = todaysDateTime.getDay();
  const tomorrowsDayObj = new Date(Date.now() + 1*24*60*60*1000);
  const tommorowsDayNum = tomorrowsDayObj.getDay();
}
function* doChannelRegistration() {
  // we need to put an action, and pass in our channel. how do we know what channel we are?
  // the channel that we are is passed in as an environment variable?
  // how to we pass in a variable that is set at runtime, to the client?
  // // console.log('doChannelRegistration()');

  const someChannel = yield select(selectSelectedStream());
  // console.log('someChannel=='+someChannel);
  yield put(sendChannelRegistration(someChannel));// this should emit a socket connection to the server
}


function* dealWithDrawerOpening(action) {
  // // console.log('hi dealWithDrawerOpening()');
  // // console.log(action);
  if (action.drawerAction == 'open') {

  }
}
function* drawerOpeningWatcher() {
  while (true) {
    let someAction = yield take(CONTROL_DRAWER);
    yield call(dealWithDrawerOpening, someAction);
  }
}


export function* getPerformanceDataWatcher() {
  // // console.log('getPerformanceDataWatcher()');
  yield fork(takeLatest, SOCKET_RECEIVE_PERFORMANCESDATA, receivePerformanceData);
}

function* youtubeVideoPlayWatcher() {
  while(true) {
    let somePlayCommand = yield take(YOUTUBE_VIDEO_PLAYCOMMAND);
    // console.log('hooray, we have captured a YOUTUBE_VIDEO_PLAYCOMMAND!!!');
  }
}

// export function* getShowScheduleDataWatcher() {
//   while (true) {
//     let someAction = yield take(SHOWSSCHEDULE_PARSEDDATA);
//     yield call(dealWithNewScheduleData, someAction);
//   }
// }

export function* firstVideoPlayWatcher() {
  //const firstPlayListener = yield fork(youtubeVideoPlayWatcher);
  let firstPlayFlag = false;
  while (!firstPlayFlag) {
    yield take(YOUTUBE_VIDEO_PLAYCOMMAND);
    // console.log('and now we should be cancelling the firstPlayListener');
    firstPlayFlag = true;
  }
  // console.log('we shouldnt see this unless firstPlayFlag == true');
  // let's pause the radio player!
  yield put(controlRadio('pause'));
  // console.log('and now we our saga has ended ...');

  // yield cancel(firstPlayListener);
}
// export const getSocketConnectionEstablished = (globalState) => globalState.socketConnectionEstablished;
// export const getSocketConnectionEstablished = (globalState) => globalState.socketConnectionEstablished;
// export const getGlobalState = (state) => state;

export function* radioSaga() {
  // // console.log('radioSaga()');
  const isTheSocketEstablished = yield select(selectSocketConnectionEstablished());
  //// console.log('isTheSocketEstablished=='+isTheSocketEstablished);
  yield call( doChannelRegistration );
  yield fork( getPerformanceDataWatcher );
  yield fork( drawerOpeningWatcher );

  // yield fork( firstVideoPlayWatcher );

  // the problem, that I have discovered, is that, by the time this saga get's initialized, the SOCKET_RECEIVE_DOCHANNELREGISTRATION has already happened!!!
  // the socket gets established very early on in the apps lifecycle
  // so possible solutions / workarounds, include:
  // delaying the doChannelRegistration command to the socket from the server, by a second or so.
  // having the reducer (which is present, and able to capture data!) store some data in state that can be inspected by the saga. possibly by using a selector.


}

// All sagas to be loaded
export default [
  radioSaga,
];
