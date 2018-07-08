/*
 *
 * ArchivePage
 *
 * The Archive Page is almost identical to the SinglePostPage
 * It is a stack, but instead of full posts, it loads only partial posts.
 * Also, the address does not change, it is always just 1 consistant address
 * so ... how do we know which new items to load in? do we load 1 at a time? or load batches?
 * how about batches of n, we'll do 1, 2, 3 automatic loads, and then load more will start pagination at page 4 ... or something like that
 *
 * we need to also be concerned about when it is safe to re-render the archive stack, after a fresh load. If ads have aleady fired, we can't re-render them
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


import { Link } from 'react-router-dom';

import { media } from 'style-utils';

import { Grid, Row, Col, Image, Clearfix } from 'react-bootstrap';
import Waypoint from 'react-waypoint';


import {
  setCurrentChunkStackDisplayData,
  setForceRender,
  bottomOfStackReached,

} from './actions';

import styled from 'styled-components';
import InterstitialWrapper from 'components/styled/InterstitialWrapper';

import NotFoundPage from 'containers/NotFoundPage';
import SMEB from 'containers/DynamicRegions/SimpleMagicEditButton';
import { REGULAR_CHUNKSIZE, FEATURED_CHUNKSIZE } from './constants';
import {
  makeSelectGeneralWaypointSleepTimeout,
} from 'containers/App/selectors';
import {
  selectLoading,
  selectTermData,
  selectArchiveStack,
  selectWaypointsInViewport,
  selectCurrentlyDisplayedChunkIndex,
  selectCurrentlyDisplayedArchiveTitle,
  selectFoundRoute,
  selectInitialPageNumber,
  selectForceRender,
  selectBigBoxAOne,
  selectBigBoxATwo,
  selectBigBoxBOne,
  selectBigBoxBTwo,
  selectSponsoredContentAOne,
  selectSponsoredContentATwo,
  selectSponsoredContentBOne,
  selectSponsoredContentBTwo,
  selectWallpaper,
} from './selectors';

import he from 'he';

import AffixedSidebar from 'containers/AffixedSidebar';
import Tower from 'components/Tower';

// import ShrinkBoxVideo from 'components/ShrinkBoxVideo';


// import SponsoredItem from 'components/SponsoredItem';
import LeaderboardHolder from 'containers/LeaderboardHolder';
// import SmallSponsoredContentHolder from 'containers/SmallSponsoredContentHolder';
import SmallSponsoredContent from 'components/SmallSponsoredContent';

import { PostTeaser, PostTeaserH3, PostTeaserH3Center, RedTagSmOnTop } from 'components/styled/Common';

// import zmShorten from 'utils/zmShorten';
import zmStrip from 'utils/zmStrip';
import CatBg from './images/categorybg.jpg';
import { clone, throttle, chunk } from 'lodash';
import { msg } from 'utils/msg';

export class ArchivePage extends React.Component {// eslint-disable-line react/prefer-stateless-function
  constructor() {
    super();
    // this.addWaypointToViewport.bind(this);
    // this.removeWaypointFromViewport.bind(this);
    this.chunkWaypointEnter.bind(this);
    this.chunkWaypointLeave.bind(this);
  }

  // static contextTypes = {
  //   router: PropTypes.object,
  // };

  // this.props.children is a prop. so if children change, it can cause a rerender!

  shouldComponentUpdate(nextProps) {

    if (nextProps.forceRender) {
      return true;
    }
    console.log(`ArchivePAge.shouldComponentUpdate(),`, `this.props.location.pathname !== nextProps.location.pathname`);
    if (this.props.location.pathname !== nextProps.location.pathname) {
      // console.log(`this.props.location.pathname !== nextProps.location.pathname`);
      return true;
    }
    if (this.props.termData === null && nextProps.termData !== null) {
      return true;
    }
    if (this.props.bigBoxAOne !== nextProps.bigBoxAOne) {
      return true;// in case ads come in seperately; they are captured by App reducer ... ?!
    }
    // if (!isEqual(nextProps.archiveStack, this.props.archiveStack)) {
    //   return true;
    //   // ok ... this is crude, and with the ads in play, disfunctional.
    //   // so, what is the solution? only re-render when it is safe. How do we know when it is safe?
    //   // when a timer tells us that it is so, or, when we get to the bottom, and the bottomOfTheStack waypoing triggers a ForceRender action, and we do it unsafely, because we now have to.
    //   // also, we need to consider the initial page, that a user first encounters the page with, because it might be other than 1(not displayed) ... and if it is, we need to store the initial value in state, and use it as an offset for the waypoint indexes, in order to get the pagination urls right.
    // }
    return false;
  }

  componentWillMount() {

  }

  componentDidMount() {

  }


  componentWillUpdate() {

  }


  componentDidUpdate(prevProps, prevState) {
    if (this.props.forceRender && !this.props.loading) {// waiting for this.props.loading to be false, means that we can force a render when we get the last thing
      this.props.dispelForceRender();
    }
  }

  /**
   * Changes the route
   *
   * @param  {string} route The route we want to go to
   */
  openRoute = (route) => {
    this.props.changeRoute(route);
  };

  chunkWaypointEnter(index) {
    msg('chunkWaypointEnter('+index+')');
    // throttle(() => this.props.addWaypointToViewport(index, this.props.waypointsInViewport, this.props.currentlyDisplayedChunkIndex, this.props.loading), 250);
    this.props.addWaypointToViewport(index, this.props.waypointsInViewport, this.props.currentlyDisplayedChunkIndex, this.props.loading);
  }
  chunkWaypointLeave(index) {
    msg('********   chunkWaypointLeave('+index+')');
    // throttle(() => this.props.removeWaypointFromViewport(index, this.props.waypointsInViewport, this.props.currentlyDisplayedChunkIndex), 250);
    this.props.removeWaypointFromViewport(index, this.props.waypointsInViewport, this.props.currentlyDisplayedChunkIndex);
  }

  render() {
    msg('ArchivePage.render()');
    if (this.props.foundRoute === false) {
      return (<NotFoundPage />);
    }
    /*
    we can't render the stack, as it is, if there isn't data yet!
    that results in problems, like leaderboards that aren't supposed to be seen yet, rendering and setting bad data.

    */

    if (this.props.termData === null) {// this will be null, if things get zero'd
      return null;
      // TODO @nicole make a loading thing to go in here, instead of null.
    }
    // const urlPathArray = this.props.location.pathname.split('/');
    // if (urlPathArray[urlPathArray.length-1] !== this.props.termData.slug) {
    //   return null;
    // }

    let pageTitle = "Everything Zoomer";
    if (this.props.currentlyDisplayedItemPostTitle !== null) {
      if (this.props.currentlyDisplayedArchiveTitle !== null) {
         pageTitle = he.decode(this.props.currentlyDisplayedArchiveTitle);
      } else {

      }
    }
    const ogTitle = zmStrip(pageTitle);

    // const ogDesc = zmShorten(metaDescription);// where will this come from?
    const ogDesc = ogTitle; // dumb hack, just use ogTitle for Description.
    const getOgUrl = (path) => {
      const baseURL = 'http://www.everythingzoomer.com';
      let pathName = path;
      return (baseURL + pathName);
    }
    let ogURL = getOgUrl(this.props.location.pathname);
    if (typeof window !== 'undefined') ogURL = location.href;
    // const ogURL = getOgUrl(this.props.location.href);

    // let mainContent = null;
    // // console.log('Alohaa!');
    let categoryBGImage = CatBg;
    let theTermName = '';
    let theTermDesc = '';
    let bannerThumb ='';
    let ogThumb ='';

    if (this.props.termData !== null && typeof this.props.termData.ogImage !== 'undefined' && this.props.termData.ogImage !== null) {
       ogThumb = this.props.termData.ogImage.sizes.facebookog;
    }

    if (this.props.termData !== null && typeof this.props.termData.slug !== 'undefined' && this.props.termData.slug !== null) {
      theTermName = this.props.termData.slug;
    }
    if (this.props.termData !== null && typeof this.props.termData.description !== 'undefined' && this.props.termData.description !== null) {
      theTermDesc = this.props.termData.description;
    }

    // console.log(theTermDesc);

    if (this.props.termData !== null && typeof this.props.termData.bannerImage !== 'undefined' && this.props.termData.bannerImage !== null) {
      categoryBGImage = this.props.termData.bannerImage.url;
    } else if (this.props.termData !== null && typeof this.props.termData.parent_category_banner !== 'undefined' && this.props.termData.parent_category_banner !== null) {
      categoryBGImage = this.props.termData.parent_category_banner;
    }

    let wallpaper = null;
    if (this.props.wallpaper !== null) {
      wallpaper = this.props.wallpaper.id;
    }

    let chunkMarg = null;
    if (wallpaper !== null) {
      chunkMarg = '';
    } else {
      chunkMarg = 'chunkMargBottom';
    }


    const MargedDiv = styled.div`
      margin: 125px 0 0 0;
      ${media.extrasmall`
        margin: 0 0 125px 0;
      `}
    `;

    const WhiteCol = styled(Col)`
      background: #fff;
      padding: 50px;
      ${media.extrasmall`
        background: none;
        padding: 0;
      `}
    `;

    const WhiteColTitle = styled(Col)`
      background: #fff;
      padding: 5px 0 25px 0;
      ${media.extrasmall`
        background: none;
        padding: 0;
      `}
    `;

    const CategoryBg = styled.div`
      background: url(${categoryBGImage}) center bottom;
      background-size: cover;
      ${'' /* height: 200px; */}

      ${media.small`
        background: url(${categoryBGImage});
      `}

      ${media.medium`
        background: url(${categoryBGImage});
      `}

      ${media.large`
        background: url(${categoryBGImage});
      `}

      h1 {
        color: #fff;
        text-align: center;
        font-family: 'Cormorant Infant', serif;
        font-weight: bold;
        font-size: 6.5em;
        letter-spacing: -1px;
        line-height: normal;
        padding: 20px 0;
      }
    `;
    //

    const SubNavRow = styled(Row)`
      ${'' /* background: #EEF0F2; */}
      ${'' /* background: #fff; */}
      ${'' /* border-bottom: 1px solid #ababab; */}
      display: none;

      ul {
        ${'' /* display: flex;
        flex-direction: row;
        flex-wrap: wrap;
        width: 100%;
        padding-left: 0;
        margin: 0; */}
      }
      li {
        ${'' /* list-style: none;
        display: inline-block;
        width: calc(100% / 5);
        text-align: center; */}
      }
      a {
        display: block;
        text-align: center;
        padding: 14px;
        font-family: 'Roboto Condensed';
        color: #000;
        font-size: 13pt;
        ${'' /* text-transform: uppercase; */}
        transition: 0.2s all;
      }
      a:hover {
        text-decoration: none;
        background: #ababab;
        color: #fff;
      }
      ${media.medium`
        display:block;
      `}
      ${media.small`
        border-bottom: 2px solid #eaeaea;
        li {
          width: calc(100% / 2);
          border: 1px solid #eaeaea;
        }
        a:hover {
          text-decoration: none;
          background: #fff;;
          color: #000;
        }
      `}
    `;

    const WhiteColInset = styled(Col)`
      background: #fff;
      border-bottom: 1px solid #ababab;
    `;

// Full Width Post STyles

    const FullLink = styled(Link)`
      float: left;
      width: 100%;
    `;

    const HeroImg = styled(Image)`
      float: left;
      width: 100% !important;
    `;

    const RedTagLgLink = styled(Link)`
    color: #d02d2f;
    font-family: 'Roboto Condensed', sans-serif;
    text-transform: uppercase;
    text-align: center;
    font-size: 1.1em;
    position: relative;
    margin-bottom: 0 !important;
    top: 10px;
    display: block;
    padding-top: 8px;
    font-weight: bold;
    &:hover {
      cursor: pointer;
      color: #d02d2f;
      text-decoration: none;
    }
    `;

    const HeadingLgLink = styled(Link)`
      &:hover {
        text-decoration: none;
        color: #000;
        cursor: pointer;
      }
      >h2 {
        text-align: center;
        color: #000;
        font-size: 2.4em;
        margin: 8px 0 23px 0;
        ${media.medium`
          font-size: 2.5em;
        `}
        ${media.extrasmall`
          font-size: 24px;
          padding-bottom: 14px;
        `}
      }
    `;

    // Full Width Post STyles End
    let mainContent = null;
    let archiveHeaderChunk = null;
    let featuredItemsChunk = null;
    let chunkStack = null;

    if (this.props.termData !== null) {
      const termTitle = he.decode(this.props.termData.name);
      // const termTitle = this.props.termData.name;
      const termSlug = this.props.termData.slug;
      const termType = he.decode(this.props.termData.taxonomy);
      // const termType = this.props.termData.taxonomy;

      const healthSubCats = [
        {'Longevity' : '/health/longevity'},
        {'Diet &amp; Nutrition' : '/health/nutrition'},
        {'Zoomer Fitness' : '/health/fitness'},
        {'Zoomer Yoga' : '/health/zoomer-yoga'}
      ]

      const styleSubCats = [
        {'Fashion' : '/style/fashion'},
        {'Beauty' : '/style/beauty'},
        {'Home &amp; Garden' : '/style/home-garden'},
        {'Shopping' : '/style/shopping'}
      ]

      const foodSubCats = [
        {'Recipes' : '/food/recipes'},
        {'Libations' : '/food/libations'},
        {'Celeb Chefs' : '/food/celeb-chefs'},
        {'Entertaining' : '/food/entertaining'}
      ]

      const travelSubCats = [
        {'Travel Club' : '/travelclub'},
        {'Savvy Tips' : '/travel/savvy-tips'},
        {'Destinations' : '/travel/destinations'},
        {'Best of Canada' : '/travel/best-of-canada'},
        {'Bucket List' : '/travel/bucket-list'}
      ]

      const moneySubCats = [
        {'Personal Finance' : '/money/personal-finance'},
        {'Real Estate' : '/tag/real-estate'},
        {'Work &amp; Retirement' : '/money/work-retirement'},
        {'Budget' : '/money/budget'},
        {'Investing' : '/money/investing'}
      ]

      let allSubCats = [];
      allSubCats['health'] = healthSubCats;
      allSubCats['style'] = styleSubCats;
      allSubCats['food'] = foodSubCats;
      allSubCats['travel'] = travelSubCats;
      allSubCats['money'] = moneySubCats;

      let someSubCats = [];
      if ( Object.keys(allSubCats).indexOf(termSlug) !== -1) {
        someSubCats = allSubCats[termSlug];
      }
      let subNavList = [];
      let subNavItem = null;
      let innerLi = null;

      someSubCats.forEach(function(obj, i){
        for (const key in obj){
          subNavItem = (<li key={`subcat_subnav_${i}`} className="flexItem"><Link to={obj[key]}>{he.decode(key)}</Link></li>);
          subNavList.push(subNavItem);
        }
        return subNavList;
      });

      const ArchiveTitleWrapper = styled.div`
        text-align: center;
        display: block;
        position: relative;
        margin: 0 auto;
      `;
      const ArchiveH1 = styled.h1`
        display: inline-block;
      `;
      const FloatingSMEBWrapper = styled.div`
        width: 80px;
        margin-right: -80px;
        display: inline-block;
        position: relative;
        vertical-align: 180%;
        padding-bottom:2em;

      `;

      archiveHeaderChunk = (
        <div>
        <CategoryBg>
          <Grid fluid>
            <Row>
              <Col md={12}>
                <ArchiveTitleWrapper><ArchiveH1 className="termTitle">{termTitle}</ArchiveH1><FloatingSMEBWrapper><SMEB term_id={this.props.termData.term_id} typeOfThing={this.props.termData.taxonomy} /></FloatingSMEBWrapper></ArchiveTitleWrapper>
              </Col>
            </Row>
          </Grid>
        </CategoryBg>
        {/* from here */}
        <SubNavRow>
          <Grid>
            <Row>
              <WhiteColInset md={12}>
                <ul className="flexContainer spaceEvenly">
                  {subNavList}
                </ul>
              </WhiteColInset>
            </Row>
          </Grid>
        </SubNavRow>
        </div>
      );

      const otherItems = this.props.archiveStack.slice(0);
      let otherItemChunks = chunk(otherItems, REGULAR_CHUNKSIZE);

      // // console.log('otherItemChunks==');
      // // console.log(otherItemChunks)
      // the saga has to be aware of that ... and will need to detect the initial state of things prior to that initial load.
      // a function to render a chunk
      // and a function to render the interstitial stuff
      // then we loop through otherItemChunks, render a chunk + interstitial, etc.

      const getChunkStackInterstitial = (i) => {
        const leaderboardIndex = i+1;
        return (
          <InterstitialWrapper>
            <Row>
              <Col>
                {/* <LeaderboardHolder ref={`interstitial_leaderboard_${i}`} index={leaderboardIndex} key={`interstitial_leaderboard_${i}`} /> */}
              </Col>
            </Row>
          </InterstitialWrapper>
        );
      }

      let tagEcho = '';
      let theTag = true;
      let postThumb = null;
      let heroThumb = null;

      if (termType == 'post_tag') {
        theTag = false;
      }
      // msg('getChunkOfItems');
      const getChunkOfItems = (chunk, chunkNum, active) => {
        const even = chunkNum % 2 === 0;
        let itemsStack = [];
        let resultBatchCount = 0;
        let leaderboardIndex = chunkNum + 1;
        // leaderboardIndex ???

        let heroCount = 0;
        chunk.forEach((item, i) => {
          if (item !== null && item.hero) {
            heroCount++;
          }
        });
        // // console.log(`outside forEach heroCount==${heroCount}`);
        // let j = 0;
        // // console.log('start chunk forEach');

          chunk.forEach((item, i) => {
            // // console.log(`inside forEach heroCount==${heroCount}`);
            if (item === null) {
              return null;
            }

            // if (item.hero && item.hero_image_crop_large && item.hero_image_crop_large.src !== null) {
            // heroThumb = item.hero_image_crop_large.src;
            //   } else if (item.hero && item.hero_image_large && item.hero_image_large.src !== null) {
            // heroThumb = item.hero_image_large.src;
            // }


            if (item && item.post_thumb) {
               postThumb = item.post_thumb;
            }

            if (theTag == true) {
              tagEcho = (
                <RedTagSmOnTop to={typeof item.featuredTags !== 'undefined' && item.featuredTags.length > 0 ? item.featuredTags[0].permalink : ``}>{typeof item.featuredTags !== 'undefined' && item.featuredTags.length > 0 ? he.decode(item.featuredTags[0].name) : ``}</RedTagSmOnTop>
              );
            }

            if (item.hero === false) {
              resultBatchCount++;
            }


            let heroZero = null;



            // if (item.hero && typeof item.hero_image_crop_large !== 'undefined' && item.hero_image_crop_large.src !== null) {
            //   heroZero = item.hero_image_crop_large.src;
            // } else if (item.hero && item.hero_image_large && typeof item.hero_image_large !== 'undefined' && item.hero_image_large.src !== null) {
            //   heroZero = item.hero_image_large.src;
            // }

            if (item.hero && typeof item.hero_image_crop_large !== 'undefined' && typeof item.hero_image_crop_large.src === 'string' && item.hero_image_crop_large.src !== '') {
              heroZero = item.hero_image_crop_large.src;
            } else if (item.hero && typeof item.hero_image_large !== 'undefined' && typeof item.hero_image_large.src === 'string' && item.hero_image_large.src !== '') {
              heroZero = item.hero_image_large.src;
            }

            if (heroCount === 2) {

              if (i === 0) {

                itemsStack.push(
                  <Col md={12} key={`inset_${chunkNum}_${i}`} className={`hero${i}`}>
                    {/* {i} */}
                    {/* {item.hero_image_crop_large.src} */}
                    {/* {resultBatchCount} */}
                    <PostTeaser>
                      <Link to={item.permalink} className="full">
                        {/* <Image src={postThumb} className="full" /> */}
                        {/* <Image src={item.post_thumb !== null ? item.post_thumb : '' } className="full" /> */}
                        <div dangerouslySetInnerHTML={{ __html: item.contest_closed !== null && item.contest_closed !== false ? '<span class="closedArchiveWord">CLOSED</span>' : ''}} />

                        <Image src={heroZero} className="full" />
                      </Link>
                      <Link to={item.permalink}>
                        <PostTeaserH3Center>{item.post_title !== null && typeof item.post_title === 'string' ? he.decode(item.post_title) : null}</PostTeaserH3Center>
                      </Link>
                      {/* {tagEcho} */}
                    </PostTeaser>
                  </Col>
                );
              }

              if (resultBatchCount === 3 || resultBatchCount === 7) {
                // itemsStack.push(<BigBox key={`bigbox_${chunkNum}_${j}`} />);
                // itemsStack.push(<AffixedSidebar active={active} index={i} fixed key={`bigbox_${chunkNum}_${i}`}/>);
                itemsStack.push(<Tower active={active} index={i} adObj={even ? this.props.bigBoxAOne : this.props.bigBoxBOne} fixed key={`bigbox_${chunkNum}_${i}`}/>);
                itemsStack.push(<Clearfix visibleMdBlock visibleLgBlock key={`clear_${chunkNum}_${i}`}/>);
              }

              if (i === 5 ) {
                // itemsStack.push(<Col md={4} sm={6} key={`sponsored_${chunkNum}_${i}`} className={`iIs${i}`}><SmallSponsoredContentHolder free index={chunkNum} /></Col>);
                itemsStack.push(<Col md={4} sm={6} key={`sponsored_${chunkNum}_${i}`} className={`iIs${i}`}><SmallSponsoredContent active={active} adObj={even ? this.props.sponsoredContentAOne : this.props.sponsoredContentBOne} free index={chunkNum} /></Col>);

                //
                itemsStack.push(<Clearfix visibleMdBlock visibleLgBlock key={`clear_${chunkNum}_${i}`} />);
                itemsStack.push(<LeaderboardHolder index={leaderboardIndex} key={`leader_${chunkNum}_${i}`} />);
                itemsStack.push(<Clearfix visibleMdBlock visibleLgBlock key={`clear_${chunkNum}_${i}_chunkend`} />);

                itemsStack.push(

                  <div key={`full_${chunkNum}_${i}`} className={`hero${i}`}>
                    {/* <Grid fluid> */}
                      <Row>

                        <FullLink to={item.permalink}>
                          <div dangerouslySetInnerHTML={{ __html: item.contest_closed !== null && item.contest_closed !== false ? '<span class="closedArchiveWord">CLOSED</span>' : ''}} />
                          {/* <HeroImg {...item.post_thumb[0]} /> */}
                          <HeroImg src={item.hero && item.hero_image_huge && item.hero_image_huge.src !== null ? item.hero_image_huge.src : ''} />
                        </FullLink>
                      </Row>
                    {/* </Grid> */}
                    <Grid>
                      <Row>
                        <WhiteColTitle md={12}>
                          <Link to={item.permalink}>
                            <PostTeaserH3Center>
                            {item.post_title !== null && typeof item.post_title === 'string' ? he.decode(item.post_title) : null}</PostTeaserH3Center>
                          </Link>
                        </WhiteColTitle>
                      </Row>
                    </Grid>
                  </div>

                );
              }


              if (i !== 0) {
                itemsStack.push(
                  <Col md={4} sm={6} key={`reg_${chunkNum}_${i}`} className={`iIs${i}`}>
                    {/* {i} */}
                    {/* {resultBatchCount} */}
                    <PostTeaser>
                      <Link to={item.permalink} className="full">
                        {/* <Image src={postThumb} className="full" /> */}
                        <div dangerouslySetInnerHTML={{ __html: item.contest_closed !== null && item.contest_closed !== false ? '<span class="closedArchiveWord">CLOSED</span>' : ''}} />
                        <Image src={item.post_thumb !== null ? item.post_thumb : '' } className="full" />
                      </Link>
                      {tagEcho}
                      <Link to={item.permalink}>
                        <PostTeaserH3>{item.post_title !== null && typeof item.post_title === 'string' ? he.decode(item.post_title) : null}</PostTeaserH3>
                      </Link>

                    </PostTeaser>
                  </Col>
                );
              }

              if (resultBatchCount === 8 ) {
                // itemsStack.push(<Col md={4} sm={6} key={`sponsored_${chunkNum}_${i}`} className={`iIs${i}`}><SmallSponsoredContentHolder second free index={chunkNum} /></Col>);
                itemsStack.push(<Col md={4} sm={6} key={`sponsored_${chunkNum}_${i}`} className={`iIs${i}`}><SmallSponsoredContent active={active} adObj={even ? this.props.sponsoredContentATwo : this.props.sponsoredContentBTwo} free index={chunkNum} /></Col>);

                itemsStack.push(<Clearfix visibleMdBlock visibleLgBlock key={`clear_${chunkNum}_${i}`} />);
              }
            // end if hero count === 2
            } else if (heroCount === 1) {

              if (i === 0) {
              itemsStack.push(
                <Col md={12} key={`inset_${chunkNum}_${i}`} className={`hero${i}`}>

                  <PostTeaser>
                    <Link to={item.permalink} className="full">
                      {/* <Image src={postThumb} className="full" /> */}
                      {/* <Image src={item.post_thumb !== null ? item.post_thumb : '' } className="full" /> */}
                      <div dangerouslySetInnerHTML={{ __html: item.contest_closed !== null && item.contest_closed !== false ? '<span class="closedArchiveWord">CLOSED</span>' : ''}} />
                      <Image src={item.hero && item.hero_image_large && item.hero_image_large.src !== null ? item.hero_image_large.src : ''} className="full" />
                    </Link>
                    <Link to={item.permalink}>
                      <PostTeaserH3Center>{item.post_title !== null && typeof item.post_title === 'string' ? he.decode(item.post_title) : null}</PostTeaserH3Center>
                    </Link>
                    {/* {tagEcho} */}
                  </PostTeaser>
                </Col>
              );
            }

            if (i !== 0) {
              itemsStack.push(
                <Col md={4} sm={6} key={`reg_${chunkNum}_${i}`} className={`iIs${i}`}>
                  {/* {heroCount} */}
                  {/* {i} */}
                  {/* {resultBatchCount} */}
                  <PostTeaser>
                    <Link to={item.permalink} className="full">
                      {/* <Image src={postThumb} className="full" /> */}
                      <div dangerouslySetInnerHTML={{ __html: item.contest_closed !== null && item.contest_closed !== false ? '<span class="closedArchiveWord">CLOSED</span>' : ''}} />
                      <Image src={item.post_thumb !== null ? item.post_thumb : '' } className="full" />
                    </Link>
                    {tagEcho}
                    <Link to={item.permalink}>
                      <PostTeaserH3>{item.post_title !== null && typeof item.post_title === 'string' ? he.decode(item.post_title) : null}</PostTeaserH3>
                    </Link>

                  </PostTeaser>
                </Col>
              );
            }

            if ( i === 2 ) {
              // itemsStack.push(<BigBox key={`bigBox_${chunkNum}_${j}`} />);
              // itemsStack.push(<AffixedSidebar  active={active} index={i} fixed key={`bigbox_${chunkNum}_${i}`}/>);
              // let bigBoxID;

              itemsStack.push(<Tower active={active} index={i} adObj={even ? this.props.bigBoxAOne : this.props.bigBoxBOne} fixed key={`bigbox_${chunkNum}_${i}`}/>);

              // itemsStack.push(<Clearfix visibleMdBlock visibleLgBlock key={`clear_${chunkNum}_${i}`} />);
            }

            if ( i === 4 ) {
              // itemsStack.push(<Col md={4} sm={6} key={`sponsored_${chunkNum}_${i}`} className={`iIs${i}`}><SmallSponsoredContentHolder free index={chunkNum} /></Col>);
              itemsStack.push(<Col md={4} sm={6} key={`sponsored_${chunkNum}_${i}`} className={`iIs${i}`}><SmallSponsoredContent active={active} adObj={even ? this.props.sponsoredContentAOne : this.props.sponsoredContentBOne} free index={chunkNum} /></Col>);

              itemsStack.push(<Clearfix visibleSmBlock visibleMdBlock visibleLgBlock key={`clear_${chunkNum}_${i}`} />);
            }

            if ( i === 8 ) {
              itemsStack.push(<Clearfix visibleMdBlock visibleLgBlock key={`clear_${chunkNum}_${i}`} />);
              // itemsStack.push(<Col md={4} sm={6} key={`sponsored_${chunkNum}_${i}`} className={`iIs${i}`}><SmallSponsoredContentHolder second free index={chunkNum} /></Col>);
              itemsStack.push(<Col md={4} sm={6} key={`sponsored_${chunkNum}_${i}`} className={`iIs${i}`}><SmallSponsoredContent active={active} adObj={even ? this.props.sponsoredContentATwo : this.props.sponsoredContentBTwo} free index={chunkNum} /></Col>);

            }

            if ( i === 9 ) {
              // itemsStack.push(<BigBox key={`bigBox_${chunkNum}_${j}`} />);
              // itemsStack.push(<AffixedSidebar active={active} index={i} fixed key={`bigbox_${chunkNum}_${i}`}/>);
              itemsStack.push(<Tower active={active} index={i} adObj={even ? this.props.bigBoxATwo : this.props.bigBoxBTwo} fixed key={`bigbox_${chunkNum}_${i}`}/>);
              itemsStack.push(<Clearfix visibleMdBlock visibleLgBlock key={`clear_${chunkNum}_${i}`} />);
              itemsStack.push(<LeaderboardHolder index={leaderboardIndex} key={`leader1_${chunkNum}_${i}`} />);
              itemsStack.push(<Clearfix visibleMdBlock visibleLgBlock key={`clear_${chunkNum}_${i}_chunkend`} />);
            }

            // console.log(itemsStack);

          } else {

            // j++;

            if ( i === 3 ) {
              // itemsStack.push(<BigBox key={`bigBox_${chunkNum}_${j}`} />);

              itemsStack.push(<Tower active={active} index={i} fixed adObj={even ? this.props.bigBoxAOne : this.props.bigBoxBOne} key={`bigbox_${chunkNum}_${i}`}/>);
              itemsStack.push(<Clearfix visibleMdBlock visibleLgBlock key={`clear_${chunkNum}_${i}`} />);
            }

            if ( i === 7 ) {
              itemsStack.push(<Clearfix visibleMdBlock visibleLgBlock key={`clear_${chunkNum}_${i}`} />);
            }

            // // console.log(itemsStack);

            itemsStack.push(
              <Col md={4} sm={6} key={`reg_${chunkNum}_${i}`} className={`iIs${i}`}>
                {/* {j} */}
                {/* {heroCount} */}
                {/* {i} */}
                {/* {resultBatchCount} */}
                <PostTeaser>
                  <Link to={item.permalink} className="full">
                    {/* <Image src={postThumb} className="full" /> */}
                    <div dangerouslySetInnerHTML={{ __html: item.contest_closed !== null && item.contest_closed !== false ? '<span class="closedArchiveWord">CLOSED</span>' : ''}} />
                    <Image src={item.post_thumb !== null ? item.post_thumb : '' } className="full" />
                  </Link>
                  {tagEcho}
                  <Link to={item.permalink}>
                    <PostTeaserH3>{item.post_title !== null && typeof item.post_title === 'string' ? he.decode(item.post_title) : null}</PostTeaserH3>
                  </Link>

                </PostTeaser>
              </Col>
            );

            if (i === 9) {
              itemsStack.push(<Clearfix visibleMdBlock visibleLgBlock key={`clear_${chunkNum}_${i}`} />);
              itemsStack.push(<LeaderboardHolder index={leaderboardIndex} key={`leader2_${chunkNum}_${i}`} />);
              itemsStack.push(<Clearfix visibleMdBlock visibleLgBlock key={`clear_${chunkNum}_${i}_chunkend`} />);
            }

          }


        });

        let FirstHalf = clone(itemsStack).splice(0,11);
        let Middle = clone(itemsStack).splice(11,1);
        let SecondHalf = clone(itemsStack).splice(13,7);


        if (heroCount === 2) {
          return (
            <div key={`chunk2_${chunkNum}`} className={chunkMarg}>
              <Grid>
                <Row>
                  <WhiteCol md={12}>
                    <Row>
                      <Col md={10} mdOffset={1}>
                        <Row className="padTopLg">
                          {FirstHalf}
                        </Row>
                      </Col>
                    </Row>
                  </WhiteCol>
                </Row>
              </Grid>
              <Row>
                {Middle}
              </Row>
               <Grid>
                <Row>
                  <WhiteCol md={12}>
                    <Row>
                      <Col md={10} mdOffset={1}>
                        <Row>
                          {SecondHalf}
                        </Row>
                      </Col>
                    </Row>
                  </WhiteCol>
                </Row>
              </Grid>
            </div>
          );
        } else if (heroCount === 1) {
          return (
            <Grid key={`chunk1_${chunkNum}`} className={chunkMarg}>
              <Row>
                <WhiteCol md={12}>
                  <Row>
                    <Col md={10} mdOffset={1}>
                      <Row>
                        {itemsStack}
                      </Row>
                    </Col>
                  </Row>
                </WhiteCol>
              </Row>
            </Grid>
          );
        } else if (heroCount === 0) {
          return (
            <Grid key={`chunk0_${chunkNum}`} className={chunkMarg}>
              <Row>
                <WhiteCol md={12}>
                  <Row>
                    <Col md={10} mdOffset={1}>
                      <Row>
                        {itemsStack}
                      </Row>
                    </Col>
                  </Row>
                </WhiteCol>
              </Row>
            </Grid>
          );
        } else  {
          return (
            <Grid key={`chunkelse_${chunkNum}`} className={chunkMarg}>
              <Row>
                <WhiteCol md={12}>
                  <Row>
                    <Col md={10} mdOffset={1}>
                      <Row>
                        {itemsStack}
                      </Row>
                    </Col>
                  </Row>
                </WhiteCol>
              </Row>
            </Grid>
          );
        }

      } // end getChunkOfItems()

      chunkStack = [];
      otherItemChunks.forEach((chunk, i) => {
        // chunkStack.push(getChunkStackInterstitial(i));
        const active = i === this.props.currentlyDisplayedChunkIndex;
        chunkStack.push(
          <Waypoint
            onEnter={({ previousPosition, currentPosition, event }) => {// object destructuring to get previousPosition,  currentPosition, event from single obj as if they were seperate params

              this.chunkWaypointEnter(i);
            }}
            onLeave={({previousPosition, currentPosition, event }) => {
              msg(`attempting to call this.chunkWaypointLeave(${i})`);
              this.chunkWaypointLeave(i);
            }}
            ref={`chunkWaypoint_${i}`}
            // topOffset="45%"
            // bottomOffset="45%"

            key={`chunkWaypoint_${i}`}
          >
            <div>
              {getChunkOfItems(chunk, i, active)}
            </div>
          </Waypoint>
        );
        // chunkStack.push(getChunkOfItems(chunk, i));
      });
    }


    return (
      <div>
        <Helmet
          title={pageTitle}
          meta={[
            { name: 'description', content: theTermDesc },
            { property: 'og:type', content: 'article' },
            { property: 'og:title', content: ogTitle },
            { property: 'og:description', content: theTermDesc },
            { property: 'og:url', content: ogURL },
            { property: 'og:image', content: ogThumb },
          ]}
        />
        {/* <HeaderMasthead version='mini'/> */}
        {archiveHeaderChunk}
        {chunkStack}
        <Waypoint
          onEnter={({ previousPosition, currentPosition, event }) => {
            this.props.bottomOfStackReached();
          }}
        />
      </div>
    );
  }
}
//
// ArchivePage.propTypes = {
//   changeRoute: PropTypes.func,
//   loading: PropTypes.bool,
//   error: PropTypes.oneOfType([
//     PropTypes.object,
//     PropTypes.bool,
//   ]),
//   autoScrollingToPost: PropTypes.oneOfType([
//     PropTypes.string,
//     PropTypes.bool,
//   ]),
//
// };
//
// // so ... things like currentlyDisplayedArchiveTitle don't change.
// // we render a stack of teasers. So we'll make an archive teaser component, that will hold a single teaser for an archive.
//
//

