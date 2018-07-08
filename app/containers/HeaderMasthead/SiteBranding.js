/**
*
* HeaderMasthead
*
*/

import React from 'react';
import { connect } from 'react-redux';
// import { Link } from 'react-router-dom';// Link now comes from react-router-dom
import { Link } from 'react-router-dom';

import styled from 'styled-components';
import { Grid, Row, Col } from 'react-bootstrap';
// import { LinkContainer } from 'react-router-bootstrap';
// import Image from 'react-bootstrap';
// import SubscribeNewsletter from 'components/SubscribeNewsletter';
// import SubscribeMagazineHeader from 'containers/DynamicRegions/SubscribeMagazineHeader';
import HomeLogo from 'containers/DynamicRegions/HomeLogo';

import FontAwesome from 'react-fontawesome';
import { media } from 'style-utils';
import { action as toggleMenu } from 'redux-burger-menu';
import { createStructuredSelector } from 'reselect';

export class SiteBranding extends React.Component { // eslint-disable-line react/prefer-stateless-function
  render() {
    const WhiteGrid = styled(Grid)`
      background: white;
      padding-top: 45px;
      position: relative;
    `;

    const DrawerLinkWrapper = styled.div`
      position: absolute;
      display: none;
      ${media.medium`
        display: none;
        position: absolute;
        left: 80px;
        font-size: 23px;
      `}
      ${media.small`
        display: block;
        top: -25px;
      `}
      ${media.extrasmall`
        display: block;
        top: -24px;
        left: 40px;
      `}
      a {
        color: #000 !important;
      }
    `;

    const AbsoluteSocial = styled.div`
      position: absolute;
      top: 20px;
      right: 44px;
      a{
        color: #000;
        border: 1px solid #000;
        border-radius: 100%;
        display: block;
        width: 26px;
        height: 26px;
        -webkit-text-align: center;
        text-align: center;
        line-height: 26px;
        font-size: 12pt;
        margin: 0 4px;
        float: left;
      }
      ${media.medium`
        display: none;
      `}
    `;

    return (
      <div>
        <WhiteGrid fluid>
          <AbsoluteSocial>
            <a href="https://www.facebook.com/everythingzoomer" target="_blank"><FontAwesome name='facebook'/></a>
            <a href="https://twitter.com/zoomer" target="_blank"><FontAwesome name='twitter'/></a>
            <a href="https://www.instagram.com/ZoomerMag/" target="_blank"><FontAwesome name='instagram'/></a>
            {/* <a href="https://www.instagram.com/ZoomerMag/" target="_blank"><FontAwesome name='pinterest'/></a> */}
          </AbsoluteSocial>
          <Row>
            <Col md={1} mdOffset={1} sm={2}>
              {/* <SubscribeNewsletter/> */}
            </Col>
            <Col sm={8}>
                <HomeLogo />
            </Col>
            <Col md={1} sm={2}>

              <DrawerLinkWrapper>
                  <button onClick={(e) => {
                    e.preventDefault();
                    this.props.toggleMenu();
                  }}>
                    <FontAwesome name='bars' className="drawerHamburgerNotFixed"/>
                  </button>
              </DrawerLinkWrapper>

              {/* <SubscribeMagazineHeader/> */}
            </Col>
          </Row>
        </WhiteGrid>
      </div>
    );
  }
}

const mapStateToProps = createStructuredSelector({});

function mapDispatchToProps(dispatch) {
  return {
    toggleMenu: () => {
      // console.log('toggleMenu');
      dispatch(toggleMenu(true));
    },
    dispatch,
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(SiteBranding);
