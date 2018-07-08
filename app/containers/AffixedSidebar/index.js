/**
*
* Shrinkbox
*
*/

import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { AutoAffix } from 'react-overlays';
import Waypoint from 'react-waypoint';
// import styled, { css } from 'styled-components';
import Tower from 'components/Tower';
import { setSidebarIndex, setSidebarDisplayData, adJustFired } from './actions';
import { selectCurrentSidebarIndex, selectSidebarsInViewport, selectIsActive, selectID, selectSizes, selectLastSidebarFired } from './selectors';
import { selectLeaderboardSafety, makeSelectDoesCurrentItemMatchCurrentAddressYet } from 'containers/LeaderboardHolder/selectors';

import { clone } from 'lodash';

import { msg } from 'utils/msg';
import { isClientMobile } from 'utils/detection';

class AffixedSidebar extends React.Component { // eslint-disable-line react/prefer-stateless-function
  constructor() {
    super();
  }

  shouldComponentUpdate(nextProps) {
    console.log(`AffixedSidebar.shouldComponentUpdate()`);


    if (this.props.adID === null && typeof nextProps.adID === 'string') {
      return true;
    }
    if (this.props.fixed) {
      if (this.props.active !== nextProps.active) {
        return true;
      } else {
        return false;
      }
    }

    // we need to consider whether or not the sidebar requires a conection to the stack: is it fixed? if it's not fixed, then it will require a connection like the leaderboards.
    // does it meet that requirement?
    // now, if it is fixed, if there is not a match between current thing we should disable it.
    const isActive = this.props.index === this.props.currentSidebarIndex;// this doesn't really mean is active, it means is supposedToBeActive
    const willBeActive = this.props.index === nextProps.currentSidebarIndex;

    if (!nextProps.safety || nextProps.lastSidebarFired === this.props.index) {// we don't need to be concerned about the safety if we are going to be returning false!
      return false;
    }

    if (nextProps.safety && !this.props.safety) {
      // return true;
      if (isActive !== willBeActive) {
        return true;
      }

    }
    if (nextProps.safety && !isActive && willBeActive) {
      return true;
    }
    if (nextProps.safety && willBeActive && this.props.index !== this.props.lastSidebarFired ) {
      return true;
    }
    // if we also kept track of an activated property ... then we would know
    // if (isActive !== willBeActive) {
    //   //return true;
    //
    //   if (nextProps.safety) {
    //     return true;
    //   } else {
    //     return false;
    //   }
    //
    //   // } else {
    //   //   return true;
    //   // }
    // } else {
    //   if (nextProps.safety && !this.props.safety) {
    //     return true;
    //   }
    //   // return false;
    //
    // }


    return false;
  }

  componentWillMount() {

  }
  componentDidMount() {
    // msg(`AffixedSidebar.componentDidMount()`);
    // from here, we can dispatch another action, that will store in state whether or not this thing actually displayed (attmepted to) an ad during last render.
    // if not, then, when the safety timer goes off, we will have to do a re-render.
    if (this.props.index === this.props.selectCurrentSidebarIndex && this.props.safety) {
      // then it should have fired during render.
    } else if (this.props.index === this.props.selectCurrentSidebarIndex && !this.props.safety) {
      // then it is supposed to fire, when the safety timer goes off.
    }
  }
  componentDidUpdate() {
    // msg(`AffixedSidebar[${this.props.index}] componentDidUpdate()`);
    if (this.props.safety && this.props.index === this.props.currentSidebarIndex && this.props.index !== this.props.lastAdFired) {
      this.props.adJustFired(this.props.index);// dispatching actions when components have already updated is usually considered an anti-pattern; ie: very bad. but in the case, neccesary.
    }
  }

  sidebarWaypointEnter(index) {
    // msg(`affixedSidebarWaypointEnter(${index})`);
    this.props.addSidebarToViewport(index, this.props.sidebarsInViewport, this.props.currentLeaderboardIndex);
  }

