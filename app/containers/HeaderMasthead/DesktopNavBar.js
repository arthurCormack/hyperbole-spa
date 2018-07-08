/**
*
* HeaderMasthead
*
*/

import React from 'react';
import { connect } from 'react-redux';

import styled from 'styled-components';
import { Nav, Navbar, NavItem, NavDropdown, MenuItem, Row, Image } from 'react-bootstrap';
// import { LinkContainer } from 'react-router-bootstrap';
import NavigationItems from './NavigationItems';
import { toggleSearchPanel } from 'containers/SearchPanel/actions';
import { Link } from 'react-router-dom';
// import cx from 'classnames';
import FontAwesome from 'react-fontawesome';
import LogoImage from 'containers/PageWrapper/images/sticky_nav_logo.png';
import { media } from 'style-utils';
import { action as toggleMenu } from 'redux-burger-menu';
import { createStructuredSelector } from 'reselect';

export class DesktopNavBar extends React.Component { // eslint-disable-line react/prefer-stateless-function
  constructor() {
    super();
    // this.handleNavItemHover.bind(this);
    //
    // this.handleNavItemUnHover.bind(this);

  }

  handleNavItemHover() {
    // console.log('handleNavItemHover()');
    // // console.log(e);
    // setTimeout(() => {
    //   // console.log('3 seconds is up ... open');
    // }, 3000);
    // we need to either cancel, and unset this, or a way to check to see, when the time is up, whether or not this shoulr be opening or not
  }
  // ok. some notes about react bootstrap, and nav menus and hovering.
  // basically this: don't use custom hover events for this kind of nav.
  // if we really want to be using custom hover events, don't work with bootstrap to do it.
  handleNavItemUnHover() {
    // if the item was openByHover-ed, then close it now, otherwise, leave it alone.
    // console.log('handleNavItemUnHover()');
    // // console.log(e);
    // setTimeout(() => {
    //   // console.log('3 seconds is up ... close');
    // }, 3000);
  }
  componentDidMount() {

  }
  render() {
    // it would seem as though, it is not possible to use styled components around react-bootstrap components. h'mm.
    // const DrawerHamburger = cx('sm', 'facebook', 'facebookFooter');



    const ZMNavbarDesk = styled(Navbar)`
      background: #fff;
      border-color: #fff;
      font-family: 'Roboto Condensed', sans-serif;
      text-transform: uppercase;
      font-size: 19px;
      display: block !important;
      text-align: center;
      margin-bottom: 0 !important;
      box-shadow: 2px 2px 15px #d4d4d4;
      max-height: 51px;
        ${media.small`
          display: none !important;
        `}
        ${media.print`
          display: none !important;
        `}
    `;

    const ZMNavbar = styled(Navbar)`
      background: #fff;
      border-color: #fff;
      font-family: 'Roboto Condensed', sans-serif;
      text-transform: uppercase;
      font-size: 19px;
      display: block !important;
      text-align: center;
      margin-bottom: 0 !important;
      box-shadow: 2px 2px 15px #d4d4d4;
      max-height: 51px;
      ${media.print`
          display: none !important;
      `}
      ${media.small`
        .navbar-collapse {
          display: none !important;
        }
      `}
    `;

    const ZMNavItem = styled(NavItem)`
      a {
        color: #000 !important;
      }
    `;

    // const DrawerLinkWrapperHome = styled.div`
    // position: relative;
    // float: left;
    // width: 50px;
    //   a {
    //     color: #000 !important;
    //     float: left;
    //   }
    //   a:hover {
    //     cursor: pointer;
    //   }
    //   ${media.small`
    //   width: 50px;
    //   padding-left: 22px;
    //   `}
    // `;

    const DrawerLinkWrapper = styled.div`
    position: absolute;
    left: 40px;
    font-size: 23px;
    font-size: 20pt;
      a {
        color: #000 !important;
      }
      &:hover {
        cursor: pointer;
      }
    `;

    const DrawerLinkWrapperMini = styled.div`
    position: absolute;
    left: 40px;
    font-size: 23px;
    font-size: 20pt;
      a {
        color: #000 !important;
      }
      &:hover {
        cursor: pointer;
      }
    `;

    const SocialMediaTopNav = styled(Nav)`
    position: absolute;
    top: 0px;
    right: 100px;
        ${'' /* ul {
          position: absolute;
          top: 0px;
          right: 100px;
        } */}
        ${media.large`
          right: 20px;
        `}
        ${media.medium`
          display: none !important;
        `}
    `;

    const RightArea = styled.div`
      float: right;
      ${media.small`
        display: none;
      `}
    `;

    const RightUl = styled.ul`
      position: absolute;
      right: 50px;
      ${media.large`
        right: 30px;
      `}
      li{
        float: left;
        text-transform: capitalize;
        margin: 0 9px;
        height: 51px;
        line-height: 47px;
        &:hover{
          cursor: pointer;
        }
        ${media.large`
          margin: 0 10px;
        `}
        a {
          color: #000;
          font-style: italic;
          font-family: 'Cormorant Upright', serif;
        }
        a:hover {
          text-decoration: none;
          cursor: pointer;
        }
      }
      .noMd {
        ${media.medium`
          display: none;
        `}
      }
    `;

    const LogoLink = styled(Link)`
      ${media.medium`
        display: none;
      `}
    `;

    const ImgLogo = styled(Image)`
      width: 150px;
      position: absolute;
      top: 10px;
      left: 100px;
      ${media.medium`
        display: none;
      `}
    `;

    const MobileLogoLink = styled(Link)`
    position: absolute;
    top: 1px;
    width: 130px;
    left: 100px;
    ${'' /*
    top: -3px;
    width: 130px;
    left: 100px;
     */}
      ${media.medium`
        width: 110px;
        position: absolute;
        top: -3px;
        left: 80px;
        width: 75%;
      `}
      ${media.small`
        width: 76%;
      `}
      ${media.extrasmall`
        width: 55%;
      `}
    `;

    const MobileLogoImg = styled(Image)`
    width: 130px;
    position: absolute;
    top: 11px;
    ${media.medium`
      width: 120px;
      top: 13px;
      left: 0;
    `}
    ${media.small`
      width: 120px;
      top: 13px;
      left: -80px;
    `}
    `;

    if (this.props.version == 'full') {
      return (
        <ZMNavbarDesk className="noPrint">
          <DrawerLinkWrapper>
            <button onClick={
                (e) => {
                  e.preventDefault();
                  this.props.toggleMenu()
                }
              }>
              <FontAwesome name='bars' className="drawerHamburger"/>
            </button>
          </DrawerLinkWrapper>

          <Navbar.Header>
            <Navbar.Toggle className="hiddenSm"/>
          </Navbar.Header>
          <Navbar.Collapse className="noPrint">
            <NavigationItems primary className="forceCenter"/>
          </Navbar.Collapse>
          <RightArea>
            <RightUl>
              <li className="noMd"><Link to="/subscribe" className="redItalic">Subscribe</Link></li>
              {/* <li className="noMd"><Link to="https://id.zoomer.ca/" className="blackItalic">Sign In</Link></li> */}
              <li>
                <FontAwesome name='search' className="searchIcon" onClick={() => {this.props.toggleSearchPanel(true)}}/>
              </li>
            </RightUl>
          </RightArea>
          {/* <SocialMediaTopNav pullRight className="smTopNav">
            <NavItem>
                <FontAwesome name='search' className="searchIcon" onClick={() => {this.props.toggleSearchPanel(true)}}/>
            </NavItem>
            <NavItem eventKey={1} href="https://www.facebook.com/everythingzoomer" target="_blank"><FontAwesome name='facebook'/></NavItem>
            <NavItem eventKey={1} href="https://twitter.com/zoomer" target="_blank"><FontAwesome name='twitter'/></NavItem>
            <NavItem eventKey={1} href="https://www.instagram.com/ZoomerMag/" target="_blank"><FontAwesome name='instagram'/></NavItem>
            <NavItem eventKey={1} href="https://www.instagram.com/ZoomerMag/" target="_blank"><FontAwesome name='pinterest'/></NavItem>
          </SocialMediaTopNav> */}
        </ZMNavbarDesk>
      );
    } else {
      return (
        <ZMNavbar className="zFrontBackup noPrint" collapseOnSelect>
          <Navbar.Header className="specialMobNavHeader">
            <DrawerLinkWrapperMini>
                <a onClick={(e) => {
                  e.preventDefault();
                  this.props.toggleMenu();
                }}>
                  <FontAwesome name='bars' className="drawerHamburger"/>
                </a>
            </DrawerLinkWrapperMini>
            <Navbar.Brand>
              <MobileLogoLink to='/' className="noPrint">
                <MobileLogoImg src={LogoImage} alt="Everything Zoomer" className="full noPrint" />
              </MobileLogoLink>
            </Navbar.Brand>
            <Navbar.Toggle className="stickyToggle" />
          </Navbar.Header>
          <Navbar.Collapse className="noPrint">
            <NavigationItems secondary className="noPrint"/>
          </Navbar.Collapse>
          <RightArea>
            <RightUl>
              <li className="noMd"><Link to="/subscribe" className="redItalic">Subscribe</Link></li>
              {/* <li className="noMd"><Link to="https://id.zoomer.ca/" className="blackItalic">Sign In</Link></li> */}
              <li>
                <FontAwesome name='search' className="searchIcon" onClick={() => {this.props.toggleSearchPanel(true)}}/>
              </li>
            </RightUl>
          </RightArea>
        </ZMNavbar>
      );
    }

  }

}

const mapStateToProps = createStructuredSelector({});

function mapDispatchToProps(dispatch) {
  return {
      toggleSearchPanel: (isSearchPanelOpen=true) => {
        // // console.log('ok. toggleSearchPanel()');
        dispatch(toggleSearchPanel(isSearchPanelOpen));
      },
    toggleMenu: () => {
      // console.log('toggleMenu');
      dispatch(toggleMenu(true));
    },
    dispatch,
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(DesktopNavBar);
// export default HeaderMasthead;
