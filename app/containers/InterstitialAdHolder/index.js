/**
*
* LeaderboardHolder
*
*/

import React from 'react';
// import ReactDOM from 'react-dom';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import { adJustFired } from './actions';
import { Grid, Row, Col } from 'react-bootstrap';
import Waypoint from 'react-waypoint';
import { throttle } from 'lodash';

import { media } from 'style-utils';
import styled, { css } from 'styled-components';
import Interstitial from 'components/Interstitial';
import Tower from 'components/Tower';
// import Tower from 'components/Tower';

import { isClientMobile } from 'utils/detection';

import { msg } from 'utils/msg';

import {
  selectID,
  selectSizes,
  selectBigboxID,
  selectBigboxSizes,
} from './selectors';

import { selectID as selectBigBoxID, selectSizes as selectBigBoxSizes } from 'containers/AffixedSidebar/selectors';


class InterstitialAdHolder extends React.Component { // eslint-disable-line react/prefer-stateless-function
  constructor() {
    super();
    this.handleScroll.bind(this);
  }
  componentWillMount () {

  }
  componentDidMount() {
    // we need to consider modes:
    // interscroller. simpleBigBox. whatElse? if it's an interscroller, then we initialize the scrolling event handlers here.
    // if its a simplebigbox, then we just need to put in a thing, with no fixed positioning or clipping.
    if (this.props.mode === 'interscroller') {// only set up the handleScroll if its an interscroller.
      window.addEventListener('scroll', this.handleScroll);
      // window.addEventListener("scroll", throttle(
      //   (e) => {
      //     this.handleScroll(e)
      //   }, 200)
      // );
      const InterstitialAdHolder = document.getElementById("InterstitialAdHolderWrapper");
      console.log(`InterstitialAdHolder`, InterstitialAdHolder);
    }

    // if (InterstitialAdHolder !== null) {
    //   InterstitialAdHolder.setAttribute("style","height: 100vh; width: 100vw; position: relative; text-align: center; margin-left: -50vw; left: 50%; margin-top: 4.5em; margin-bottom: 4.5em; overflow: auto;");
    //   const InterstitialAdHolderWrapperInner = document.getElementById("InterstitialAdHolderWrapperInner");
    //   InterstitialAdHolderWrapperInner.setAttribute("style","width: 100%; top: 0; left: 0; clip: rect(0,100vw,100vh,0); overflow-x: hidden; overflow-y: auto; position: fixed; -webkit-transform: translateZ(0); -moz-transform: translateZ(0); transform: translateZ(0);");
    // }
  }
  handleScroll(e) {
    /*  const shrinkBoxNode = ReactDOM.findDOMNode(this.refs.shrinkbox);
      shrinkBoxNode.classList.add('shrunk');
    */
    const InterstitialAdHolder = document.getElementById("InterstitialAdHolderWrapper");
    console.log(`InterstitialAdHolder`, InterstitialAdHolder);
    if (InterstitialAdHolder !== null) {
      const pos = InterstitialAdHolder.getBoundingClientRect();
      const InterstitialAdHolderWrapperInner = document.getElementById("InterstitialAdHolderWrapperInner");
      // ok ... so the clipping rect has to change!
      // we need to not clip until after the thing is fully in the viewport! only start clipping once it starts to slide up beyond the top!
      InterstitialAdHolderWrapperInner.style.clip = "rect("+pos.top+"px,100vw,"+pos.bottom+"px,0)";

    }
  }
  componentDidUpdate() {

  }
  shouldComponentUpdate(nextProps) {
    return true;
  }