  sidebarWaypointLeave(index) {
    // msg(`affixedSidebarWaypointLeave(${index})`);
    this.props.removeSidebarFromViewport(index, this.props.sidebarsInViewport, this.props.currentLeaderboardIndex);
  }

  // fixed means not affixed!
  render() {
    //
    if (isClientMobile()) {
      return (null);
    }


    // postStackItemConnectionRequirementFulfillment
    let stuff = null;

    if (this.props.fixed) {
      // msg(`AffixedSidebar.render() fixed, this.props.active==${this.props.active}, this.props.adID==${this.props.adID}`);
      // return(
      //     <Tower adID={this.props.adID} AdSizes={this.props.adSizes} active={true} key={`tower_${this.props.index}`} />
      //     );
      // if (this.props.index === this.props.currentSidebarIndex && this.props.safety) {
      if (this.props.active) {
        return(
          <div>
            <Tower adID={this.props.adID} AdSizes={this.props.adSizes} active={this.props.active} key={`tower_${this.props.index}`} />
          </div>);
      } else {
        return(<div></div>);
      }
    }

    // requirePostStackItemConnection
    let postStackItemConnectionRequirementFulfillment = true;
    // msg(`this.props.requirePostStackItemConnection==${this.props.requirePostStackItemConnection}, this.props.postStackItemConnection==${this.props.postStackItemConnection}, this.props.doesCurrentItemMatchCurrentAddressYet==${this.props.doesCurrentItemMatchCurrentAddressYet}`);
    if (this.props.requirePostStackItemConnection && (!this.props.postStackItemConnection || !this.props.doesCurrentItemMatchCurrentAddressYet)) {
      postStackItemConnectionRequirementFulfillment = false;
    }
    // msg(`!!!!this.props.index==${this.props.index}, this.props.currentSidebarIndex==${this.props.currentSidebarIndex}, this.props.safety==${this.props.safety}, postStackItemConnectionRequirementFulfillment==${postStackItemConnectionRequirementFulfillment}`);
    //if (this.props.index === this.props.currentSidebarIndex && this.props.safety && postStackItemConnectionRequirementFulfillment ) {
    if (postStackItemConnectionRequirementFulfillment) {
      // then it is the same as active, which is difiicult to get from a selector, becuas ei haven't figured out how to pass props in as parameters to the createSelector call
      // fixing the sidebar will involve setting the onLeave, and also switching to the new approach that keeps track of sidebars in viewport, and negotiates one to be dominant.
      // stop using sidebarEntry and start using both addSidebarToViewport, removeSidebarFromViewport
      // need stub functions to easily pass along additional props
      // ok ... problem with Waypoints being outside of an Affixed element: the Waypoints leave the viewport, but the Affixed item doesn't leave the viewport.
      // maybe retructure the elements so that the waypoint is inside the affixation.

      // no auto affix if client is mobile.
      let ad;
      if (isClientMobile()) {
        ad = (
          <div>
            <Tower adID={this.props.adID} AdSizes={this.props.adSizes} active={this.props.currentSidebarIndex === this.props.index ? true : false} key={`tower_${this.props.index}`} />
          </div>
        );
      } else {
        ad = (
          <AutoAffix viewportOffsetTop={55} container={this.props.containmentUnit} affixClassName="affixedSidebarAd">
            <div>
              <Tower adID={this.props.adID} AdSizes={this.props.adSizes} active={this.props.currentSidebarIndex === this.props.index ? true : false} key={`tower_${this.props.index}`} />
            </div>
          </AutoAffix>
        );
      }
      return(
        <div>
          <Waypoint
            onEnter={({ previousPosition, currentPosition, event }) => {
              // this.props.sidebarEntry(this.props.index);
              this.sidebarWaypointEnter(this.props.index);
            }}
            onLeave={({previousPosition, currentPosition, event }) => {
              this.sidebarWaypointLeave(this.props.index);
            }}

          />
          {ad}
        </div>
      );
    } else {
      return (
        <div>
          <Waypoint
            onEnter={({ previousPosition, currentPosition, event }) => {
              // this.props.sidebarEntry(this.props.index);
              this.sidebarWaypointEnter(this.props.index);
            }}
            onLeave={({previousPosition, currentPosition, event }) => {
              this.sidebarWaypointLeave(this.props.index);
            }}
          />
        </div>
      );
    }

  }
}

