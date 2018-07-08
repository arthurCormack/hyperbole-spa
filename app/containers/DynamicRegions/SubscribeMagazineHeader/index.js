/**
*
* SubscribeMagazineHeader
*
*/

import React from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { Image } from 'react-bootstrap';
import Mag from './images/mag.jpg';
import { media } from 'style-utils';
// import styled from 'styled-components';


class SubscribeMagazineHeader extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function
  render() {
    const SubscribeToMagLink = styled(Link)`
      border: 2px solid #d02d2f;
      width: 170px;
      padding: 10px;
      margin: 40px auto;
      display: block;
      position: relative;
      top: 0px;
      ${'' /* right: 40px; */}
      &:active {
        text-decoration: none;
      }
      ${media.large`
        display: none;
      `}
      ${media.medium`
        display: none;
      `}
      ${media.small`
        display: none;
      `}
      p {
        color: #000;
        text-decoration: none;
      }
      &:hover {
        color: #000;
        text-decoration: none;
      }
    `;

    const MagImg = styled(Image)`
      position: absolute;
      left: -80px;
      width: 90px;
      top: -17px;
      z-index: 9;
      ${media.medium`
        left: -60px;
        width: 70px;
        top: -10px;
      `}
    `;

    const CapsSerif = styled.p`
      ${'' /* text-transform: uppercase;
      font-weight: 700;
      text-align: center;
      margin: 2px;
      line-height: 17px; */}
      font-family: 'Crimson Text', sans-serif;
      font-size: 12pt;
      text-transform: uppercase;
      font-weight: bold;
      text-align: center;
      margin: 0;
      line-height: 1.2;
    `;

    const SmallSerif = styled.p`
      ${'' /* text-align: center;
      margin-bottom: 0;
      font-family: 'Cormorant Upright', serif;
      line-height: 15px; */}
      text-align: center;
      margin-bottom: 0;
      font-family: 'Crimson Text', serif;
      line-height: 18px;
      font-size: 12pt;
    `;


    return (
      <SubscribeToMagLink to="/subscribe">
       {/* <SubscribeToMagLink href="https://secure.zoomer.ca/new/ez_subscribe"> */}
        <MagImg src={this.props.item.mag_cover} />
        <CapsSerif>
              Editor's Picks!
        </CapsSerif>
        <SmallSerif>Go behind the scenes with our cover stars and more
        </SmallSerif>
      </SubscribeToMagLink>
    );
  }
}



const mapStateToProps = (state) => {
  return {
    item: typeof state.getIn(['global', 'dynamicRegions', 'currentMag']).toJS === 'function' ? state.getIn(['global', 'dynamicRegions', 'currentMag']).toJS() : state.getIn(['global', 'dynamicRegions', 'currentMag']),
  };
};

const mapDispatchToProps = () => {
  return {};
};

// export default FeaturedFour;
export default connect(mapStateToProps, mapDispatchToProps)(SubscribeMagazineHeader);
