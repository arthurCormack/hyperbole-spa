/**
*
* StickyHeader
*
*/

import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { Grid, Row, Col, Nav, Navbar, NavItem, NavDropdown, MenuItem } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
import Img from 'components/Img';
import EZPlaceholder from './EZPlaceHolder.png';
export default class StickyHeader extends React.Component { // eslint-disable-line react/prefer-stateless-function
  render() {
    return (
      <Grid id="sticky-header" {...this.props}>
        <Row>
          <Col>
            <Link to="/">
              <h1 className="site-title hide">Everything Zoomer</h1>
              {/* <Img src={EZPlaceholder} alt="Everything Zoomer Home Page" /> */}
              This is a sticky header here :)
            </Link>
          </Col>
        </Row>
      </Grid>
    );
  }
}
