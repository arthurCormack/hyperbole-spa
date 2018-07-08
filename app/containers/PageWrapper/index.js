/*
 *
 * PageWrapper
 *
*/

import React from 'react';
import { connect } from 'react-redux';
import { push } from 'react-router-redux';

import { Link } from 'react-router-dom';

import { createStructuredSelector } from 'reselect';
import { selectIsSocialSharingPanelOpen, selectSocialSharingTitle, selectSocialSharingURL } from 'components/SocialShareBtns/selectors';
import { action as toggleMenu } from 'redux-burger-menu';

import { toggleSearchPanel } from 'containers/SearchPanel/actions';
import { conjureSocialMediaThing } from 'components/SocialShareBtns/actions';

import styled from 'styled-components';
import FontAwesome from 'react-fontawesome';
import { Image, Popover, Tooltip } from 'react-bootstrap';
import Menu from 'containers/ReduxBurgerMenu';

import ZDaily from 'containers/DynamicRegions/SpecialCategoriesColumn/images/zoomerdaily.png';
import PoliticsPolicy from 'containers/DynamicRegions/SpecialCategoriesColumn/images/politics-policy.png';
import ArtsEnt from 'containers/DynamicRegions/SpecialCategoriesColumn/images/artsandent.png';
import StarsRoyals from 'containers/DynamicRegions/SpecialCategoriesColumn/images/stars-and-royals.png';
import SexLove from 'containers/DynamicRegions/SpecialCategoriesColumn/images/sex-love.png';
// import AgesAndIcons from 'containers/DynamicRegions/SpecialCategoriesColumn/images/agesandicons.png';
// import ArtsEnt from 'containers/DynamicRegions/SpecialCategoriesColumn/images/artsandent.png';
// import ZPhil from 'containers/DynamicRegions/SpecialCategoriesColumn/images/zphilosophy.png';
// import BookClub from 'containers/DynamicRegions/SpecialCategoriesColumn/images/book-club-icon.png';
// import TravelClub from 'containers/DynamicRegions/SpecialCategoriesColumn/images/travel-icon.png';

import SearchPanel from 'containers/SearchPanel';
import ModalSearchHolder from 'containers/ModalSearchHolder';
// import { throttle } from 'lodash';
// import { setScrollTop } from 'containers/App/actions';
// import he from 'he';
// import BurgerMenu from 'react-burger-menu';


import { msg } from 'utils/msg';

class MenuWrap extends React.Component {// eslint-disable-line react/prefer-stateless-function
  constructor (props) {
    super(props);
    // this.state = {
    //   hidden: false
    // };
  }

  componentWillReceiveProps(nextProps) {
    const sideChanged = this.props.children.props.right !== nextProps.children.props.right;
  }


  render() {
    // console.log(`PageWrapper.render()`);
    return (
      <div style={{display: this.state.hidden ? 'none' : ''}} className={this.props.side}>
        {this.props.children}
      </div>
    );
  }
}

class PageWrapper extends React.Component { // eslint-disable-line react/prefer-stateless-function
  constructor() {
    super();
    // this.state = {
    //   currentMenu: 'slide',
    //   side: 'left'
    // };
    this.handleScroll.bind(this);
    this.test.bind(this);
    //this.state.previousScrollTop = 0;
    // this.state = {'previousScrollTop':0};
    // this.setState({'previousScrollTop':0});
    // this.props.previousScrollTop = 0;
  }

  componentWillReceiveProps(nextProps) {

  }
  componentDidUpdate() {
    msg(`PageWrapper.componentDidUpdate()`);
  }

  componentDidMount() {
      // // console.log(`Pagewrapper.componentDidMount()`);
      // window.fbAsyncInit = function() {
      //   FB.init({appId:'534273583592060', cookie:true, xfbml:true, version:'v2.11'});
      //   FB.AppEvents.logPageView();
      // };
      // (function(d, s, id){
      //    var js, fjs = d.getElementsByTagName(s)[0];
      //    if (d.getElementById(id)) {return;}
      //    js = d.createElement(s); js.id = id;
      //    js.src = "https://connect.facebook.net/en_US/sdk.js";
      //    fjs.parentNode.insertBefore(js, fjs);
      //  }(document, 'script', 'facebook-jssdk'));
  }

