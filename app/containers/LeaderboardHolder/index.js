/**
*
* LeaderboardHolder
*
*/

import React from 'react';
import PropTypes from 'prop-types';

import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import { setLeaderboardIndex, setLeaderboardDisplayData, adJustFired } from './actions';

import Waypoint from 'react-waypoint';
import { clone } from 'lodash';
import { media } from 'style-utils';
import styled, { css } from 'styled-components';
import Leaderboard from 'components/Leaderboard';

// import Tower from 'components/Tower';

import { isClientMobile } from 'utils/detection';

import {
  makeSelectDoesCurrentItemMatchCurrentAddressYet,
  selectCurrentLeaderboardIndex,
  selectLeaderboardsInViewport,
  selectLastLeaderboardFired,
  selectID,
  selectSizes,
  selectMobileInterstitialID,
  selectMobileInterstitialSizes,
  selectLeaderboardSafety,
  selectLeaderboardTimerSafety,
  selectLeaderboardContentCycleSafety,
  selectAllAdsContentCycleSafety,
} from './selectors';

class LeaderboardHolder extends React.Component { // eslint-disable-line react/prefer-stateless-function
  constructor() {
    super();
    this.leaderboardWaypointEnter.bind(this);
    this.leaderboardWaypointLeave.bind(this);
  }
  componentWillMount () {

  }
  componentDidMount() {
    // // console.log('LeaderboardHolder '+this.props.index+' componentDidMount');
  }
  componentDidUpdate() {
    // msg('LeaderboardHolder '+this.props.index+' componentDidUpdate');
    // console.log(`LeaderboardHolder[${this.props.index}] componentDidUpdate()`, this.props);
    if (this.props.safety && this.props.contentCycleSafety && this.props.index === this.props.currentLeaderboardIndex && this.props.index !== this.props.lastLeaderboardFired) {
      // we need to dispatch an action that will set the index of the lastRenderedLeaderboardIndex, but only if it hasn't already been fired yet.
      // So this.props.index === this.props.currentLeaderboardIndex fetermines whether is should fire
      // and this.props.index !== this.props.lastAdFired determines whether it has already fired.
      // we only fire if we are supposed to fire but have not already done so. it is imperative that it only gets fired once here, otherwise  anti-pattern nightmare becomes reality
      this.props.adJustFired(this.props.index);// dispatching actions when components have already updated is usually considered an anti-pattern; ie: very bad. but in the case, neccesary.

    }
  }

  /*
  how can we be sure of when is the proper time, and not the proper time to render new ads?
  it has to do with the CA (content authority).
  ... each content node cycle ... or content load cycle or content display cycle
  should be stored. not just in a wp_request object, and we can check the status of the current thing.
  do really really need to keep all of them?
  or is it sufficient to replace the current one whenever a new cycle starts ... before we do getPost, we set it, with status=loading, and then status=complete after getPost completes loading, becaus ethat is when we need to load and then display a new thing

  but in other cases
  2 - problems simultaneously - the leaderboardHolders need to establish which one in the stack it is is
  */

