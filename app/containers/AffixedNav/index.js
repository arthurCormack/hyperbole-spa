/**
*
* AffixedNav
*
*/

import React from 'react';
// import ReactDOM from 'react-dom';
import { connect } from 'react-redux';
import { AutoAffix } from 'react-overlays';
import Waypoint from 'react-waypoint';
import { media } from 'style-utils';
import { Image, Navbar, Nav, NavItem, Button } from 'react-bootstrap';
import LogoImage from 'containers/PageWrapper/images/sticky_nav_logo.png';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import NavigationItems from 'components/NavigationItems';
import FontAwesome from 'react-fontawesome';
import { toggleSearchPanel } from 'containers/SearchPanel/actions';
import {action as toggleMenu} from 'redux-burger-menu';
import { createStructuredSelector } from 'reselect';
import { debounce } from 'lodash';
class AffixedNav extends React.PureComponent {
  constructor() {
    super();
    this.state = {
      stuck: false,
    };
    this.handleScroll = this.handleScroll.bind(this);
  }

    componentDidMount() {
      window.addEventListener('scroll', this.handleScroll);
    }

    handleScroll(e) {

      const isSticky = e.target.scrollingElement.scrollTop > this.props.topPx;
      if (this.refs.AffixedNav) {
        
        if (isSticky) {
          document.body.classList.add('navIsSticky');
        } else {
          document.body.classList.remove('navIsSticky');
        }
      }
    }

    setStickyness() {
      this.setState({ stuck: this.state.stuck });
    }


    displayStickyNav(){

      const DrawerLinkWrapperHome = styled.div`
        position: relative;
        float: left;
        width: 50px;
        a {
          color: #000 !important;
          float: left;
        }
        a:hover {
          cursor: pointer;
        }
        ${media.small`
        width: 50px;
        padding-left: 22px;
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
          .navbar-header {
            float: left;
            width: 100%;
            .stickyToggle {
              display: none;
            }
          }
          .navbar-collapse {
            display: none !important;
          }
        `}
      `;

      const ZMNavItem = styled(NavItem)`
        a {
          color: #000 !important;
        }
        ${media.small`
          display: none !important;
        `}
      `;

      const DrawerLinkWrapper = styled.div`
        position: absolute;
        left: 40px !important;
        a {
          color: #000 !important;
        }
        &:hover {
          cursor: pointer;
        }
      `;

      const RightArea = styled.div`
        float: right;
        ${media.small`
          display: none !important;
        `}
      `;

      const RightUl = styled.ul`
        position: absolute;
        right: 50px;
        li{
          float: left;
          text-transform: capitalize;
          margin: 0 9px;
          height: 51px;
          line-height: 47px;
          &:hover{
            cursor: pointer;
          }
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
        ${media.small`

        `}
      `;

      const ImgLogo = styled(Image)`
        width: 130px;
        position: absolute;
        top: 11px;
        left: 100px;
        ${media.medium`
          width: 120px;
          top: 13px;
          left: 77px;
        `}
        ${media.small`
          width: 120px;
          top: 13px;
        `}
      `;

      // if (this.state.stuck) {
      if (true) {// so .. no it's always true.
        return (
          <div ref="AffixedNav" className="AffixedNav">
            {/* <Waypoint onEnter={this.handleEnter} /> */}
            <AutoAffix viewportOffsetTop={0} className="noPrint">
              <ZMNavbar className="zFrontBackup" collapseOnSelect>
                <Navbar.Header>
                  <DrawerLinkWrapper>
                    <button onClick={(e) => {
                      e.preventDefault();
                      this.props.toggleMenu();
                      }
                    }>
                      <FontAwesome name='bars' className="drawerHamburger"/>
                    </button>
                  </DrawerLinkWrapper>
                  <Navbar.Brand>
                    <LogoLink to='/'>
                      <ImgLogo src={LogoImage} alt="Everything Zoomer" className="full" />
                    </LogoLink>
                  </Navbar.Brand>
                  <Navbar.Toggle className="stickyToggle" />
                </Navbar.Header>
                <Navbar.Collapse>
                  <NavigationItems secondary/>
                </Navbar.Collapse>
                <RightArea>
                  <RightUl>
                    <li className="noMd"><Link to="/subscribe" className="redItalic">Subscribe</Link></li>
                    {/* <li className="noMd"><Link to="https://id.zoomer.ca/" className="blackItalic">Sign In</Link></li> */}
                    <li>
                      <FontAwesome name='search' className="searchIcon" onClick={() => {this.props.toggleSearchPanel(true)}} />
                    </li>
                  </RightUl>
                </RightArea>
              </ZMNavbar>
            </AutoAffix>
          </div>
        );
      } else {
        return (<div ref="AffixedNav" />);
      }
    }

  render() {
    return(
      <div>
        {this.displayStickyNav()}
      </div>
    );
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
      // e.preventDefault();
      dispatch(toggleMenu(true));
    },
    stuck: false,
    dispatch,
  };
}


export default connect(mapStateToProps, mapDispatchToProps)(AffixedNav);
