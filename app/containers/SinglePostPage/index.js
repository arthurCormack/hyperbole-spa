/*
 *
 * SinglePostPage
 *
 */

import React from 'react';
import PropTypes from 'prop-types';

import ReactDOM from 'react-dom';
import { connect } from 'react-redux';
import { push } from 'react-router-redux';
import Helmet from 'react-helmet';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';
import injectSaga from 'utils/injectSaga';
import { RESTART_ON_REMOUNT } from 'utils/constants';
import injectReducer from 'utils/injectReducer';
import reducer from './reducer';
import saga from './saga';

import { throttle, clone, isEqual } from 'lodash';
import { format } from 'date-fns'
import { Grid, Row, Col, Image, Button } from 'react-bootstrap';
// import scrollToComponent from 'react-scroll-to-component';// react-scroll-to-component-ssr
import scrollToComponent from 'react-scroll-to-component-ssr';

// import HeaderMasthead from 'components/HeaderMasthead';
import SponsoredContainer from 'components/SponsoredContainer';
import SocialShareBtns from 'components/SocialShareBtns';
//
import Waypoint from 'react-waypoint';
import styled from 'styled-components';
import NotFoundPage from 'containers/NotFoundPage';
import { isClientMobile } from 'utils/detection';
//
import {
  setCurrentlyDisplayedItemIndex,
  setCurrentlyDisplayedItemIndexWaypointInitiated,
  scrollingAddressChange,
  autoScrollingToPost,
  deduceCurrentlyDisplayedItemIndex,
  arrivingForFirstTime,
  addWaypointToViewport,
  removeWaypointFromViewport,
  setCurrentPostStackDisplayData,
  bottomOfStackReached,
  setForceRender,
} from './actions';
//
import { setScrollTop, setAdTimePastMinimumThreshold } from 'containers/App/actions';

import {
  selectGlobal,
  makeSelectLoading,
  makeSelectError,
  selectLastScrollDirection,
} from 'containers/App/selectors';

import {
  selectCurrentlyDisplayedItemIndex,
  selectCurrentlyDisplayedItemIndexWaypointInitiated,
  selectPostStack,
  selectDisplayedPostStack,
  selectCurrentlyDisplayedItem,
  selectCurrentlyDisplayedItemPostTitle,
  selectCurrentlyDisplayedItemExcerpt,
  selectCurrentlyDisplayedItemFeaturedImage,
  selectCurrentlyDisplayedItemFeaturedImageSrc,
  selectCurrentlyDisplayedItemPermalink,
  selectCurrentlyDisplayedItemPostID,
  selectLoading,
  selectError,
  selectStoredScrollTop,
  selectAutoScrollingToPost,
  selectWaypointsInViewport,
  selectArrivedForFirstTime,
  selectForceRender,
  selectFoundRoute,
} from './selectors';

import ScrollToTopOnMount from 'components/ScrollToTopOnMount';
import Leaderboard from 'components/Leaderboard';
import LeaderboardHolder from 'containers/LeaderboardHolder';

import AffixedSidebar from 'containers/AffixedSidebar';
import ShrinkBoxVideo from 'components/ShrinkBoxVideo';
import InterstitialAdHolder from 'containers/InterstitialAdHolder';

import he from 'he';
import zmShorten from 'utils/zmShorten';
import zmStrip from 'utils/zmStrip';

import RelativeGrid from 'components/styled/RelativeGrid';
import { AuthorLink } from 'components/styled/Common';
import { RedTagLgLink, MargedDiv, WhiteCol, HeroWrapper, WhiteRow, ArticleCol, ContentRow, AbsoluteRow, ArticleTitleCol, ArticleInfo, Separator } from 'components/styled/GridStyles';
import InterstitialWrapper from 'components/styled/InterstitialWrapper';
import SMEB from 'containers/DynamicRegions/SimpleMagicEditButton';
import { msg } from 'utils/msg';

export class SinglePostPage extends React.Component {// eslint-disable-line react/prefer-stateless-function
  constructor() {
    super();
    this.containerWaypointEnter.bind(this);
    this.containerWaypointLeave.bind(this);
    this.handleScroll.bind(this);
  }


  componentWillMount() {

  }

  componentDidMount() {
    if (this.props.arrivedForFirstTime === false) {
      this.props.arrivingForFirstTime();
    }
    window.addEventListener("scroll", throttle(
      (e) => {
        this.handleScroll(e)
      }, 500)
    );
  }

  handleScroll(e) {
    const someScrollTop = e.target.scrollingElement.scrollTop;

    this.props.setScrollTop(someScrollTop);
  }


  // how will we trigger the next thing, when we get to the end of the current thing?
  // when is it safe to load in the next thing in the stack?
  // the default is to return false; ie like when loading changes, or error changes ... we only need to detect for circumstances where it might be true.