  render() {
    if (this.props.mode === 'interscroller') {
      if (this.props.active && this.props.safety && this.props.adID !== null && isClientMobile()) {// Waypoint's are not neccesary for establishing which thing it is that is in state ... they each have a potential one.
        const InterstitialAdHolderWrapper = styled.div`
          ${'' /* https://coderwall.com/p/hkgamw/creating-full-width-100-container-inside-fixed-width-container */}
          position: relative;
          text-align: center;
          width: 100vw;
          margin-left: -50vw;
          left: 50%;
          margin-top: 4.5em;
          margin-bottom: 4.5em;
          height: 100vh;
          ${'' /* height: 100%; */}
          z-index: 100;
          ${'' /* overflow: auto; */}
          -webkit-transform: translateZ(0);
          -moz-transform: translateZ(0);
          transform: translateZ(0);
          background: #ccc;
        `;

        const AdvertisementAnnouncerBar = styled.div`
          background: #ccc;
          padding:3px;
          text-align: center;
          font-family: sans-serif;
          color: #fff;
          width: 100%;
          height: 2em;
          margin-top: -3em;
          ${'' /* we put it belor so that we have a full height container to hold the ad */}
          ${'' /* we will need to offset top by the height of the top nav bar. */}
          ${'' /* z-index: 1; */}
        `;
        const EndAdvertisementAnnouncerBar = styled(AdvertisementAnnouncerBar)`
          position: absolute;
          bottom: -2em;
          height: 2em;
          ${'' /* we put it belor so that we have a full height container to hold the ad */}
        `;
        const AdWrapper = styled.div`
          position: fixed;
          width: 100%;
          height: 100%;
          top: 0;
          left: 0;
          ${'' /* clip: rect(0,100vw,100vh,0); */}
          overflow-x: hidden;
          overflow-y: auto;

          -webkit-transform: translateZ(0);
          -moz-transform: translateZ(0);
          transform: translateZ(0);
          z-index:-1;
          background: aquamarine;
          background: #666;
        `;
        const InterstitialAdHolderWrapperInner = styled.div`
          width: 100%;
          top: 0;
          left: 0;
          clip: rect(0, 100vw, 100vh, 0);
          overflow-x: hidden;
          overflow-y: auto;
          position: fixed;
          -webkit-transform: translateZ(0);
          -moz-transform: translateZ(0);
          transform: translateZ(0);
        `;
        //#InterstitialAdHolder
        return(
          <InterstitialAdHolderWrapper className="InterstitialAdHolderWrapper" ref="InterstitialAdHolderWrapper" id="InterstitialAdHolderWrapper">
            <AdvertisementAnnouncerBar>
              Advertisement
            </AdvertisementAnnouncerBar>
            <InterstitialAdHolderWrapperInner id="InterstitialAdHolderWrapperInner">
                This is an ad!
                Communities silo cultivate the innovation, energize deep dive changemaker. Capacity building think tank efficient social impact co-create inclusion efficient natural resources leverage. Contextualize sustainable inspiring collective impact social capital; efficient circular a or. Capacity building; social enterprise thought provoking granular scalable. Triple bottom line LGBTQ+, program area LGBTQ+ segmentation thought leadership social entrepreneur impact efficient. Outcomes, support NGO changemaker triple bottom line do-gooder rubric support living a fully ethical life. Green space equal opportunity problem-solvers catalyze big data. Co-create; citizen-centered triple bottom line entrepreneur; systems thinking innovation shared unit of analysis unprecedented challenge. Collaborate social capital, optimism sustainable the B-corp, shared vocabulary framework. Agile, LGBTQ+ white paper inspiring data. Correlation inspiring, social innovation collaborative consumption movements. B-corp challenges and opportunities natural resources cultivate rubric when academic shared vocabulary. Compelling storytelling indicators data, policymaker. Expose the truth inclusion thought provoking inclusion, catalyze change-makers resist leverage state of play. Benefit corporation venture.
            </InterstitialAdHolderWrapperInner>
            <EndAdvertisementAnnouncerBar>
              End of Advertisement
            </EndAdvertisementAnnouncerBar>
          </InterstitialAdHolderWrapper>
        );
      } else {
        return(null);
      }
    } else if (this.props.mode === 'bigbox' && isClientMobile()) {
      // not an interscroller
      if (this.props.active) {
        return (
          <div>
            <Tower adID={this.props.bigboxID} AdSizes={this.props.bigboxSizes} active={this.props.active} key={`tower_${this.props.index}`} />
          </div>
        );
      } else {
        return (null);
      }
    } else {
      return (null);
    }

  }
}

// InterstitialAdHolder.propTypes = {
//   currentLeaderboardIndex: React.PropTypes.number,
//   index: React.PropTypes.number,
// };

const mapStateToProps = createStructuredSelector({
  adID: selectID(),
  adSizes: selectSizes(),
  bigboxID: selectBigboxID(),
  bigboxSizes: selectBigboxSizes(),
});
// selectBigBoxID, selectBigBoxSizes
// const mapStateToProps = (state, ownProps) => {
//   let someAdId;
//   let someAdSizes;
//   if (typeof window !== 'undefined') {
//     if (ownProps.mode === 'bigbox') {
//       someAdId = selectBigBoxID();
//       someAdSizes = selectBigBoxSizes();
//     } else {
//       someAdId = selectID();
//       someAdSizes = selectSizes();
//     }
//
//     return {
//       adID: someAdId(),
//       adSizes: someAdSizes(),
//     }
//
//   } else {
//     return {
//
//     };
//   }
// }
// selectID, selectSizes
InterstitialAdHolder.defaultProps = {
  active: false,
  adID: true,
  adSizes: null,
  bigboxID: null,
  bigboxSizes: null,
  safety: true,
  mode: 'bigbox',
  index: null,// there will only be one ... there will never be more than one in that is active.
}

function mapDispatchToProps(dispatch) {
  return {
    adJustFired: (whichAdIndex) => {
      dispatch(adJustFired(whichAdIndex))
    },
    dispatch,
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(InterstitialAdHolder);
