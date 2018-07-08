/**
*
* Shrinkbox
*
*/

import React from 'react';
import PropTypes from 'prop-types';
// import ReactDOM from 'react-dom';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import { setSponsoredContentIndex } from './actions';

import Waypoint from 'react-waypoint';
// import { media } from 'style-utils';
import styled, { css } from 'styled-components';
import { selectCurrentSponsoredContentIndex, selectSponsoredContent, selectSecondSponsoredContentID, selectSponsoredContentSizes, selectSponsoredContentID } from './selectors';
import SmallSponsoredContent from 'components/SmallSponsoredContent';

class SmallSponsoredContentHolder extends React.Component { // eslint-disable-line react/prefer-stateless-function
  constructor() {
    super();
  }
  componentWillMount () {

  }
  componentDidMount() {
    // // console.log('LeaderboardHolder '+this.props.index+' componentDidMount');
  }
  componentDidUpdate() {
    // // console.log('LeaderboardHolder '+this.props.index+' componentDidUpdate');
  }
  shouldComponentUpdate(nextProps) {
    if (this.props.sponsoredContentAdID === null && this.props.sponsoredContentAdID !== nextProps.sponsoredContentAdID) {
      return true;
    }

    // const isActive = this.props.index === this.props.currentSmallSponsoredContentIndex;
    // const willBeActive = this.props.index === nextProps.currentSmallSponsoredContentIndex;

    const isActive = true;
    const willBeActive = true;

    if (isActive === willBeActive) {
      return false;
    }
    return true;
  }

  render() {

    // if (this.props.id === null) {
    //   return null;
    // }
    // // console.log('LeaderboardHolder '+this.props.index+' render');
    const SmallSponsoredContentHolderWrapper = styled.div`
      position: relative;
      ${'' /* border: 6px dashed yellow;
      background: orange;
      min-height: 520px; */}
    `;
    let stuff = null;
    if (this.props.index === this.props.currentSmallSponsoredContentIndex || true) {// make it always place the ad!
      // then it is the same as active, which is difiicult to get from a selector, becuas ei haven't figured out how to pass props in as parameters to the createSelector call
      // adUnitField
      // const someAdID = this.props.adUnitPosition === 1 ? this.props.sponsoredContentAdID : this.props.secondSponsoredContentAdID;
      let someAdID = this.props.sponsoredContentAdID;
      if (this.props.second) {
        someAdID = this.props.secondSponsoredContentAdID;
      }
      return(
        <SmallSponsoredContentHolderWrapper className="SmallSponsoredContentHolderWrapper">
          <Waypoint
            onEnter={({ previousPosition, currentPosition, event }) => {
              this.props.sponsoredContentEntry(this.props.index);
              }
            }
          >
            <div>
              <SmallSponsoredContent adID={someAdID} adSizes={this.props.sponsoredContentSizes} active={true} key={`smallSponsoredContent_${this.props.index}`} />
            </div>
          </Waypoint>
        </SmallSponsoredContentHolderWrapper>
      );
    } else {
      return(
        <SmallSponsoredContentHolderWrapper>
          <Waypoint
            onEnter={({ previousPosition, currentPosition, event }) => {
              this.props.sponsoredContentEntry(this.props.index);
              }
            }
          />

        </SmallSponsoredContentHolderWrapper>
      );
    }
  }
}

SmallSponsoredContentHolder.propTypes = {
  currentSmallSponsoredContentIndex: PropTypes.number,
  index: PropTypes.number,
};

const mapStateToProps = createStructuredSelector({
  currentSmallSponsoredContentIndex: selectCurrentSponsoredContentIndex(),
  sponsoredContentAdID: selectSponsoredContentID(),
  secondSponsoredContentAdID: selectSecondSponsoredContentID(),
  sponsoredContentSizes: selectSponsoredContentSizes(),
});
// depends on adUnitField!!!

// const makeMapStateToProps = (state, ownProps) => {
//   const currentSponsoredContentIndex = selectCurrentSponsoredContentIndex();
//   const sponsoredContentID = selectSponsoredContentID();
//   const sponsoredContentSizes = selectSponsoredContentSizes();
//
//   // return {
//   //   currentSmallSponsoredContentIndex: selectCurrentSponsoredContentIndex(),
//   //   sponsoredContentAdID: selectSponsoredContentID(),
//   //   sponsoredContentSizes: selectSponsoredContentSizes(),
//   // }
//   const mapStateToProps = (state, props) => {
//     return {
//       currentSmallSponsoredContentIndex: currentSponsoredContentIndex(),
//       sponsoredContentAdID: sponsoredContentID(),
//       sponsoredContentSizes: sponsoredContentSizes(),
//     };
//   };
// }

// if we want to re-use the same thing, but have it choose between two possible sources in state, for adId, sizes, then we need a function that looks at set props to determine where to choose from in state for those props
// createStructuredSelector won't cut it, we need a custom function that looks at ownProps

// selectID, selectSizes. position could be sponsored_one or sponsored_two. found in global --> ads
SmallSponsoredContentHolder.defaultProps = {
  currentSmallSponsoredContentIndex: 0,
  sponsoredContentAdID: null,
  secondSponsoredContentAdID: null,
  sponsoredContentSizes: null,
  adUnitPosition: 1,
  index: 0,
}


// but the saga is listening to the loadCategorizedPostData action, not the LOCATION_CHANGE .... is that right?
// TEST_EZ_Wallpaper, TEST_EZ_Home_Sponsored_Content_Top, TEST_EZ_Home_Sponsored_Content_2
function mapDispatchToProps(dispatch) {
  return {
    sponsoredContentEntry: (index) => {
      // return true;
      // // console.log('leaderboardHolder Entry');
      dispatch(setSponsoredContentIndex(index));
    },
    dispatch,
  };
}
const statePropsOptions = {
  pure: true,
  areOwnPropsEqual: (nextProps, prevProps) => {
    // // console.log('LeaderboardHolder areOwnPropsEqual?');
    return false;
    if (nextProps.id === null && nextProps.id !== prevProps.id) {
      return true;
    }
    const isActive = prevProps.index === prevProps.currentSmallSponsoredContentIndex;
    const willBeActive = nextProps.index === nextProps.currentSmallSponsoredContentIndex;
    if (isActive === willBeActive) {
      return false;
    }
    return true;
  },
};

export default connect(mapStateToProps, mapDispatchToProps)(SmallSponsoredContentHolder);