AffixedSidebar.propTypes = {
  currentSidebarIndex: PropTypes.oneOfType([
    PropTypes.number,
    PropTypes.bool,
  ]),
  adID: PropTypes.string,
  adSizes: PropTypes.array,

  index: PropTypes.oneOfType([
    PropTypes.number,
    PropTypes.bool,
  ]),
  doesCurrentItemMatchCurrentAddressYet: PropTypes.bool,
  safety: PropTypes.bool,
};

const mapStateToProps = createStructuredSelector({
  currentSidebarIndex: selectCurrentSidebarIndex(),
  sidebarsInViewport: selectSidebarsInViewport(),
  lastSidebarFired: selectLastSidebarFired(),
  adID: selectID(),
  adSizes: selectSizes(),
  doesCurrentItemMatchCurrentAddressYet: makeSelectDoesCurrentItemMatchCurrentAddressYet(),
  safety: selectLeaderboardSafety(),
});

AffixedSidebar.defaultProps = {
  // active: false,
  index: null,
  lastSidebarFired: null,
  currentSidebarIndex: 0,
  sidebarsInViewport: [],
  adID: null,
  adSizes: null,
  fixed: false,
  requirePostStackItemConnection: false,
  postStackItemConnection: false,
  doesCurrentItemMatchCurrentAddressYet: false,
  safety: false,
};


// but the saga is listening to the loadCategorizedPostData action, not the LOCATION_CHANGE .... is that right?
/*
  so ... we need to handle this in similar fashion to how leaderboards handle things.
  it might make sense to abstract this later on into a reusable generic wrapper ... since, i have essentially had to replicate the same sort of thing twice before, and now this is the third time.
  it is proof that there is an opportunity for a npm module that will do this. maybe something that will use reacts context instead of redux state. so that it will be compatible with different architechtures.

*/
function mapDispatchToProps(dispatch) {
  return {
    sidebarEntry: (index) => {
      // return true;
      // // console.log('sidebarEntry');
      dispatch(setSidebarIndex(index));
    },
    addSidebarToViewport: (waypointIndex, waypointsInViewport, currentlyDisplayedItemIndex) => {
      // msg(`addSidebarToViewport(${waypointIndex}, [${waypointsInViewport}], currentlyDisplayedItemIndex)`);
      const someIndex = waypointsInViewport.indexOf(waypointIndex);
      // msg(`someIndex==${someIndex}`);
      if (someIndex === -1) {
        const farthestDownIndex = Math.max(...waypointsInViewport, waypointIndex);
        dispatch(setSidebarDisplayData(farthestDownIndex, [...waypointsInViewport, waypointIndex]));
      } else {
      }
    },
    removeSidebarFromViewport: (waypointIndex, waypointsInViewport, currentlyDisplayedItemIndex) => {
      console.log(`this.props.removeLeaderboardFromViewport(${waypointIndex})`);
      let remainingDisplayedItemIndexes = clone(waypointsInViewport);
      const indexOfWaypointToBeRemoved = remainingDisplayedItemIndexes.indexOf(waypointIndex);
      if (indexOfWaypointToBeRemoved !== -1) {
        remainingDisplayedItemIndexes.splice(indexOfWaypointToBeRemoved, 1);
        const farthestDownRemainingWaypointIndex = Math.max(...remainingDisplayedItemIndexes);
        dispatch(setSidebarDisplayData(farthestDownRemainingWaypointIndex, remainingDisplayedItemIndexes));// current, inViewportWaypoints,
      }
    },
    adJustFired: (whichAdIndex) => {
      dispatch(adJustFired(whichAdIndex))
    },
    dispatch,
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(AffixedSidebar);