  test() {
    // console.log('test')
  }
  handleScroll(e) {
    // // const isSticky = document.body.scrollTop > 380;
    // // if (this.refs.AffixedNav) {
    // //     this.setState({ stuck: isSticky });
    // // }
    // //// console.log(`PageWrapper.handleScroll`);
    // // // console.log(this.refs.pagewrapperoutercontainer.scrollTop);
    // //pagewrapper-outer-container
    // // const outerContainer = document.getElementById("page-wrap");
    // //// console.log(document.body.scrollTop);
    // //// console.log(e);
    // // const previousScrollTop = this.state.previousScrollTop;// for some reason this isn't getting through.
    // // alternative approach is to dispatch an action here.
    // const someScrollTop = e.target.scrollingElement.scrollTop;
    // // const scrollDirection = previousScrollTop > someScrollTop ? 1 : -1;
    // this.props.setScrollTop(someScrollTop);
    // // this.test();
    // // // console.log(`scrollDirection=${scrollDirection}`);

  }


  render() {
    const Main = styled.main`
      position:relative;
      z-index:1;
    `;
    const OuterContainer = styled.div`

      ${'' /* Position and sizing of burger button */}
      .bm-burger-button {
        ${'' /* position: fixed;
        width: 36px;
        height: 30px;
        left: 36px;
        top: 36px; */}
        display:none;
      }

      ${'' /* Color/shape of burger icon bars */}
      ${'' /* .bm-burger-bars {
        background: #373a47;
      } */}

      ${ ''/* Position and sizing of clickable cross button */}
      .bm-cross-button {
        height: 24px;
        width: 24px;
      }

      ${'' /* Color/shape of close button cross */}
      .bm-cross {
        background: #bdc3c7;
      }

      ${'' /* General sidebar styles */}
      .bm-menu {
        background: #fff;
        padding: 0 10px 0 10px;
        font-size: 1.15em;

        /*scroll*/
        ${'' /* margin-left: 10px; */}
        float: left;
        height: 300px;
        width: 300px;
        background: #F5F5F5;
        overflow-y: scroll;
        margin-bottom: 25px;

              }


        /*scroll?*/
        .bm-menu::-webkit-scrollbar {
          width: 10px;
          background-color:#e6e6e6;
        }

        .bm-menu::-webkit-scrollbar-track {
          -webkit-box-shadow: inset 0 0 6px rgba(0,0,0,0.3);
          background-color: #F5F5F5;
        }

        .bm-menu::-webkit-scrollbar {
          width: 6px;
          background-color: #F5F5F5;
        }
        .bm-menu::-webkit-scrollbar-thumb {
          background-color: #000000;
        }



      ${'' /* Morph shape necessary with bubble or elastic */}
      .bm-morph-shape {
        fill: #fff;
      }

      .bm-menu-wrap  {
        z-index: 99999 !important;
      }

      ${'' /* Wrapper for item list */}
      .bm-item-list {
        color: #b8b7ad;
        padding: 0.8em;
      }

      ${'' /* Styling of overlay */}
      .bm-overlay {
        z-index: 999 !important;
        background: rgba(0, 0, 0, 0.5) !important;
      }

    `;

    const popover = (
      <Popover id="modal-popover" title="popover">
        very popover. such engagement
      </Popover>
    );
    const tooltip = (
      <Tooltip id="modal-tooltip">
        wow.
      </Tooltip>
    );


    return (
      <OuterContainer ref="pagewrapperoutercontainer" id="outer-container" style={{height: '100%'}}>
        <ModalSearchHolder />
        {/* <div className="searchModal">
          <Modal show={this.props.isSearchPanelOpen} onHide={() => this.props.closeSearchPanel()} key="searchModal">
            <Modal.Header closeButton>
              <Modal.Title>Search EverythingZoomer</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <SearchPanel />
            </Modal.Body>
            <Modal.Footer>
              <Button onClick={() => this.props.closeSearchPanel()}>Close</Button>
            </Modal.Footer>
          </Modal>
        </div> */}
        <Menu id="SlidingSideMenu" pageWrapId={'page-wrap'} outerContainerId={'outer-container'}>
          <div className="full">
            <div className="sidebarHeading">
              {/* <h1>EZ</h1> */}
            </div>
            {/* <div className="sideBarUnderline"></div> */}
            <div className="specialCategories">

              <div className="smallOnly">
                <div className="importantCats">

                  <a onClick={(e) => {
                    e.preventDefault();
                    this.props.handleSpecialCatClick('/');
                  }}>
                    <FontAwesome name="home"></FontAwesome>&nbsp;Home
                  </a>
                  <a onClick={(e) => {
                    e.preventDefault();
                    this.props.handleSpecialCatClick('/health');
                  }}>
                    <FontAwesome name="heartbeat"></FontAwesome>&nbsp;Health
                  </a>
                  <a onClick={(e) => {
                    e.preventDefault();
                    this.props.handleSpecialCatClick('/money');
                  }}>
                    <FontAwesome name="usd"></FontAwesome>&nbsp;Money
                  </a>
                  <a onClick={(e) => {
                    e.preventDefault();
                    this.props.handleSpecialCatClick('/travel');
                  }}>
                    <FontAwesome name="plane"></FontAwesome>&nbsp;Travel
                  </a>
                  <a onClick={(e) => {
                    e.preventDefault();
                    this.props.handleSpecialCatClick('/food-drink-entertaining');
                  }}>
                    <FontAwesome name="cutlery"></FontAwesome>&nbsp;Food
                  </a>
                  <a onClick={(e) => {
                    e.preventDefault();
                    this.props.handleSpecialCatClick('/style');
                  }}>
                    <FontAwesome name="shopping-bag"></FontAwesome>&nbsp;Style
                  </a>



                  {/* <Link to="/"><FontAwesome name="home"></FontAwesome>&nbsp;Home</Link>
                  <Link to="/health"><FontAwesome name="heartbeat"></FontAwesome>&nbsp;Health</Link>
                  <Link to="/money"><FontAwesome name="usd"></FontAwesome>&nbsp;Money</Link>
                  <Link to="/travel"><FontAwesome name="plane"></FontAwesome>&nbsp;Travel</Link>
                  <Link to="/food-drink-entertaining"><FontAwesome name="cutlery"></FontAwesome>&nbsp;Food</Link>
                  <Link to="/style"><FontAwesome name="shopping-bag"></FontAwesome>&nbsp;Style</Link> */}

                </div>
              </div>


              <button onClick={() => this.props.handleSpecialCatClick('/tag/zoomer-daily')} className="mobileDrawerCat specialCat">
                <div className="specialWidthWrap">
                  <Image src={ZDaily}/>
                </div>
                <span className="drawerBallTitle">#ZoomerDaily</span>
                <div className="full">
                  <div className="specialUnderline"></div>
                </div>
              </button>

              <button onClick={() => this.props.handleSpecialCatClick('/tag/politics-policy/')} className="mobileDrawerCat specialCat">
                <div className="specialWidthWrap">
                  <Image src={PoliticsPolicy}/>
                </div>
                {/* <button> */}
                  <span className="drawerBallTitle">Politics &amp; Policy</span>
                {/* </button> */}
                <div className="full">
                  <div className="specialUnderline"></div>
                </div>
              </button>

              <button onClick={() => this.props.handleSpecialCatClick('/tag/arts-and-entertainment')} className="mobileDrawerCat specialCat">
                <div className="specialWidthWrap">
                  <Image src={ArtsEnt}/>
                </div>
                <span className="drawerBallTitle">Arts &amp; Entertainment</span>
                <div className="full">
                  <div className="specialUnderline"></div>
                </div>
              </button>

              <button onClick={() => this.props.handleSpecialCatClick('/tag/stars-and-royals')} className="mobileDrawerCat specialCat">
                <div className="specialWidthWrap">
                  <Image src={StarsRoyals}/>
                </div>
                <span className="drawerBallTitle">Stars &amp; Royals</span>
                <div className="full">
                  <div className="specialUnderline"></div>
                </div>
              </button>



              <button onClick={() => this.props.handleSpecialCatClick('/tag/sex-love-relating/')} className="mobileDrawerCat specialCat">
                <div className="specialWidthWrap">
                  <Image src={SexLove}/>
                </div>
                <span className="drawerBallTitle">Sex &amp; Love</span>
                <div className="full">
                  <div className="specialUnderline"></div>
                </div>
              </button>


            </div>

            {/* Subscribe */}

            <div className="sideBarUnderline"></div>

            <div className="full">
              <h1 className="sidebarHeading">Subscribe</h1>
            </div>

            <div className="importantLinks">
              <Link to="/sign-up" onClick={() => this.props.handleDrawerClose()}>Newsletters</Link>
              <a href="https://secure.zoomer.ca/new/ez_subscribe" target="blank">Magazine</a>
            </div>

            <div className="socialMediaLinks">
              <a target="_blank" href="https://www.facebook.com/everythingzoomer" className="socialCircle"><FontAwesome name='facebook' className="socialIcon"/></a>
              <a target="_blank" href="https://twitter.com/zoomer" className="socialCircle"><FontAwesome name='twitter' className="socialIcon"/></a>
              <a target="_blank" href="https://www.instagram.com/everythingzoomer/" className="socialCircle"><FontAwesome name='instagram' className="socialIcon"/></a>
              {/* <a target="_blank" href="https://www.pinterest.ca/zoomerlife/" className="socialCircle"><FontAwesome name='pinterest' className="socialIcon"/></a> */}
            </div>

            {/* Footer Links */}

            <div className="sideBarUnderline"></div>

            <div className="full">
              <h1 className="sidebarHeading">Everything Zoomer</h1>
            </div>

            <div className="importantLinks">
              <Link to="/about" onClick={() => this.props.handleDrawerClose()}>About</Link>
              <Link to="/privacy-policy" onClick={() => this.props.handleDrawerClose()}>Privacy Policy</Link>
              <Link to="/advertise-with-us" onClick={() => this.props.handleDrawerClose()}>Advertise</Link>
              <Link to="/contact-us" onClick={() => this.props.handleDrawerClose()}>Contact Us</Link>
            </div>

          </div>
        </Menu>
          <Main id="page-wrap">
            {React.Children.toArray(this.props.children)}
          </Main>
      </OuterContainer>
    );
  }
}

