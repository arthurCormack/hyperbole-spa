/**
*
* Leaderboard
*
*/

import React from 'react';
import { Grid, Row, Col } from 'react-bootstrap';
// import styles from '../../containers/App/styles.css';
// import cx from 'classnames';
// import Img from 'components/Img';
// import Leader from 'containers/App/dummy/leader.jpg';
import { media } from 'style-utils';
import styled from 'styled-components';

import { DFPSlotsProvider, AdSlot, DFPManager } from 'react-dfp';

class Leaderboard extends React.Component { // eslint-disable-line react/prefer-stateless-function

  componentDidMount() {
    //
  }
  shouldComponentUpdate(nextProps) {
    // // console.log('Leaderboard shouldComponentUpdate');
    // // console.log('nextProps==');
    // // console.log(nextProps);
    if (nextProps.active !== this.props.active) {
      return true;// this will work, if we are turnin on or off.
    } else {
      return false;
    }

  }
  componentWillReceiveProps(nextProps) {
    // if (this.props.active)
  }
  componentDidUpdate(nextProps) {
    // // console.log('Leaderboard componentDidUpdate');
    // DFPManager.refresh();
    // if (this.props.active) {
    //   DFPManager.refresh();
    // } else {
    //
    // }
  }
  render() {
    // const leaderBoard = cx(styles.leaderBoard);
    if (this.props.id === null) return null;

    const Spacer = styled.div`
      display: block;
      float: left;
      width: 100%;
      height: 40px;
      ${media.medium`
        height: 11px;
      `}
    `;

    const AdWrapper = styled.div`
      ${'' /* margin: 50px auto; */}
      display: block;
      text-align: center;
      ${'' /* min-height: 120px; */}
      ${media.small`

      `}
      ${media.print`
        display: none;
      `}
    `;
    // const AdWrapperHalfPad = styled.div`
    //   margin: 25px auto;
    //   display: block;
    //   text-align: center;
    //   min-height: 90px;
    //   ${media.small`
    //     display: none;
    //   `}
    // `;

    let somePotentialAd = null;
    let someAdSizes = [[728, 90], [970, 90]];
    if (this.props.adSizes !== null) {
      // someAdSizes = this.props.adSizes;
      someAdSizes = [];
      this.props.adSizes.forEach((item) => {
        someAdSizes.push([Number(item.size.width), Number(item.size.height)]);
      });
    }
    if (this.props.active) {
      somePotentialAd = (
        <div>
         <Spacer />
          <DFPSlotsProvider dfpNetworkId={this.props.dfpNetworkId} adUnit={this.props.adID} key={`dfp_leaderboardprovider_${this.props.index}`}>
              <AdSlot sizes={someAdSizes}
                // shouldRefresh={() => true}
                onSlotRender={() => {
                // // console.log('AdSlot onSlotRender');
                }}
                // slotId={`this.props.index`}
                key={`dfp_leaderboardadslot_${this.props.index}`}
              />

              {/* <AdSlot sizes={[[728, 90], [970, 90]]}
                onSlotRender={() => {
                  // console.log('AdSlot onSlotRender');
                }}
              /> */}
          </DFPSlotsProvider>
        <Spacer />
      </div>
      );
      // if(this.props.index == 0) {
      //   return (
      //     <AdWrapperHalfPad className="leaderBoardWrapper">
      //       {somePotentialAd}
      //     </AdWrapperHalfPad>
      //   );
      // } else {
      //   return (
      //     <AdWrapper className="leaderBoardWrapper">
      //       {somePotentialAd}
      //     </AdWrapper>
      //   );
      // }
      return (
        <AdWrapper className="leaderBoardWrapper">
          {somePotentialAd}
        </AdWrapper>
      );
    } else {
      return (null);
    }
  }

}
Leaderboard.defaultProps = {
  dfpNetworkId: '70671651',
  active: false,
  adID: null,
  adSizes: null,
}
export default Leaderboard;
