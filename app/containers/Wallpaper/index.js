/**
*
* Shrinkbox
*
*/

import React from 'react';
// import ReactDOM from 'react-dom';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { DFPSlotsProvider, AdSlot, DFPManager } from 'react-dfp';
// import { setSponsoredContentIndex } from './actions';

// import Waypoint from 'react-waypoint';
// import { media } from 'style-utils';
import styled, { css } from 'styled-components';
import { throttle } from 'lodash';
import { selectAdID } from './selectors';
// import SmallSponsoredContent from 'components/SmallSponsoredContent';

class Wallpaper extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function
  constructor() {
    super();
    this.handleScroll = this.handleScroll.bind(this);
  }
  componentWillMount () {

  }
  componentDidMount() {
    // // console.log('LeaderboardHolder '+this.props.index+' componentDidMount');
    // add an event listener for scroll function
    window.addEventListener('scroll', throttle(this.handleScroll, 250));
  }
  componentDidUpdate() {
    // // console.log('LeaderboardHolder '+this.props.index+' componentDidUpdate');
  }
  shouldComponentUpdate(nextProps) {
    if (this.props.adID === null && this.props.adID !== nextProps.adID) {
      return true;
    }
    return false;
  }

  handleScroll(e) {
    const isPastOffset = e.target.scrollingElement.scrollTop > this.props.verticalOffset;
    // // console.log(`handleScroll() e.target.scrollingElement.scrollTop==${e.target.scrollingElement.scrollTop}`);
    // if (isPastOffset) {
    //   document.body.addClass
    // }
    //
    if (isPastOffset) {
      document.body.classList.add('pastWallpaperVerticalOffset');
    } else {
      document.body.classList.remove('pastWallpaperVerticalOffset');
    }
  }

  render() {
    const WallpaperWrapper = styled.div`
      ${'' /* position: fixed;
      width: 100%;
      ${'' /* background: fuchsia; */}
      z-index:0;
      height:100%;
      top:0;
      left: 0;
      text-align: center; */}
    `;
    const WallpaperContainer = styled.div`
      ${'' /* margin: 0 auto;
      position: relative; */}
    `;
    // so ... this is a bit different, this is both the container, and the thing which houses the wallpaper ad.
    // no need for holder and ad, this is both holder, and and together.

    // return(
    //     <WallpaperWrapper className="SmallSponsoredContentHolderWrapper">
    //           {/* <SmallSponsoredContent adID={someAdID} adSizes={this.props.sponsoredContentSizes} active={true} key={`smallSponsoredContent_${this.props.index}`} /> */}
    //           <h1>This is Wallpaper!</h1>
    //     </WallpaperWrapper>
    // );

    let somePotentialAd = null;
    if (this.props.adID !== null) {
      somePotentialAd = (
        <DFPSlotsProvider dfpNetworkId={this.props.dfpNetworkId} adUnit={this.props.adID} key={`dfp_wallpaperprovider`}>
          <AdSlot
            sizes={[[1024, 768]]}
            // shouldRefresh={() => true}
            onSlotRender={() => {
              // console.log('Wallpaper AdSlot.onSlotRender()');
            }}
              // slotId={`this.props.index`}
            key={`dfp_wallpaper`}
          />
        </DFPSlotsProvider>
      );
    }
    return (
      <WallpaperWrapper className="wallpaperWrapper">
        <WallpaperContainer className="wallpaperContainer">
          {somePotentialAd}
        </WallpaperContainer>
      </WallpaperWrapper>

    );

  }
}


const mapStateToProps = createStructuredSelector({
  adID: selectAdID(),
});

Wallpaper.defaultProps = {
  dfpNetworkId: '70671651',
  adID: null,
  adSizes: null,
  verticalOffset: 320,
}



// but the saga is listening to the loadCategorizedPostData action, not the LOCATION_CHANGE .... is that right?
// TEST_EZ_Wallpaper, TEST_EZ_Home_Sponsored_Content_Top, TEST_EZ_Home_Sponsored_Content_2
function mapDispatchToProps(dispatch) {
  return {
    // sponsoredContentEntry: (index) => {
    //   // return true;
    //   // // console.log('leaderboardHolder Entry');
    //   dispatch(setSponsoredContentIndex(index));
    // },
    dispatch,
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Wallpaper);
