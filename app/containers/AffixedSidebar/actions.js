// import { SET_SIDEBARINDEX, SET_SIDEBAR_DISPLAYDATA } from 'containers/App/constants';
// import { AD_SIDEBAR_JUSTFIRED } from './constants';
import { SET_SIDEBARINDEX, SET_SIDEBAR_DISPLAYDATA, START_ADREFRESHTIMER, AD_SIDEBAR_JUSTFIRED, SET_SIDEBAR_TIMERSAFETY, SET_SIDEBAR_CONTENTSAFETY, SET_SIDEBARSAFETY } from './constants';


export function setSidebarIndex(sidebarIndex) {

  return {
    type: SET_SIDEBARINDEX,
    sidebarIndex,
  };
}

export function setSidebarDisplayData(current, inViewportWaypoints) {
  // console.log(`action: setSidebarDisplayData(${current})`);
  return {
    type: SET_SIDEBAR_DISPLAYDATA,
    current,
    inViewportWaypoints,
  }
}

export function adJustFired(index) {
  return {
    type: AD_SIDEBAR_JUSTFIRED,
    index,
  }
}
