import { SET_INTERSTITIALINDEX, SET_INTERSTITIAL_DISPLAYDATA, SET_INTERSTITIALSAFETY, START_ADREFRESHTIMER, AD_INTERSTITIAL_JUSTFIRED } from './constants';
import { msg } from 'utils/msg';

export function setInterstitialIndex(index) {
  // // console.log('action: setLeaderboardIndex('+leaderboardIndex+')')
  return {
    type: SET_INTERSTITIALINDEX,
    index,
  }
}
export function setInterstitialSafety(isSafe) {
  msg(`setLeaderboardSafety(${isSafe})`);
  return {
    type: SET_INTERSTITIALSAFETY,
    isSafe,
  }
}

export function setInterstitialDisplayData(current, inViewportWaypoints) {
  // console.log(`action: setLeaderboardDisplayData(${current}, [${inViewportWaypoints}])`);
  return {
    type: SET_INTERSTITIAL_DISPLAYDATA,
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
  return {
    type: AD_INTERSTITIAL_JUSTFIRED,
    index,
  }
}
