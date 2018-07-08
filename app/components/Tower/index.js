/**
*
* Leaderboard
*
*/

import React from 'react';
import { Grid, Row, Col } from 'react-bootstrap';

import styled from 'styled-components';
import { media } from 'style-utils';
import { DFPSlotsProvider, AdSlot, DFPManager } from 'react-dfp';


class Tower extends React.Component { // eslint-disable-line react/prefer-stateless-function

  componentDidMount() {

  }
  shouldComponentUpdate(nextProps) {
    // return false;
    // // console.log('nextProps==');
    // // console.log(nextProps);
    if (nextProps.active !== this.props.active) {
      return true;// this will work, if we are turnin on or off.
    } else if (this.props.adID !== nextProps.adID) {
      return true;
    } else if (this.props.adObj !== nextProps.adObj) {
      return true;
    }
    return false;
  }

  componentWillReceiveProps(nextProps) {
    // if (this.props.active)
  }
  componentDidUpdate(nextProps) {
    // console.log('Leaderboard componentDidUpdate');
    // DFPManager.refresh();
    // if (this.props.active) {
    //   DFPManager.refresh();
    // } else {
    //
    // }
  }
  render() {
    const AdWrapper = styled.div`
      text-align: center;
      min-height:120px;
      ${'' /* border: 1px solid #999; */}
      margin:1em 0;
      ${'' /* ${media.medium`
        display: none;
      `} */}
    `;

    let somePotentialAd = null;
    if (this.props.active && (this.props.adID !== null || this.props.adObj !== null)) {
      let someAdID = null;
      if (this.props.adID !== null) {
        someAdID = this.props.adID;
      } else if (this.props.adObj !== null) {
        someAdID = this.props.adObj.id;
      }
      somePotentialAd = (
        <DFPSlotsProvider dfpNetworkId={this.props.dfpNetworkId} adUnit={someAdID} key={`dfp_leaderboardprovider_${this.props.index}`}>
          <AdSlot
            sizes={[[300, 250]]}
            shouldRefresh={() => false}
            onSlotRender={() => {
            // // console.log('AdSlot onSlotRender');
            }}
              // slotId={`this.props.index`}
            key={`dfp_toweradslot_${this.props.index}`}
          />
        </DFPSlotsProvider>
      );
    }
    return (
      <AdWrapper>
        {somePotentialAd}
      </AdWrapper>
    );
  }

}

Tower.defaultProps = {
  dfpNetworkId: '70671651',
  active: false,
  adID: null,
  adObj: null,
  adSizes: null,
};

export default Tower;