  shouldComponentUpdate(nextProps) {
    // console.log('SinglePostPage.shouldComponentUpdate()');// forceRender
    if (nextProps.forceRender) {
      // console.log(`nextProps.forceRender==${nextProps.forceRender} shouldComponentUpdate returns true`);
      return true;
    }
    if (this.props.location.pathname !== nextProps.location.pathname) {
      // console.log(`this.props.location.pathname !== nextProps.location.pathname`);
      return true;
    } else {
      if (typeof nextProps.autoScrollingToPost === 'string') {
        // console.log(`typeof nextProps.autoScrollingToPost === 'string'`);
        return true;
      }// a mistake ... we meant to say this.props.autoScrollingToPost or nextProps.autoScrollingToPost
      // console.log('returning default of false');
      // console.log('SinglePostPage.shouldComponentUpdate()', false);
      if (this.props.postStack.length === 0) {
        if (nextProps.postStack.length > 0) {
          return true;
        }

        // if (nextProps.postStack) {
        //
        // }
      }
      if (isEqual(this.props.postStack, nextProps.postStack)) {
        return true;
      }
      return false;
    }
  }

  /*
  ok ... big mystery here ... why do some posts work nicely more or less, and ones that have no content just blow up?
  what is different?
  */
  componentWillUpdate() {

  }

  componentDidUpdate(prevProps, prevState) {
    // console.log('SinglePostPage.componentDidUpdate()');
    if (this.props.forceRender && !this.props.loading) {// waiting for this.props.loading to be false, means that we can force a render when we get the last thing
      this.props.dispelForceRender();
    }
    // so we just updated ... that also means that we need to make a call to App's setAdTimePastMinimumThreshold ... i mean dispatch that action,
    // that action sets a says that its not ok to do spontaneous rerenders, until the safety timer has gone off. there is a saga that will also be listening ... this saga also has to be at the app level, so that all route containers will have easy access to it withoug havint to crosswire things.
    // but will we have to trigger that time, in every route? every route that has ads. does the App rerender each time that a route container re-renders? maybe it should be placed at the PageWrapper level, since App isn't really even a container, just a function.

    // this.props.setAdTimePastMinimumThreshold();

    // we also need to disel the forceRender if there is one.
    // // console.log('this.props.autoScrollingToPost==');
    // // console.log(this.props.autoScrollingToPost);
    if (this.props.autoScrollingToPost === false) {
      // do nothing
    } else if (this.props.autoScrollingToPost === true) {
      // do nothing.
    } else {
      // but wait ... we only want to do this, if we need to! ascertaine that first!
      // aha ... we don't actually get the update if should component update prevents it!
      const postToScrollTo = `contentrow_${this.props.autoScrollingToPost}`; // stores it, so that we don't lose it, after dispatching action
      // console.log(`ok, so are we autoScrolling to ${postToScrollTo} now or what?`);
      // console.log(this.refs[postToScrollTo]);// undefined!!!

      // dispatch action, that will result in this.props.autoScrollingToPost being true
      //// console.log('startScrollingToPost?!!!!!');
      this.props.startScrollingToPost(true);// this just sets a flag in state, which says that the scrolling has already began, so don't start it again.
      // we need to also update the stack index
      // this.props.updateDisplayedItemIndex();// this will change the address!
      // scrollToComponent ... using this.refs[postToScrollTo]
      // scrollToComponent(this.Orange, { offset: 0, align: 'top', duration: 500, ease:'inCirc'})
      scrollToComponent(this.refs[postToScrollTo], { offset: 0, align: 'top', duration: 500, ease:'inCirc'});// this is the4 actual scrolling mechanism
      setTimeout(() => {
        // console.log('and now the timer calls startScrollingToPost(false) after 500ms');
        this.props.startScrollingToPost(false);
      }, 500);
    }

  }


  // i think maybe the problem is that we are storing the waypoints in viewport array in the props directly, and that results in this bizarre trap ... an infinite shouldComponentUpdate trap
  containerWaypointEnter(index) {
    // console.log(`containerWaypointEnter(${index})`);
    this.props.addWaypointToViewport(index, this.props.waypointsInViewport, this.props.currentlyDisplayedItemIndex, this.props.loading);
  }

  // removeWaypointFromViewport, removeWaypointFromViewport
  containerWaypointLeave(index) {
    // console.log(`containerWaypointLeave(${index})`);
    this.props.removeWaypointFromViewport(index, this.props.waypointsInViewport, this.props.currentlyDisplayedItemIndex);
  }