  shouldComponentUpdate(nextProps) {


    // return true;
    // return false;
    // // console.log('nextProps==');
    // compare whether or not nextProps.index === this.props.index
    // // console.log('LeaderboardHolder '+this.props.index+' shouldComponentUpdate');
    // // console.log(this.props);
    // // console.log(nextProps);

    // bear in mind the possibility that a leaderboard might not bein the viewport when the address changes ... so the safety will come and go, without a render of a leaderboard -
    // so we need to handle circumstances where the safety change might not be the thing that precipitates an ad render!

    // if (this.props.adID === null && typeof nextProps.adID === 'string') {
    //   return true;
    // }
    if (this.props.lastLeaderboardFired === this.props.index) {
      return false;
    } else {
      if (this.props.safety) {
        return true;
      }
    }
    if (this.props.adID !== nextProps.adID) {
      return true;
    }
    if (!this.props.contentCycleSafety && nextProps.contentCycleSafety) {
      return true;
    }

    const isActive = this.props.index === this.props.currentLeaderboardIndex;
    const willBeActive = this.props.index === nextProps.currentLeaderboardIndex;

    // console.log(`LeaderboardHolder[${this.props.index}].shouldComponentUpdate()`, isActive, willBeActive, this.props.safety, nextProps.safety );
    // console.log(`this.props.lastLeaderboardFired=`, this.props.lastLeaderboardFired, `nextProps.lastLeaderboardFired=`, nextProps.lastLeaderboardFired);

    if (!this.props.safety && nextProps.safety) {
      // console.log(`LeaderboardHolder.shouldComponentUpdate()`, this.props.safety, nextProps.safety);
      if (this.props.lastLeaderboardFired !== nextProps.lastLeaderboardFired) {
        return true;
      } else {
        // msg(`this.props.lastLeaderboardFired==${this.props.lastLeaderboardFired}, nextProps.lastLeaderboardFired==${nextProps.lastLeaderboardFired}`);
        // console.log(`this.props.lastLeaderboardFired`, this.props.lastLeaderboardFired);
        if (this.props.lastLeaderboardFired === false && nextProps.lastLeaderboardFired === false) {
          return true;
        }
      }


    } else if (this.props.safety && isActive !== willBeActive) {
      // we really ought to dispatch a new safety after the ads are firing?!
      return true;
      // if (this.props.doesCurrentItemMatchCurrentAddressYet !== nextProps.doesCurrentItemMatchCurrentAddressYet) {
      //   return true;
      // }
    }
    if (!this.props.postStackItemConnection && nextProps.postStackItemConnection ) {
      return true;
    }

    if (isActive && this.props.safety !== nextProps.safety) {
      // return true;
      // console.log(`isActive && this.props.safety !== nextProps.safety, `, this.props.doesCurrentItemMatchCurrentAddressYet);
      if (this.props.doesCurrentItemMatchCurrentAddressYet !== nextProps.doesCurrentItemMatchCurrentAddressYet) {
        return true;
      }
    }
    // console.log(`false`);


    // if (this.props.safety && isActive !== willBeActive) {
    //   return true;
    // }


    return false;

    // if (this.props.adID !== nextProps.adID) {
    //   // // console.log('this.props.adID !== nextProps.adID');
    //   if (typeof nextProps.adID === string)
    //   return true;
    // }

    // return false;

    // if (this.props.doesCurrentItemMatchCurrentAddressYet !== nextProps.doesCurrentItemMatchCurrentAddressYet) {
    //   return true;
    // }




    // // console.log('isActive=='+isActive+', willBeActive=='+willBeActive);

    // if (isActive !== willBeActive) {
    //   // console.log('isActive ('+isActive+') !== willBeActive');
    //   // console.log('supposed to be returning true here ...');
    //   return true;// this will work, if we are turning on or off.
    // } else {
    //   // console.log('isActive === willBeActive == ' + isActive);
    //   return false;
    // }
    // when turning on, it has to wait for safety, but turning off happens right away.
    // if (isActive !== willBeActive) {
    //   if (isActive) {
    //     if (nextProps.safety) {
    //       return true;
    //     } else {
    //       return false;
    //     }
    //   } else {
    //     return true;
    //   }
    //
    //
    // } else {
    //   if (nextProps.safety && !this.props.safety) {
    //     return true;
    //   }
    //   return false;
    //
    // }
    // // let postStackItemConnectionRequirementFulfillment = true;
    // if (this.props.requirePostStackItemConnection && !this.props.postStackItemConnection) {
    //   // postStackItemConnectionRequirementFulfillment = false
    //
    // }
    // return true;
  }

  leaderboardWaypointEnter(index) {
    // console.log(`leaderboardWaypointEnter(${index}), this.props.safety==${this.props.safety}`);
    this.props.addLeaderboardToViewport(index, this.props.leaderboardsInViewport, this.props.currentLeaderboardIndex);
  }


  leaderboardWaypointLeave(index) {
    // console.log(`leaderboardWaypointLeave(${index})`);
    this.props.removeLeaderboardFromViewport(index, this.props.leaderboardsInViewport, this.props.currentLeaderboardIndex);
  }