PageWrapper.defaultProps = {
  isSearchPanelOpen: false,
  isSocialSharingPanelOpen: false,
};

//isSocialSharingPanelOpen
const mapStateToProps = createStructuredSelector({
  // isSearchPanelOpen: selectIsSearchPanelOpen(),
  // lastScrollingDirection: selectLastScrollDirection(), pagewrapper shouldn't need to have props change on scroll ... avoid rerendering!
  isSocialSharingPanelOpen: selectIsSocialSharingPanelOpen(),
  socialSharingTitle: selectSocialSharingTitle(),
  socialSharingURL: selectSocialSharingURL(),
});



function mapDispatchToProps(dispatch) {
  return {
    closeSearchPanel: () => {
      // console.log('... attempting to closeSearchPanel ...');
      dispatch(toggleSearchPanel(false));
    },
    closeSocialSharingPanel: () => {
      // console.log('... attempting to closeSocialSharingPanel ...');
      dispatch(conjureSocialMediaThing(null, null, false));
    },
    // setScrollTop: (scrollTop) => {
    //   dispatch(setScrollTop(scrollTop));
    // },
    handleSpecialCatClick: (whichPath) => {
      // close the drawer
      // navigate
      //dispatch(toggleMenu(false));
      setTimeout(() => {
        dispatch(toggleMenu(false));
      }, 200);
      dispatch(push(whichPath));
    },
    handleDrawerClose: () => {
      // // console.log("CLOSE THE DRAWER");
      setTimeout(() => {
        dispatch(toggleMenu(false));
      }, 200);
    },
    dispatch,
  };
}
export default connect(mapStateToProps, mapDispatchToProps)(PageWrapper);
