import { SET_LEADERBOARDINDEX, SET_LEADERBOARD_DISPLAYDATA, SET_LEADERBOARDSAFETY, START_ADREFRESHTIMER, AD_LEADERBOARD_JUSTFIRED, SET_LEADERBOARD_TIMERSAFETY, SET_LEADERBOARD_CONTENTSAFETY } from './constants';
import { msg } from 'utils/msg';

export function setLeaderboardIndex(leaderboardIndex) {
  // // console.log('action: setLeaderboardIndex('+leaderboardIndex+')')
  return {
    type: SET_LEADERBOARDINDEX,
    leaderboardIndex,
  }
}
export function setLeaderboardSafety(isSafe) {
  msg(`setLeaderboardSafety(${isSafe})`);
  return {
    type: SET_LEADERBOARDSAFETY,
    isSafe,
  }
}

export function setLeaderboardTimerSafety(isSafe) {
  return {
    type: SET_LEADERBOARD_TIMERSAFETY,
    isSafe,
  }
}

export function setLeaderboardContentCycleSafety(isSafe) {
  return {
    type: SET_LEADERBOARD_CONTENTSAFETY,
    isSafe,
  }
}

export function setLeaderboardDisplayData(current, inViewportWaypoints) {
  // console.log(`action: setLeaderboardDisplayData(${current}, [${inViewportWaypoints}])`);
  return {
    type: SET_LEADERBOARD_DISPLAYDATA,
    current,
    inViewportWaypoints,
  }
}


export function setAdTimePastMinimumThreshold(adTimePastMinimumThreshold) {
  return {
    type: START_ADREFRESHTIMER,
    adTimePastMinimumThreshold,
  }
}

export function adJustFired(index) {
  console.log(`adJustFired(${index})`);
  return {
    type: AD_LEADERBOARD_JUSTFIRED,
    index,
  }
}