  render() {

    console.log('SinglePostPage.render()');

    if (this.props.foundRoute === false) {
      return (<NotFoundPage />);
    }

    const H1 = styled.h1`

    `;

    const MoveLeftDiv = styled.div`
      position: relative;
      left: -20px;
      top: 70px;
    `;
    const FullWidthAd = styled.div`
      text-align: center;
      min-height: 120px;
      margin: 34pt 0;
      position: relative;
    `;
    const PortraitDiv = styled.div`
      text-align: center;
      min-height: 120px;
      margin: 4pt 0;
      position: relative;
      left: 0;
    `;

    const BackTopTopBtn = styled(Button)`
      position: fixed;
      bottom: 30px;
      right: 30px;

      font-size: 34pt;
      background: none;
      background: #ffffff;
      height: 60px;
      width: 60px;
      line-height: 1;
    `;

    let pageTitle = "EZ";
    let metaDescription = "";
    let ogImage = null;
    let ogImageHeight = null;
    let ogImageWidth = null;
    if (this.props.currentlyDisplayedItemPostTitle !== null) {// this won't get set until after the waypoint triggers the setting of the current index!
      pageTitle = he.decode(this.props.currentlyDisplayedItemPostTitle);
      metaDescription = zmStrip(this.props.currentlyDisplayedItemExcerpt);
      if (this.props.currentlyDisplayedItemFeaturedImageSrc !== null) {
        ogImage = this.props.currentlyDisplayedItemFeaturedImageSrc;
        ogImageWidth = 560;
        ogImageHeight = 480;
      }
    } else if (typeof this.props.postStack === 'object' && this.props.postStack !== null && this.props.postStack.length > 0) {
      // pageTitle
      // console.log('hello from 255');
      if (typeof this.props.postStack[0] !== 'undefined') {
        pageTitle = he.decode(this.props.postStack[0].post_title);
        metaDescription = zmStrip(this.props.postStack[0].excerpt);
        if (this.props.postStack[0].thumbnail_medium !== null) {
          ogImage = this.props.postStack[0].thumbnail_medium.src;
          ogImageWidth = 560;
          ogImageHeight = 480;
        }
      }

    } else {
      // // console.log("WHY!!!");
    }
    // maybe on the initial render, since there is no currentlyDisplayed anything, the page title doesn't get set at all.


    // const ogTitle = zmStrip(pageTitle);
    const ogTitle = pageTitle;
    // // console.log(`The ogTitle should be: ${ogTitle}`);
    // const ogDesc = zmShorten(metaDescription);
    const ogDesc = metaDescription;
    const getOgUrl = (path) => {
      const baseURL = 'http://www.everythingzoomer.com';
      let pathName = path;
      return (baseURL + pathName);
    }
    const ogURL = getOgUrl(this.props.location.pathname);
    // // console.log(`ogURL==${ogURL}`);


    let mainContent = null;

    // this is going to be fun. we are going to have to update the Helmet stuff, whenever there is a change. but i suppose this could magically happen, when states change.

    // we have a stack. and the way that we construct the stuff that goes into a singlepostpage is different than before
    // we loop through the itmes in the stack, conjuring new single posts, but then at the end, beneath the single posts, we put some other stuff.
    // related content. reccomended posts. a new add, a Waypoint.
    // the Waypoint triggers a call to load in a new chunk. we might actually need to have 2 Waypoints. One to load in the new chunk, and another to update the url.
    // but wait ... thats tricky. because if the load of the new post isn't directly tied to the change in address, then what is it tied to?
    // do we want to consider a preload mechanism? let's try not preloading - simply because its simpler/quicker. we can worry about that should it prove neccesary.

    // I have discovered an important fact today, regarding react component updates and mounting, etc...
    // a components can be optimized, and not rerender ...
    // but containers, that have state / prop updates within a parent, get re-drawn, re-mounted.
    // so ... solution ... is to stick with dumb components in the stack. putting containers in the stack, inside the parent container, means that the child containers have to get remounted ... i think it has to do with the connect thing.
    // maybe there is a way in redux land to ensure that re-mounted doesn't happen, or maybe there is a way to sort of encapsulate the next thing in the stack inside another container, that can update with new// asynchronous data one it gets loaded, without disrupting the parent's stack, and forcing remounting of all its children ...
    // https://github.com/reactjs/react-redux/issues/507 adresses react-redux's connect, and how connect's shouldComponentUpdate always returns true, when there are props changes. so ...


    const innerstitialLinks = () => {
      return (
        <div>
        </div>
      );
    };



    if (typeof this.props.postStack !== 'object' || this.props.postStack === null ) {
      // console.log(`haven't got a postStack yet, bailing out`);
      return null;
    }

    if (this.props.postStack.length > 0) {
      // let's assume that we can simply iterate through, adding chunnks
      const postStackLength = this.props.postStack.length;
      console.log(`this.props.currentlyDisplayedItemIndex`, this.props.currentlyDisplayedItemIndex);
      mainContent = this.props.postStack.map((item, i) => {

        let isItemTheCurrentThingStyle = i === this.props.currentlyDisplayedItemIndex ? 'theCurrentThing' : 'notTheCurrentThing';
        let isItemTheCurrentThing = i === this.props.currentlyDisplayedItemIndex;

        if (this.props.currentlyDisplayedItemIndex === null) {
          isItemTheCurrentThing = true;
          isItemTheCurrentThingStyle = 'theCurrentThing';
        }

        let postContent = [];

        item.multipage.forEach((item, j) => {
          if (item.format === 'single') {
            postContent.push(<div key={`multipage_pagechunk_${j}`} className="multipaged" dangerouslySetInnerHTML={{__html: item.post_content }} />);
          } else if (item.format === 'split') {
            postContent.push(<div key={`multipage_pagechunk_${j}_top`} className="multipaged split_top" dangerouslySetInnerHTML={{__html: item.post_content_top}}/>);
            postContent.push(<InterstitialAdHolder first={j===0} id="InterstitialAdHolder" active={isItemTheCurrentThing} index={i} key={`multipage_pagechunk_${j}_ad`} className="multipaged split_ad interscroller" />);
            postContent.push(<div key={`multipage_pagechunk_${j}_bottom`} className="multipaged split_bottom" dangerouslySetInnerHTML={{__html: item.post_content_bottom}}/>);
          }
        });

        const somePostDate = format(item.post_date, 'MMMM Do, YYYY');// do we need to make item.post_date a date object before we can format it properly?
        const isLastItem = i+1 === postStackLength ? true : false;
        const itemAddress = typeof window !== 'undefined' ? window.location.href : item.permalink;
        const leaderboardIndex = i+1;
        const largeThumbnail = (typeof item.thumbnails === 'object' && item.thumbnails.length > 0) ? item.thumbnails[0]['full'] : false;
        let itemContent = null;
        let theFeaturedThing = null;
        const post_id = typeof item.id !== 'undefined' ? item.id : null;
        const itemTitle = typeof item.post_title !== 'undefined' ? item.post_title : '';
        const itemExcerpt = typeof item.excerpt !== 'undefined' ? item.excerpt : '';
        const itemThumbnail = typeof item.thumbnail_medium !== 'undefined' ? item.thumbnail_medium : ''; // get later when available
        const itemSharingLink = typeof item.permalink !== 'undefined' ? item.permalink : ''; // get later when available

        let someSocialSharingStuff = <SocialShareBtns itemAddress={itemAddress} itemTitle={itemTitle} itemExcerpt={itemExcerpt} itemThumbnail={itemThumbnail} itemSharingLink={itemSharingLink} />;

        if (item.featured_video !== null && item.featured_video !== '') {
             theFeaturedThing = (
               <div className="videoWrapper">
                 <ShrinkBoxVideo videoId={item.featured_video} key="featured_video" active={i === this.props.currentlyDisplayedItemIndex ? true : false } className="theFeaturedThingPrint video"/>
               </div>
             );
           } else if (item.thumbnail_huge !== null && item.featured_image_mode === "Full Width") {
             // TODO: use <picture> to make images truly responsive here.
             theFeaturedThing = (
               <div className="full">
                 <Image src={item.thumbnail_huge.src} srcSet={item.thumbnail_huge.srcSet} sizes={item.thumbnail_huge.sizes} responsive className={ item.featured_image_mode === "Full Width" ? 'full theFeaturedThingPrint' : 'notFullWidth padBotMd theFeaturedThingPrint' } />
               </div>
             );
           } else {

             if (item.thumbnails.length === 0 ) {
               // leave theFeaturedThing null
             } else {

               theFeaturedThing = (
                 <div className="full">
                   {/* <Image {...item.thumbnails[0]} responsive className={ item.featured_image_mode === "Landscape Inset" ? 'full theFeaturedThingPrint' : 'notFullWidth padBotMd theFeaturedThingPrint' } /> */}
                   <Image src={item.thumbnails[0].src} srcSet={item.thumbnails[0].srcSet} alt={item.thumbnails[0].alt} sizes={item.thumbnails[0].sizes} className={item.thumbnails[0].class} responsive className={ item.featured_image_mode === "Landscape Inset" ? 'full theFeaturedThingPrint' : 'notFullWidth theFeaturedThingPrint' } />
                 </div>
               );
             }
           }

        let photoCredit = null;
        if (item.photo_credit !== null) {
          photoCredit = (<p>{item.photo_credit}</p>);
        }

        let contestIsClosed = '';
        if (item.contest_closed === true) {
          contestIsClosed = "Closed: ";
        }

        if (item.featured_image_mode === 'Full Width') {
          //// console.log('SinglePostPage.render: Full Width');
          itemContent = (
            <div key={`contentrow_${i}`} ref={`contentrow_${item.permalink}`} id={`contentrow_${item.permalink}`}>
              <RelativeGrid fluid>
                <Row className="fullWidthFeaturedRow">
                  {theFeaturedThing}
                  <div className="fullWidthPhotoCredit">{photoCredit}</div>
                </Row>
                <Grid>
                  {/* <Col md={12} lg={10} lgOffset={1}> */}
                  <Col lg={12}>
                    <AbsoluteRow>
                      <ArticleTitleCol md={9}>
                        {/* <RedTagLgLink to="" className="redTagPostMargin">Cat</RedTagLgLink> */}
                          <H1 dangerouslySetInnerHTML={{ __html: typeof item.post_title !== 'undefined' ? `<span class="contestIsClosed">${contestIsClosed}</span> ${item.post_title}` : ''}} />
                      </ArticleTitleCol>
                    </AbsoluteRow>
                  </Col>
                </Grid>
              </RelativeGrid>
              <Grid>

                <Col lg={12}>
                  <WhiteRow>
                    <ArticleCol md={8}>
                      <ArticleInfo>
                        <div className="full">
                          <span className="bold"><AuthorLink to={item.author_permalink}>{item.author}</AuthorLink></span> | <span>{somePostDate}</span><SMEB post_id={post_id} typeOfThing="post" />
                        </div>
                      </ArticleInfo>
                      <ContentRow className="postContent">
                        <div className="padBotMdFull">
                          {someSocialSharingStuff}
                        </div>
                        {postContent}
                        <div className="full">
                          {someSocialSharingStuff}
                        </div>
                        <Separator />
                        <SponsoredContainer />
                      </ContentRow>

                    </ArticleCol>
                    <Col md={4}>

                      <AffixedSidebar index={i} containmentUnit={() => ReactDOM.findDOMNode(this.refs[`contentrow_${item.permalink}`])} requirePostStackItemConnection={!isClientMobile()} postStackItemConnection={isItemTheCurrentThing} />

                    </Col>
                  </WhiteRow>
                </Col>
              </Grid>

            </div>
          )
        } else if (item.featured_image_mode === 'Landscape Inset') {// this will make it always render using this clause!
          itemContent = (
            <div key={`contentrow_${i}`} ref={`contentrow_${item.permalink}`} id={`contentrow_${item.permalink}`} className="clauseOne">
              <Grid>

                <Col md={12}>
                  <WhiteRow className="padTopBotMd">
                    <div className="headingPostContent">
                      {/* <RedTagLgLink to="/">Cat</RedTagLgLink> */}
                      <H1 dangerouslySetInnerHTML={{ __html: typeof item.post_title !== 'undefined' ? `<span class="contestIsClosed">${contestIsClosed}</span> ${item.post_title}` : ''}} />
                      <ArticleInfo className="noMargLeft"><span className="bold"><AuthorLink to={item.author_permalink}>{item.author}</AuthorLink></span> | <span>{somePostDate}</span><SMEB post_id={post_id} typeOfThing="post" /></ArticleInfo>
                      <div className="padTopBtmMdFull">
                        {someSocialSharingStuff}
                      </div>
                      {theFeaturedThing}
                      <div className="landscapeInsetPhotoCredit">{photoCredit}</div>
                    </div>
                </WhiteRow>
                </Col>
              </Grid>
              <Grid>

                <Col md={12}>
                  <WhiteRow>
                    <ArticleCol md={8}>
                      <ContentRow className="postContent">

                        {/* <div dangerouslySetInnerHTML={{ __html: postContent }} /> */}
                        {postContent}
                        {someSocialSharingStuff}

                        <Separator />
                        <SponsoredContainer />

                      </ContentRow>

                    </ArticleCol>
                    <Col md={4}>

                        <AffixedSidebar index={i} containmentUnit={() => ReactDOM.findDOMNode(this.refs[`contentrow_${item.permalink}`])} requirePostStackItemConnection={!isClientMobile()} postStackItemConnection={isItemTheCurrentThing} />

                    </Col>
                  </WhiteRow>
                </Col>
              </Grid>
            </div>
          );
        } else if (item.featured_image_mode === 'Portrait Inset' || item.featured_image_mode === null) {
          // // console.log(`and here we are at 517`);
          itemContent = (
            <div key={`contentrow_${i}`} ref={`contentrow_${item.permalink}`} id={`contentrow_${item.permalink}`} className="clauseTwo">
              <Grid>

                <Col md={12}>
                  <WhiteRow className="padTopBotMd">
                    <ArticleCol md={8}>
                      <ContentRow className="postContent">

                        <H1 dangerouslySetInnerHTML={{ __html: typeof item.post_title !== 'undefined' ? `<span class="contestIsClosed">${contestIsClosed}</span> ${item.post_title}` : ''}} className="noMargTop"/>
                        <ArticleInfo className="noMargLeft"><span className="bold"><AuthorLink to={item.author_permalink}>{item.author}</AuthorLink></span> | <span>{somePostDate}</span><SMEB post_id={post_id} typeOfThing="post" /></ArticleInfo>
                        <div className="padTopMdFull">
                          {someSocialSharingStuff}
                        </div>
                          {theFeaturedThing}
                          <div className="portraitInsetPhotoCredit">{photoCredit}</div>
                          {postContent}
                        <div className="full">
                          {someSocialSharingStuff}
                        </div>
                        <Separator />
                        <SponsoredContainer />
                      </ContentRow>
                    </ArticleCol>
                    <Col md={4}>
                      <PortraitDiv>
                        <AffixedSidebar index={i} containmentUnit={() => ReactDOM.findDOMNode(this.refs[`contentrow_${item.permalink}`])} requirePostStackItemConnection={!isClientMobile()} postStackItemConnection={isItemTheCurrentThing} />
                      </PortraitDiv>
                    </Col>
                  </WhiteRow>
                </Col>
            </Grid>
          </div>
          );
        } else {
          itemContent = (
            <div key={`contentrow_${i}`} ref={`contentrow_${item.permalink}`} id={`contentrow_${item.permalink}`} className="clauseTwo">
              <Grid>

                <Col md={12}>
                  <WhiteRow className="padTopBotMd">
                    <ArticleCol md={8}>
                      <ContentRow className="postContent">


                        <H1 dangerouslySetInnerHTML={{ __html: typeof item.post_title !== 'undefined' ? `<span class="contestIsClosed">${contestIsClosed}</span> ${item.post_title}` : ''}} className="noMargTop"/>
                        <ArticleInfo className="noMargLeft"><span className="bold"><AuthorLink to={item.author_permalink}>{item.author}</AuthorLink></span> | <span>{somePostDate}</span><SMEB post_id={post_id} typeOfThing="post" /></ArticleInfo>
                        <div className="padTopMdFull">
                          {someSocialSharingStuff}
                        </div>
                          {theFeaturedThing}
                          <div className="portraitInsetPhotoCredit">{photoCredit}</div>

                        {postContent}
                        <div className="full">
                          {someSocialSharingStuff}
                        </div>
                        <Separator />
                        <SponsoredContainer />

                      </ContentRow>

                    </ArticleCol>

                    <Col md={4}>
                      <PortraitDiv>
                        <AffixedSidebar index={i} containmentUnit={() => ReactDOM.findDOMNode(this.refs[`contentrow_${item.permalink}`])} requirePostStackItemConnection={!isClientMobile()} postStackItemConnection={isItemTheCurrentThing} />
                      </PortraitDiv>
                    </Col>

                  </WhiteRow>
                </Col>
            </Grid>
          </div>
          );
        }

        let possibleBackToTopBtn = null;

        // if (isItemTheCurrentThing) // it's the one before that has to be tied.
        // so ... instead, let's put the leaderboard at the top, and not display it it we are at the 0th item in the postStack

        let interstitial = null;
        if (i > 0) {
          interstitial = (
            <InterstitialWrapper>
              {innerstitialLinks()}
              <Row>
                <Col>
                  <LeaderboardHolder ref={`interstitial_leaderboard_${i}`} index={leaderboardIndex} key={`interstitial_leaderboard_${i}`} requirePostStackItemConnection postStackItemConnection={isItemTheCurrentThing}/>
                </Col>
              </Row>
            </InterstitialWrapper>);
        }

        return (
          <div key={`poststack_item_${i}`} className={isItemTheCurrentThingStyle}>
            {interstitial}
            <Waypoint
              onEnter={({ previousPosition, currentPosition, event }) => {// object destructuring to get previousPosition,  currentPosition, event from single obj as if they were seperate params
                console.log(`***** Container poststack_item_${i} Waypoint.onEnter *****`);
                this.containerWaypointEnter(i);

              }}
              onLeave={({previousPosition, currentPosition, event }) => {
                console.log(`***** Container poststack_item_${i} Waypoint.onLeave *****`);
                this.containerWaypointLeave(i);
              }}
              // topOffset={someOffset}
            >
              <div className="postContainer">{itemContent}</div>
            </Waypoint>
            {possibleBackToTopBtn}
          </div>
        );
      // }
      });
    }

    /*
    How is the back to top business going to work? is it a reset? or just scrolling back to the top?
    we could tap into the autoScrollToPost mechanism, and just go to the first on in the postStack. That would be clean, and the mechanism already works.

    how do we load in the next thing, when there is no waypoint to trigger displaying the next thing or even loading in the next thing?
    we always load in the next thing ... and the next next thing, so, if we are at n, we load n+1, and n+2
    but we wait until we get near the bottom to re-render ... and then we always add
    */

    /*
    So if changing the address triggers a re-render; which we do in order to switch helmet values ...
    and sometimes we don't want to have a re-render, because it jiggles things, and sometimes makes a wayport that has left the viewport re-enter the viewport
    what can we do ?
    helmet wrapper? helmetAntennae?  well ... if we stored these helmet vars like og:title, title, etc, in state, and had the helmet inside a helmetAntenna ... it could render, without having to re-render everything else

    */
    // mainContent = (
    //   <div>This is some main content here!</div>
    // );
    return (
      <div>
        <Helmet
          title={pageTitle}
          meta={[
            { name: 'description', content: metaDescription },
            { property: 'og:type', content: 'article' },
            { property: 'og:title', content: ogTitle },
            { property: 'og:description', content: ogDesc },
            { property: 'og:image', content: ogImage },
            { property: 'og:image:width', content: ogImageWidth },
            { property: 'og:image:height', content: ogImageHeight },
            { property: 'og:url', content: ogURL },
          ]}
        />
        <div ref="contenttop"/>
        {mainContent}
        <Waypoint
          onEnter={({ previousPosition, currentPosition, event }) => {
            this.props.bottomOfStackReached();
          }}
        />
      </div>
    );
  }
}

