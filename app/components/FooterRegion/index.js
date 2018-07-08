/**
*
* FooterRegion
*
*/

import React from 'react';

import { Link } from 'react-router-dom';
import { Grid, Col, Row } from 'react-bootstrap';
import styled from 'styled-components';

class FooterRegion extends React.Component { // eslint-disable-line react/prefer-stateless-function
  //const Footer =
  render() {
    const MargedDiv = styled.div`
      margin: 125px 0;
      font-family: 'Helvetica', sans-serif;
      color: #000;
      font-weight: 200;
      p{
        text-align: center;
        font-size: 11.5pt;
        font-weight: 500;
        overflow-wrap: normal;
        a {
          color: #3e3e3e;
          font-weight: 200;
        }
      }
    `;
    const WhiteCol = styled(Col)`
      background: #fff;
      padding: 50px;
    `;

    const Line = styled.div`
      float: left;
      height: 1px;
      width: 100%;
      background: #797979;
      display: block;
      margin-bottom: 45px;
    `;

    return (
      <MargedDiv id="footer">
        <Grid>
          <Row>
            <Col md={8} mdOffset={2}>
              <Line></Line>
            </Col>
          </Row>
        </Grid>
        <Grid>
          <Row>
            <Col md={12}>
              <Row>
                <Col md={8} mdOffset={2}>
                  <p>
                      BROWSE&nbsp;&nbsp;|&nbsp;&nbsp;
                      <a href="/health">Health</a>&nbsp;&nbsp;|&nbsp;&nbsp;
                      <a href="/money">Money</a>&nbsp;&nbsp;|&nbsp;&nbsp;
                      <a href="/travel">Travel</a>&nbsp;&nbsp;|&nbsp;&nbsp;
                      <a href="/food-drink-entertaining">Food</a>&nbsp;&nbsp;|&nbsp;&nbsp;
                      <a href="/style">Style</a>&nbsp;&nbsp;|&nbsp;&nbsp;
                      {/* <a href="https://id.zoomer.ca/" target="_blank">My Zoomer</a> */}
                  </p>
                  <p>
                      EXPLORE&nbsp;&nbsp;|&nbsp;&nbsp;
                      <a href="/tag/zoomer-daily">#ZoomerDaily</a>&nbsp;&nbsp;|&nbsp;&nbsp;
                      <a href="/tag/politics-policy/">Politics &amp; Policy</a>&nbsp;&nbsp;|&nbsp;&nbsp;
                      <a href="/tag/arts-and-entertainment">Arts &amp; Entertainment</a>&nbsp;&nbsp;|&nbsp;&nbsp;
                      <a href="/tag/stars-and-royals">Stars &amp; Royals</a>&nbsp;&nbsp;|&nbsp;&nbsp;
                      <a href="/tag/sex-love-relating/">Sex &amp; Love</a>
                  </p>
                  <p>
                      CONNECT&nbsp;&nbsp;|&nbsp;&nbsp;
                      <a href="https://www.facebook.com/everythingzoomer">Facebook</a>&nbsp;&nbsp;|&nbsp;&nbsp;
                      <a href="https://twitter.com/zoomer">Twitter</a>&nbsp;&nbsp;|&nbsp;&nbsp;
                      <a href="https://www.instagram.com/ZoomerMag/">Instagram</a>&nbsp;&nbsp;|&nbsp;&nbsp;
                      {/* <a href="https://www.pinterest.ca/zoomerlife">Pinterest</a> */}
                  </p>
                  <p>
                      SUBSCRIBE&nbsp;&nbsp;|&nbsp;&nbsp;
                      <a href="/sign-up" target="_blank">E-Newsletters</a>&nbsp;&nbsp;|&nbsp;&nbsp;
                      <a href="http://secure.zoomer.ca/new/ez_subscribe" target="_blank">Subscribe to Zoomer Magazine</a>
                  </p>
                  <p>
                      EVERYTHINGZOOMER&nbsp;&nbsp;|&nbsp;&nbsp;
                      <a href="/about">About</a>&nbsp;&nbsp;|&nbsp;&nbsp;
                      <a href="/privacy-policy">Privacy Policy</a>&nbsp;&nbsp;|&nbsp;&nbsp;
                      <a href="/advertise-with-us">Advertise with Us</a>&nbsp;&nbsp;|&nbsp;&nbsp;
                      <a href="/contact-us">Contact Us</a>
                  </p>
                  <p>EverythingZoomer.com is part of the <a href="http://www.zoomermedia.ca/our-properties/digital" target="_blank">ZoomerMedia Digital Network</a></p>
                </Col>
              </Row>
            </Col>
          </Row>
        </Grid>
      </MargedDiv>
    );
  }
}

export default FooterRegion;
