/**
*
* HeaderMasthead
*
*/

import React from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { selectLocation } from './selectors';
import styled from 'styled-components';
import { Grid, Row, Col, Clearfix, Nav, Navbar, NavItem, NavDropdown, MenuItem} from 'react-bootstrap';

import DesktopNavBar from './DesktopNavBar';
import SiteBranding from './SiteBranding';
import StickyHeader from './StickyHeader';
import AffixedNav from './AffixedNav';
import { media } from 'style-utils';

class HeaderMasthead extends React.Component { // eslint-disable-line react/prefer-stateless-functio
  render() {
    // return (
    //   <Row id="masthead" className="site-header">
    //
    //     <SiteBranding />
    //     {/* <DesktopNavBar version='full' className="hidden-sm hidden-xs" /> */}
    //     {/* <AffixedNav topPx={450}/> */}
    //   </Row>
    // );

    if (!this.props.location) return null;
    if ('/' === this.props.location.pathname) {
      // return the full masthead
      return (
        <Row id="masthead" className="site-header">

          <SiteBranding />
          <DesktopNavBar version='full' className="hidden-sm hidden-xs" />
          <AffixedNav topPx={450}/>
        </Row>
      );

    } else {
      // return the smaller masthead
      return (
        <Row id="masthead" className="site-header">

          {/* <SiteBranding /> */}
          <DesktopNavBar verison='mini'/>
          <AffixedNav topPx={300}/>
        </Row>
      );
    }

  }
}

HeaderMasthead.defaultProps = {
  location: false,
}
function mapDispatchToProps(dispatch) {
  return {
    dispatch,
  }
}

const mapStateToProps = createStructuredSelector({
  location: selectLocation(),

});

export default connect(mapStateToProps, mapDispatchToProps)(HeaderMasthead);