// this whole notion of the currently displayed thing, is flawed. There are multiple things in the stack. we can't use that stuff to render with.
const mapStateToProps = createStructuredSelector({
  foundRoute: selectFoundRoute(),
  currentlyDisplayedItemIndex: selectCurrentlyDisplayedItemIndex(),
  currentlyDisplayedItemIndexWaypointInitiated: selectCurrentlyDisplayedItemIndexWaypointInitiated(),
  postStack: selectPostStack(),
  currentlyDisplayedItem: selectCurrentlyDisplayedItem(),
  currentlyDisplayedItemPostTitle: selectCurrentlyDisplayedItemPostTitle(),
  currentlyDisplayedItemExcerpt: selectCurrentlyDisplayedItemExcerpt(),
  currentlyDisplayedItemFeaturedImage: selectCurrentlyDisplayedItemFeaturedImage(),
  currentlyDisplayedItemFeaturedImageSrc: selectCurrentlyDisplayedItemFeaturedImageSrc(),
  currentlyDisplayedItemPermalink: selectCurrentlyDisplayedItemPermalink(),
  currentlyDisplayedItemID: selectCurrentlyDisplayedItemPostID(),
  forceRender: selectForceRender(),
  loading: selectLoading(),
  error: selectError(),
  autoScrollingToPost: selectAutoScrollingToPost(),
  arrivedForFirstTime: selectArrivedForFirstTime(),
  waypointsInViewport: selectWaypointsInViewport(),
});
SinglePostPage.defaultProps = {
  currentlyDisplayedItemIndex: 0,
  foundRoute: null,
  postStack: [],
  currentlyDisplayedItem: 0,
  currentlyDisplayedItemPostTitle: '',
  currentlyDisplayedItemExcerpt: '',
  currentlyDisplayedItemFeaturedImage: '',
  currentlyDisplayedItemFeaturedImageSrc: '',
  currentlyDisplayedItemPermalink: '',
  forceRender: false,
  loading: false,
  error: false,
  autoScrollingToPost: false,
  arrivedForFirstTime: false,
  waypointsInViewport: [],
}
// // but the saga is listening to the loadCategorizedPostData action, not the LOCATION_CHANGE .... is that right?
function mapDispatchToProps(dispatch, ownProps) {
  return {
    changeRoute: (url) => dispatch(push(url)),
    setScrollTop: (scrollTop) => {
      // dispatch(setScrollTop(scrollTop));
    },
    addWaypointToViewport: (waypointIndex, waypointsInViewport, currentlyDisplayedItemIndex, loading) => {
      // so ... two steps to adding and removing waypoints from the viewport:
      // we do the adding, and then we need a seperate action to trigger the saga side effect, that will figure out and update the active index
      // where will the determination of the new currentIndex happen? dispatch addWaypointToViewport,
      // then dispatch determinCurrentIndex (saga) then saga does logic,
      // determines it, and dispatches another action, which is then picked up by a reducer,
      // setting currentItemIndex, and then selector gets currentItemIndex into props,
      // which when changed will trigger the rerender. wow. a bit convoluted.
      // or ... instead, we could use react lifecycle methods.
      // also, we do have ownProps, which could have waypointsInViewport as props. but we don't add directly!
      //

      // we can de the determination of the new currentIndex right here. And dispatch a new action, that contains 2 params: the currentItemIndex, and the current array of waypointsInViewport.
      // that way the saga gets it, in 1 step, and we can trigger nav right from there if need be.
      // waypointsInViewport does not exist yet! :) !

      const someIndex = waypointsInViewport.indexOf(waypointIndex);

      if (someIndex === -1) {
        // adding a waypoint to the viewport probably means that there will end up being a new currentItemIndex, but not neccesarily so
        // if there are 2, take the bottom one. if there are 3 or more, take the middle one, or second from the bottom.
        // do a comparison, and take the farthest down and use that as the current one. then dispatch an action that includes the new current one.
        // but only if its different from the current one.
        const farthestDownIndex = Math.max(...waypointsInViewport, waypointIndex);
          // but this will always be true, because someIndex === -1, which means that we are
          // dispatch(addWaypointToViewport(farthestDownIndex, true));// second parameter indicates whether or not it is to be the new currentItemIndex
          // we can't dispatch two actions, even though we would like to. the first to add it to the viewport, and the second to designate. wait ... no. we don't want to have to renders when props change!
          // it's essential that this happen in one fell swoop
          dispatch(setCurrentPostStackDisplayData(farthestDownIndex, [...waypointsInViewport, waypointIndex]));// current, inViewportWaypoints,


      } else {
      //   // do nothing. its already in there and being factored.
        // // console.log(` doing nothing? ... maybe if we are at the bottom of the stack, and not currently loading anything, we should make the call anyways.`);
        if (!loading && waypointIndex >= waypointsInViewport.length -1) {
          //// console.log(`!loading && waypointIndex >= waypointsInViewport -1 !!!!!!`);
          // well yes, yes we should.
        }

      }

    },
    removeWaypointFromViewport: (waypointIndex, waypointsInViewport, currentlyDisplayedItemIndex) => {
      console.log(`this.props.removeWaypointFromViewport(${waypointIndex}, --- [${waypointsInViewport}] ---, ${currentlyDisplayedItemIndex})`);
      // but when we remove one, how are we to know what the new current is?
      // it makes sense to decouple the designation of the current Item index, from the determination of the current item index.
      let remainingDisplayedItemIndexes = clone(waypointsInViewport);
      const indexOfWaypointToBeRemoved = remainingDisplayedItemIndexes.indexOf(waypointIndex);
      //// console.log(`indexOfWaypointToBeRemoved==${indexOfWaypointToBeRemoved}`);
      if (indexOfWaypointToBeRemoved !== -1) {
        // remainingDisplayedItemIndexes = remainingDisplayedItemIndexes.splice(indexOfWaypointToBeRemoved, 1);// returns the thing that got snipped out!!!
        remainingDisplayedItemIndexes.splice(indexOfWaypointToBeRemoved, 1);
        //// console.log(`remainingDisplayedItemIndexes==${remainingDisplayedItemIndexes}`);
        const farthestDownRemainingWaypointIndex = Math.max(...remainingDisplayedItemIndexes);
        //// console.log(`farthestDownRemainingWaypointIndex==${farthestDownRemainingWaypointIndex}`);
        // dispatch(removeWaypointFromViewport(waypointIndex, farthestDownRemainingWaypointIndex));
        dispatch(setCurrentPostStackDisplayData(farthestDownRemainingWaypointIndex, remainingDisplayedItemIndexes));// current, inViewportWaypoints,
      }

    },
    bottomOfStackReached: () => {
      //// console.log(`this.props.bottomOfStackReached()`);
      dispatch(bottomOfStackReached());
    },
    dispelForceRender: () => {
      //// console.log(`this.props.dispelForceRender()`);
      dispatch(setForceRender(false));
    },
    goBackToTop: () => {
      //// console.log('goBackToTop()');
      return dispatch(setCurrentlyDisplayedItemIndex(0, true));
    },
    startScrollingToPost: (trueOrFalse) => {
      //// console.log('startScrollingToPost');
      dispatch(autoScrollingToPost(trueOrFalse));
    },
    arrivingForFirstTime: () => {
      //// console.log('arrivingForFirstTime()');
      dispatch(arrivingForFirstTime());
    },
    setHeadData: () => {
      //// console.log('setHeadData');
    },
    dispatch,
  };
}

const withConnect = connect(mapStateToProps, mapDispatchToProps);
const withReducer = injectReducer({ key: 'singlePostPage', reducer });
const withSaga = injectSaga({ key: 'singlePostPage', saga, mode: RESTART_ON_REMOUNT });


export default {
  component: compose(
    withReducer,
    withSaga,
    withConnect,
  )(SinglePostPage),
};