  render() {

    /*
    if we arrive on page 4, we need to make it so that the chunkindexes aren't tied to the pageNums
    because that first chunk should trigger a page change to page 4, since it was the first thing that was loaded there.
    subsequent pages should increment from there, but the begging of the stack should be at whatever page we initially arrived at
    */

    console.log(`LeaderboardHolder [${this.props.index}] render`);

    const LeaderboardHolderWrapper = styled.div`
      position: relative;
      display: block;
      clear: both;
      min-height: 180px;
      ${media.medium`
        min-height: 70px;
      `}
    `;

    if (this.props.id === null) {
      return <LeaderboardHolderWrapper />;
    }

    if (!this.props.contentCycleSafety) {
      return <LeaderboardHolderWrapper />;
    }

    // let stuff = null;
    let postStackItemConnectionRequirementFulfillment = true;
    if (this.props.requirePostStackItemConnection && (!this.props.postStackItemConnection || !this.props.doesCurrentItemMatchCurrentAddressYet)) {
      postStackItemConnectionRequirementFulfillment = false
    }
    // the whole notion of this.props.index === this.props.currentLeaderboardIndex, of a currently displayed index is about to change.
    // it might be that we do away with it altogether, or, make it a bit more sophisticated, and think of an array of currentlyDisplayed items, similar to how we do waypoints, and posts.
    // this way, we don't have to determine a single one.
    // instead what, hay
    if (this.props.safety && this.props.adID !== null && this.props.index === this.props.currentLeaderboardIndex && postStackItemConnectionRequirementFulfillment) {
      // then it is the same as active, which is difiicult to get from a selector, becuas ei haven't figured out how to pass props in as parameters to the createSelector call
      // solution ... don't render the bottom leaderboard, until after the bottom poststack itme has become the current thing!
      // now ... how do we do that?

      let someAdUnit;
      if (isClientMobile()) {
        someAdUnit = (
          <Leaderboard test="bananas" index={this.props.index} adID={this.props.mobileInterstitialID} adSizes={this.props.mobileInterstitialSizes} active={this.props.currentLeaderboardIndex === this.props.index ? true : false} key={`leaderboard_${this.props.index}`} />
        )
      } else {
        someAdUnit = (
          <Leaderboard index={this.props.index} adID={this.props.adID} adSizes={this.props.adSizes} active={this.props.currentLeaderboardIndex === this.props.index ? true : false} key={`leaderboard_${this.props.index}`} />
        );
      }
      console.log(`LeaderboardHolder[${this.props.index}].render() with someAdUnit!`);
      return(
        <LeaderboardHolderWrapper>
          <Waypoint
            onEnter={({ previousPosition, currentPosition, event }) => {
              // this.props.leaderboardEntry(this.props.index);
                this.leaderboardWaypointEnter(this.props.index);
            }}
            onLeave={({previousPosition, currentPosition, event }) => {
              this.leaderboardWaypointLeave(this.props.index);
            }}
            // topOffset="15%"
            // bottomOffset="15%"
          >
            <div>
              { someAdUnit }
            </div>
          </Waypoint>
        </LeaderboardHolderWrapper>
      );
    } else {
      return(
        <LeaderboardHolderWrapper>
          <Waypoint
            onEnter={({ previousPosition, currentPosition, event }) => {
              // this.props.leaderboardEntry(this.props.index);
              this.leaderboardWaypointEnter(this.props.index);
            }}
            onLeave={({previousPosition, currentPosition, event }) => {
              this.leaderboardWaypointLeave(this.props.index);
            }}
          />
        </LeaderboardHolderWrapper>
      );
    }
  }
}

// currentLeaderboardIndex
LeaderboardHolder.propTypes = {
  currentLeaderboardIndex: PropTypes.oneOfType([
    PropTypes.bool,
    PropTypes.number,
  ]),

  index: PropTypes.number,
};