// class ArchivePage extends React.Component {// eslint-disable-line react/prefer-stateless-function
//   render () {
//     return (
//       <div>
//         This is supposed to be an Archive Page.
//       </div>
//     );
//   }
// }

const mapStateToProps = createStructuredSelector({
  // leaderboardIndex: selectLeaderboardIndex(),
  loading: selectLoading(),
  // error: makeSelectError(),
  // autoScrollingToPost: selectAutoScrollingToPost(),
  // storedScrollTop: selectStoredScrollTop(),
  foundRoute: selectFoundRoute(),
  termData: selectTermData(),
  archiveStack: selectArchiveStack(),

  currentlyDisplayedChunkIndex: selectCurrentlyDisplayedChunkIndex(),
  waypointsInViewport: selectWaypointsInViewport(),
  currentlyDisplayedArchiveTitle: selectCurrentlyDisplayedArchiveTitle(),
  generalWaypointSleepTimeout: makeSelectGeneralWaypointSleepTimeout(),
  initialPageNumber: selectInitialPageNumber(),
  forceRender: selectForceRender(),
  bigBoxAOne: selectBigBoxAOne(),
  bigBoxATwo: selectBigBoxATwo(),
  bigBoxBOne: selectBigBoxBOne(),
  bigBoxBTwo: selectBigBoxBTwo(),
  wallpaper: selectWallpaper(),
  sponsoredContentAOne: selectSponsoredContentAOne(),
  sponsoredContentATwo: selectSponsoredContentATwo(),
  sponsoredContentBOne: selectSponsoredContentBOne(),
  sponsoredContentBTwo: selectSponsoredContentBTwo(),
});
// // storedScrollTop
// // crikey - the whole notion of a currently displayed chunk index, was only alive in the saga - no representaion of that idea here in component!
// //
ArchivePage.defaultProps = {
  foundRoute: null,
  loading: false,
  termData: {},
  archiveStack: [],
  currentlyDisplayedChunkIndex: 0,
  waypointsInViewport: [],
  currentlyDisplayedArchiveTitle: '',
  generalWaypointSleepTimeout: false,
  initialPageNumber: 1,
  forceRender: false,
  bigBoxAOne: null,
  bigBoxATwo: null,
  bigBoxBOne: null,
  bigBoxBTwo: null,
  wallpaper: null,
  sponsoredContentAOne: null,
  sponsoredContentATwo: null,
  sponsoredContentBOne: null,
  sponsoredContentBTwo: null,
};
// // but the saga is listening to the loadCategorizedPostData action, not the LOCATION_CHANGE .... is that right?
function mapDispatchToProps(dispatch) {
  return {
    changeRoute: (url) => dispatch(push(url)),
    triggerCurrentlyDisplayedChunkIndex: (index) => {
      // console.log(`triggerCurrentlyDisplayedChunkIndex(${itemIndex})`);
      // do we really want to
      // so ... the thing is, that we don't want to go:
      // dispatch-->action-->reducer-->props-change/re-render
      // we want to instead go: dispatch-->saga-watcher-->addressChange-->(which item is current, helmet meta stuff)
      // we may want to have the waypoints always have a delay before they are able to dispatch things, that way we can have a re-render, without triggering a bunch of new waypoint entry-->dispatches
      // dispatch(setCurrentPostStackDisplayData(farthestDownIndex, [...waypointsInViewport, waypointIndex]));// current, inViewportWaypoints,
      // its not all the waypoints that would enter, just 1 or 2 (maybe 3 in rare circumstances)
      // we probably want to have a chunk waypoint detection safety timer. so that we don't dispatch during the first render!
      // they get a little break until we've had time to sort things out after the address change.

      msg(`triggerCurrentlyDisplayedChunkIndex(${index})`);
      // return dispatch(setCurrentlyDisplayedChunkIndex(itemIndex));
      return dispatch(setCurrentChunkStackDisplayData(index));

      // maybe having the safety timer will negate the need to have more sophisticated waypoint evaluation/determination logic?
      //

    },
    addWaypointToViewport: (waypointIndex, waypointsInViewport, currentlyDisplayedItemIndex, loading) => {
      const someIndex = waypointsInViewport.indexOf(waypointIndex);
      msg(`addWaypointToViewport(${waypointIndex}, [${waypointsInViewport}])`);
      if (someIndex === -1) {
        const farthestDownIndex = Math.max(...waypointsInViewport, waypointIndex);
        msg(`just about to dispatch(setCurrentChunkStackDisplayData(${farthestDownIndex}, [${[...waypointsInViewport, waypointIndex]}]))`);
        dispatch(setCurrentChunkStackDisplayData(farthestDownIndex, [...waypointsInViewport, waypointIndex]));// current, inViewportWaypoints,

      } else {
        if (!loading && waypointIndex >= waypointsInViewport.length -1) {

        }
      }
    },
    removeWaypointFromViewport: (waypointIndex, waypointsInViewport, currentlyDisplayedItemIndex) => {
      msg(`removeWaypointFromViewport(${waypointIndex}, [${waypointsInViewport}], ${currentlyDisplayedItemIndex})`)
      let remainingDisplayedItemIndexes = clone(waypointsInViewport);
      const indexOfWaypointToBeRemoved = remainingDisplayedItemIndexes.indexOf(waypointIndex);
      if (indexOfWaypointToBeRemoved !== -1) {
        remainingDisplayedItemIndexes.splice(indexOfWaypointToBeRemoved, 1);
        const farthestDownRemainingWaypointIndex = Math.max(...remainingDisplayedItemIndexes);// - Infinity if empty array!
        if (remainingDisplayedItemIndexes.length > 0) {
          dispatch(setCurrentChunkStackDisplayData(farthestDownRemainingWaypointIndex, remainingDisplayedItemIndexes));// current, inViewportWaypoints,
        } else {
          msg(`we are dispatching an action that might result in us navigating to -Infinity !!! but we have to, so that it will be noted that elvis(waypoint) has indeed left the building`);
          dispatch(setCurrentChunkStackDisplayData(null, remainingDisplayedItemIndexes));
        }

      }
    },
    bottomOfStackReached: () => {
      msg(`ArchivePage.props.bottomOfStackReached()`);
      dispatch(bottomOfStackReached());
    },
    dispelForceRender: () => {
      msg(`ArchivePage.props.dispelForceRender()`);
      dispatch(setForceRender(false));
    },

    dispatch,
  };
}



const withConnect = connect(mapStateToProps, mapDispatchToProps);
const withReducer = injectReducer({ key: 'archive', reducer });
const withSaga = injectSaga({ key: 'archive', saga, mode: RESTART_ON_REMOUNT });


export default {
  component: compose(
    withReducer,
    withSaga,
    withConnect,
  )(ArchivePage),
};
