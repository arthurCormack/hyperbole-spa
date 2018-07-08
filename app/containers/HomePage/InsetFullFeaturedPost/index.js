/**
*
* InsetFullFeaturedPost
*
*/

import React from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import styled from 'styled-components';
import { Row, Col, Grid, Image } from 'react-bootstrap';
import { media } from 'style-utils';
import { Link } from 'react-router-dom';
import MainImg from './images/surf.jpg';
// import ShrinkBoxVideo from 'components/ShrinkBoxVideo';
import { selectItems } from './selectors';
class InsetFullFeaturedPost extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function

  componentDidMount() {

  }
  render() {
    // console.log("InsetFullFeaturedPost RENDERRRRR");
    if (!this.props.items) return null;
    console.log(`InsetFullFeaturedPost.render()`);
    const MargedDiv = styled.div`
      margin: 125px 0;
      ${media.extrasmall`
        margin: 0 0 125px 0;
      `}
    `;

    const WhiteCol = styled(Col)`
      background: #fff;
      padding: 50px;
      ${media.extrasmall`
        background: #fff;
        padding: 0 0 20px 0;
      `}
    `;

    const FullImg = styled(Image)`
      float: left;
      width: 100%;
    `;

    const FullPostCornerDiv = styled.div`
      position: relative;
      z-index: 9;
      &:hover {
        cursor: pointer;
      }
    `;

    const WhiteBox = styled.div`
      position: absolute;
      background: #fff;
      width: 240px;
      left: 40px;
      top: 40px;
      padding: 15px 20px 10px;
      h3 {
        margin: 5px 0;
        color: #000;
        float: left;
        width: 100%;
        font-size: 1.4em;
      }
    `;

    const BlackTag = styled(Link)`
      color: #000;
      font-family: 'Roboto Condensed', sans-serif;
      text-transform: uppercase;
      font-size: 1em;
      display: block;
      padding-top: 10px;
      &:hover {
        cursor: pointer;
        color: #000;
        text-decoration: none;
      }
    `;

    const TitleLink = styled(Link)`
      float: left;
      color: #000;
      font-size: 24pt;
      margin: 0;
      ${'' /* border-bottom: 2px solid #d02e30; */}
      transition: 0.2s all;
      &:hover{
        text-decoration: none;
        cursor: pointer;
        color: #d02e30;
      }
      ${media.large`
        font-size: 22pt;
        line-height: 24pt;
      `}
      ${media.medium`
        padding-bottom: 10px;
        text-align: center;
        display: block;
        width: 100%;
      `}
    `;

    const SeeAllLink = styled(Link)`
      float: right;
      color: #000;
      font-size: 19pt;
      margin: 0;
      border-bottom: 2px solid #d02e30;
      transition: 0.2s all;
      &:hover{
        text-decoration: none;
        cursor: pointer;
        color: #d02e30;
      }
      ${media.medium`
        text-align: center;
        border-bottom: none;
        width: 100%;
        color: #d02e30;
      `}

    `;


    const VideosH1 = styled.h1`
      text-align: center;
      margin: 0 0 15px 0;
      font-size: 3.2em;
      text-transform: uppercase;
    `;

    const mainContent = this.props.items.map((item, i) => {
      let videoSrc = `https://www.youtube.com/embed/${item.post_video}`;
      return (
        // <FullPostCornerDiv key={`InsetFeaturedBox_${i}`}>
        //   <WhiteBox>
        //     <BlackTag to={item.post_cat_link}>{item.post_cat}</BlackTag>
        //     <h3>{item.post_title}</h3>
        //   </WhiteBox>
        //   <Link to={item.post_url} className="full">
        //     <FullImg src={item.post_thumb} />
        //   </Link>
        // </FullPostCornerDiv>
        <Row key={`InsetFullFeaturedPost_${i}`}>
          <Col>
            <div className="video">
              <div className="videoWrapper">
                <iframe src={videoSrc} frameBorder="0" allowFullScreen></iframe>
              </div>
            </div>

            <Row>
              <Col md={8} sm={12}>
                <TitleLink to={item.post_url}>{item.post_title}</TitleLink>
              </Col>
              <Col md={4} sm={12}>
                <SeeAllLink to="/tag/videos">See all Videos</SeeAllLink>
              </Col>
            </Row>
          </Col>
        </Row>


      );
    })


    return (
      <MargedDiv>
        <Grid>
          <Row>
            <WhiteCol md={12}>
                  {mainContent}
            </WhiteCol>
          </Row>
        </Grid>
      </MargedDiv>
    );
  }
}

const mapStateToProps = createStructuredSelector({
  items: selectItems(),
});

// const mapStateToProps = (state) => {
//   return {
//     items: typeof state.getIn(['global', 'dynamicRegions', 'insetFeatured']).toJS === 'function' ? state.getIn(['global', 'dynamicRegions', 'insetFeatured']).toJS() : state.getIn(['global', 'dynamicRegions', 'insetFeatured']),
//   };
// };

const mapDispatchToProps = () => {
  return {};
};

// export default FeaturedFour;
export default connect(mapStateToProps, mapDispatchToProps)(InsetFullFeaturedPost);
