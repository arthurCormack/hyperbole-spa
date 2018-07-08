/**
 * Post
 * A Single post. extracted into a seperate component, to make things tidier, and sane.
 *
 * This is the page we show when the user visits a url that doesn't have a route
 */

import React, { PropTypes } from 'react';
import ReactDOM from 'react-dom';

import { connect } from 'react-redux';

import { Row, Grid, Col, Image, Button } from 'react-bootstrap';
// import { createStructuredSelector } from 'reselect';
// import makeSelectDefaultPage from './selectors';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

import { media } from 'style-utils';
import he from 'he';

// import RelativeGrid from 'components/styled/RelativeGrid';
//
// import { AbsoluteRow, ArticleTitleCol, ArticleInfo, Separator } from 'components/styled/GridStyles';
import RelativeGrid from 'components/styled/RelativeGrid';
import { RedTagLgLink, MargedDiv, WhiteCol, HeroWrapper, WhiteRow, ArticleCol, ContentRow, AbsoluteRow, ArticleTitleCol, ArticleInfo, Separator } from 'components/styled/GridStyles';

// import { WhiteRow, ArticleCol, ContentRow } from 'components/styled/Common';

import SponsoredContainer from 'components/SponsoredContainer';

import SocialShareBtns from 'components/SocialShareBtns';
import SMEB from 'containers/DynamicRegions/SimpleMagicEditButton';

import AffixedSidebar from 'containers/AffixedSidebar';
import ShrinkBoxVideo from 'components/ShrinkBoxVideo';
import { msg } from 'utils/msg';