const mapStateToProps = createStructuredSelector({
  currentLeaderboardIndex: selectCurrentLeaderboardIndex(),
  leaderboardsInViewport: selectLeaderboardsInViewport(),
  lastLeaderboardFired: selectLastLeaderboardFired(),
  adID: selectID(),
  adSizes: selectSizes(),
  mobileInterstitialID: selectMobileInterstitialID(),
  mobileInterstitialSizes: selectMobileInterstitialSizes(),
  doesCurrentItemMatchCurrentAddressYet: makeSelectDoesCurrentItemMatchCurrentAddressYet(),
  safety: selectLeaderboardSafety(),
  timerSafety: selectLeaderboardTimerSafety(),
  // contentCycleSafety: selectLeaderboardContentCycleSafety(),
  contentCycleSafety: selectAllAdsContentCycleSafety(),
});
// selectID, selectSizes
LeaderboardHolder.defaultProps = {

   // currentLeaderboardIndex: 0,

  leaderboardsInViewport: [],
  index: null,
  lastLeaderboardFired: null,
  adID: null,
  adSizes: null,
  mobileInterstitialID: null,
  mobileInterstitialSizes: null,
  requirePostStackItemConnection: false,
  postStackItemConnection: false,
  doesCurrentItemMatchCurrentAddressYet: false,
  safety: false,
  timerSafety: false,
  contentCycleSafety: false,
}


// but the saga is listening to the loadCategorizedPostData action, not the LOCATION_CHANGE .... is that right?
// eureka ... i know what the problem here is, with the ads flickering ... its the saga, that take(SET_CURRENTPOSTSTACKDISPLAYDATA) ... it pushes a location change! and that causes a re-render ...
// so ... the solution is to have a check to see if the currentItem corresponds to the current address or not.
// is all the data that we need to determin this in state already?
// so ... what is meant by safety ...
// it really means safety for first render - no safety for subsequent renders.
// so ...
// so ... do we need to worry about the subsequent renders here? would that not be controlled instead in the SinglePostPage container?
// yes, I suppose so ...

function mapDispatchToProps(dispatch) {
  return {
    leaderboardEntry: (index) => {
      dispatch(setLeaderboardIndex(index));
    },
    addLeaderboardToViewport: (waypointIndex, waypointsInViewport, currentlyDisplayedItemIndex) => {
      const someIndex = waypointsInViewport.indexOf(waypointIndex);
      // console.log(`this.props.addLeaderboardToViewport(${waypointIndex}, [${waypointsInViewport}], ${currentlyDisplayedItemIndex})`);
      if (someIndex === -1) {
        const farthestDownIndex = Math.max(...waypointsInViewport, waypointIndex);
        // // console.log(`this.props.addLeaderboardToViewport, setting, dispatching::${farthestDownIndex}`);
        dispatch(setLeaderboardDisplayData(farthestDownIndex, [...waypointsInViewport, waypointIndex]));
      } else {
      }
    },
    removeLeaderboardFromViewport: (waypointIndex, waypointsInViewport, currentlyDisplayedItemIndex) => {
      // console.log(`this.props.removeLeaderboardFromViewport(${waypointIndex}, [${waypointsInViewport}], ${currentlyDisplayedItemIndex})`);
      let remainingDisplayedItemIndexes = clone(waypointsInViewport);
      const indexOfWaypointToBeRemoved = remainingDisplayedItemIndexes.indexOf(waypointIndex);
      if (indexOfWaypointToBeRemoved !== -1) {
        remainingDisplayedItemIndexes.splice(indexOfWaypointToBeRemoved, 1);
        const farthestDownRemainingWaypointIndex = remainingDisplayedItemIndexes.length === 0 ? null : Math.max(...remainingDisplayedItemIndexes);
        // const farthestDownRemainingWaypointIndex = Math.max(...remainingDisplayedItemIndexes);
        dispatch(setLeaderboardDisplayData(farthestDownRemainingWaypointIndex, remainingDisplayedItemIndexes));// current, inViewportWaypoints,
      }
    },
    adJustFired: (whichAdIndex) => {
      dispatch(adJustFired(whichAdIndex))
    },
    dispatch,
  };
}
// const statePropsOptions = {
//   pure: true,
//   areOwnPropsEqual: (nextProps, prevProps) => {
//     // // console.log('LeaderboardHolder areOwnPropsEqual?');
//     // return false;
//     if (nextProps.id === null && nextProps.id !== prevProps.id) {
//       return true;
//     }
//     const isActive = prevProps.index === prevProps.currentLeaderboardIndex;
//     const willBeActive = nextProps.index === nextProps.currentLeaderboardIndex;
//     if (isActive === willBeActive) {
//       return false;
//     }
//     return true;
//   },
// };

export default connect(mapStateToProps, mapDispatchToProps)(LeaderboardHolder);