export class Post extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function

  render() {
    // msg(`Post.render()`);
    // FIRST, DETERMINE WHETHER OR NOT WE ARE WITH CONTENT, OR AWAITING IT.

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
      display: block;
      bottom: 30px;
      right: 30px;

      font-size: 34pt;
      background: none;
      background: #ffffff;
      height: 60px;
      width: 60px;
      line-height: 1;
    `;

    const someSocialSharingStuff = <SocialShareBtns itemAddress={this.props.itemAddress} itemTitle={this.props.itemTitle} itemExcerpt={this.props.itemExcerpt} itemThumbnail={this.props.itemThumbnail} itemSharingLink={this.props.itemSharingLink} />;
    // DETERMINE THE FEATUREDTHING - can be: <ShrinkBoxVideo> or <Image> ( with either featured_image_mode == Full Width or not)
    let theFeaturedThing = null;

    if (this.props.featured_video !== null && this.props.featured_video !== '') {
        theFeaturedThing = (
          <ShrinkBoxVideo videoId={this.props.featured_video} key="featured_video" active={this.props.active } className="theFeaturedThingPrint"/>
        );
    } else if (typeof this.props.thumbnail_huge !== 'undefined' && this.props.thumbnail_huge !== null && this.props.featured_image_mode === "Full Width") {
     // TODO: use <picture> to make images truly responsive here.
     // msg(`this.props.thumbnail_huge !== null`);
     // msg(this.props.thumbnail_huge);
     theFeaturedThing = (
       <div className="full">
         <Image src={this.props.thumbnail_huge.src} srcSet={this.props.thumbnail_huge.srcSet} sizes={this.props.thumbnail_huge.sizes} responsive className={ this.props.featured_image_mode === "Full Width" ? 'full theFeaturedThingPrint' : 'notFullWidth padBotMd theFeaturedThingPrint' } />
       </div>
     );
    } else {
      // msg(`this.props.thumbnail_huge === null`);
      if (this.props.thumbnails.length === 0 ) {
       // leave theFeaturedThing null
       // msg(`this.props.thumbnails.length === 0`);
      } else {
       theFeaturedThing = (
         <div className="full">
           <Image src={this.props.thumbnails[0].src} srcSet={this.props.thumbnails[0].srcSet} alt={this.props.thumbnails[0].alt} sizes={this.props.thumbnails[0].sizes} responsive className={this.props.featured_image_mode === "Landscape Inset" ? 'full theFeaturedThingPrint' : 'notFullWidth padBotMd theFeaturedThingPrint' } />
         </div>
       );
      }
    }
    // msg(`done preparing theFeaturedThing`);
    let content = null;
    // let postContent = null;
    const PostPageWrapper = styled.div`

    `;
    const postContent = this.props.pagedContent.map((item, i) => {
      return (<PostPageWrapper key={`page_${i}`} className="postPageWrapper" dangerouslySetInnerHTML={{ __html: item}} />);
    });

    if (this.props.featured_image_mode === 'Full Width') {
      content = (
        <div key={`contentrow_${this.props.index}`} ref={`contentrow_${this.props.permalink}`} id={`contentrow_${this.props.permalink}`}>
          <RelativeGrid fluid>
            <Row className="fullWidthFeaturedRow">
              {theFeaturedThing}
              <div className="fullWidthPhotoCredit">{this.props.photoCredit}</div>
            </Row>
            <Grid>
              {/* <Col md={12} lg={10} lgOffset={1}> */}
              <Col lg={12}>
                <AbsoluteRow>
                  <ArticleTitleCol md={9}>
                    {/* <RedTagLgLink to="" className="redTagPostMargin">Cat</RedTagLgLink> */}

                      <H1 dangerouslySetInnerHTML={{ __html: typeof this.props.post_title !== 'undefined' ? this.props.post_title : ''}} />
                  </ArticleTitleCol>
                </AbsoluteRow>
              </Col>
            </Grid>
          </RelativeGrid>
          <Grid>
            {/* <Col md={12} lg={10} lgOffset={1}> */}
            <Col lg={12}>
              <WhiteRow>
                <ArticleCol md={8}>
                  <ArticleInfo>
                    <div className="full">
                      <span className="bold">{this.props.author}</span> | <span>{this.props.postDate}</span><SMEB post_id={this.props.post_id} typeOfThing="post" />
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
                    <FullWidthAd>
                      <AffixedSidebar index={this.props.index} containmentUnit={() => ReactDOM.findDOMNode(this.refs[`contentrow_${this.props.permalink}`])} />
                    </FullWidthAd>
                </Col>
              </WhiteRow>
            </Col>
          </Grid>

        </div>
      );
    } else if (this.props.featured_image_mode === 'Landscape Inset') {// this will make it always render using this clause!
      // // console.log('SinglePostPage.render: Landscape Inset');
      content = (
        <div key={`contentrow_${this.props.index}`} ref={`contentrow_${this.props.permalink}`} id={`contentrow_${this.props.permalink}`} className="clauseOne">
          <Grid>
            {/* <Col md={12} lg={10} lgOffset={1}> */}
            <Col md={12}>
              <WhiteRow className="padTopMd">
                <div className="headingPostContent">
                  {/* <RedTagLgLink to="/">Cat</RedTagLgLink> */}
                  <H1 dangerouslySetInnerHTML={{ __html: typeof this.props.post_title !== 'undefined' ? this.props.post_title : ''}} />
                  <ArticleInfo className="noMargLeft"><span className="bold">{this.props.author}</span> | <span>{this.props.postDate}</span><SMEB post_id={this.props.post_id} typeOfThing="post" /></ArticleInfo>
                  <div className="padTopMd">
                    {someSocialSharingStuff}
                  </div>
                  {theFeaturedThing}
                  <div className="landscapeInsetPhotoCredit">{this.props.photoCredit}</div>
                </div>
            </WhiteRow>
            </Col>
          </Grid>
          <Grid>
            {/* <Col md={12} lg={10} lgOffset={1}> */}
            <Col md={12}>
              <WhiteRow className="padTopBotMd">
                <ArticleCol md={8}>
                  <ContentRow className="postContent">
                    {postContent}
                    {someSocialSharingStuff}
                    <Separator />
                    <SponsoredContainer />
                  </ContentRow>
                </ArticleCol>
                <Col md={4}>
                  <FullWidthAd>
                    <AffixedSidebar index={this.props.index} containmentUnit={() => ReactDOM.findDOMNode(this.refs[`contentrow_${this.props.permalink}`])} />
                  </FullWidthAd>
                </Col>
              </WhiteRow>
            </Col>
          </Grid>
        </div>
      );
    } else if (this.props.featured_image_mode === 'Portrait Inset' || this.props.featured_image_mode === null) {
      // // console.log(`and here we are at 517`);
      content = (
        <div key={`contentrow_${this.props.index}`} ref={`contentrow_${this.props.permalink}`} id={`contentrow_${this.props.permalink}`} className="clauseTwo">
          <Grid>
            {/* <Col md={12} lg={10} lgOffset={1}> */}
            <Col md={12}>
              <WhiteRow className="padTopBotMd">
                <ArticleCol md={8}>
                  <ContentRow className="postContent">

                    {/* <RedTagLgLink to="/">Cat</RedTagLgLink> */}
                    <H1 dangerouslySetInnerHTML={{ __html: typeof this.props.post_title !== 'undefined' ? this.props.post_title : ''}} className="noMargTop"/>
                    <ArticleInfo className="noMargLeft"><span className="bold">{this.props.author}</span> | <span>{this.props.postDate}</span><SMEB post_id={this.props.post_id} typeOfThing="post" /></ArticleInfo>
                    <div className="padTopMdFull">
                      {someSocialSharingStuff}
                    </div>
                    {theFeaturedThing}
                    <div className="portraitInsetPhotoCredit">{this.props.photoCredit}</div>
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
                    <AffixedSidebar index={this.props.index} containmentUnit={() => ReactDOM.findDOMNode(this.refs[`contentrow_${this.props.permalink}`])} />
                  </PortraitDiv>
                </Col>

              </WhiteRow>
            </Col>
        </Grid>
      </div>
      );
      // // console.log('and that was the itemContent ...');
    } else {
      content = (
        <div key={`contentrow_${this.props.index}`} ref={`contentrow_${this.props.permalink}`} id={`contentrow_${this.props.permalink}`} className="clauseTwo">
          <Grid>
            {/* <Col md={12} lg={10} lgOffset={1}> */}
            <Col md={12}>
              <WhiteRow className="padTopBotMd">
                <ArticleCol md={8}>
                  <ContentRow className="postContent">

                    {/* <RedTagLgLink to="/">Cat</RedTagLgLink> */}
                    <H1 dangerouslySetInnerHTML={{ __html: typeof this.props.post_title !== 'undefined' ? this.props.post_title : ''}} className="noMargTop"/>
                    <ArticleInfo className="noMargLeft"><span className="bold">{this.props.author}</span> | <span>{this.props.postDate}</span><SMEB post_id={this.props.post_id} typeOfThing="post" /></ArticleInfo>
                    <div className="padTopMdFull">
                      {someSocialSharingStuff}
                    </div>
                    {theFeaturedThing}
                    <div className="portraitInsetPhotoCredit">{photo_credit}</div>
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
                    <AffixedSidebar index={this.props.index} containmentUnit={() => ReactDOM.findDOMNode(this.refs[`contentrow_${this.props.permalink}`])} />
                  </PortraitDiv>
                </Col>

              </WhiteRow>
            </Col>
        </Grid>
      </div>
      );
    }


    return (
      <div>{content}</div>
    );
  }
}

Post.defaultProps = {
  featured_video: null,
  featured_image_mode: 'Portrait Inset',
  theCurrentThing: false,
  photo_credit: null,
  active: false,
  isLastItem: false,
  postDate: null,
  address: null,
  post_id: null,
  author: null,
  post_title: null,
  excerpt: null,
  thumbnail: null,
  thumbnails: [],
  largeThumbnail: null,
  sharingLink: null,
  pagedContent: null,
  permalink: null,
  post_slug: null,
};

 export default Post;
