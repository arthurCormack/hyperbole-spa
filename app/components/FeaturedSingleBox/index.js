/**
*
* FeaturedSingleBox add
*
*/

import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { Image, Col } from 'react-bootstrap';
import { media } from 'style-utils';
import PostThumb from './images/postThumb1.jpg';
import he from 'he';
// import { RedTagSmOnTop } from 'components/styled/Common';

class FeaturedSingleBox extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function

  render() {

    // console.log(`FeaturedSingleBox.render()`);

    const RedTagSmOnTop = styled(Link)`
     color: #d02d2f;
     font-family: 'Roboto Condensed', sans-serif;
     -webkit-text-transform: uppercase;
     -webkit-text-transform: uppercase;
     text-transform: uppercase;
     font-size: 1.1em;
     display: block;
    margin: 7px 0 -9px;
     font-weight: bold;
     float: left;
       ${media.small`
         text-align:center;
       `}
       ${media.extrasmall`
         margin-bottom: 0px;
         float: left;
         width: 100%;
       `}
       &:hover {
         cursor: pointer;
         color: #d02d2f;
         text-decoration: none;
       }

    `;

    const PostTeaser = styled.div`
      margin: 0;
      color: #000;
      float:left;
      width: 100%;
      margin-bottom: 40px;
      ${media.medium`
        margin-bottom: 40px;
      `}
      ${media.small`
        margin-bottom: 40px;
        margin-top: 40px;
      `}
      ${media.small`
        margin-bottom: 40px;
        margin-top: 0;
      `}
      `;

    const PostTeaserH3 = styled.h3`
      margin: 7px 0 4px 0;
      color: #000;
      float: left;
      width: 100%;
      ${media.small`
        text-align:center;
        margin: 7px 0 4px 0;
        color: #000;
        float: none;
        width: 340px;
        margin: 6px auto;
      `}
      &:hover {
        cursor: pointer;
      }
    `;

    const FlexiblePostTeaser = styled.div`
        margin: 10px 0;
        color: #000;
        float: left;
        width: 100%;
        ${media.large`
          width: 185px;
        `}
        ${media.medium`
          width: 325px;
        `}
        ${media.small`
          width: 100%;
        `}
        ${media.extrasmall`
            float: left;
        `}
      `;

    const FlexPostTeaserH3 = styled.h3`
      margin: 10px 0;
      color: #000;
      float: left;
      width: 100%;
      ${media.large`
        font-size: 1.4em;
      `}
      ${media.medium`
        font-size: 1.6em;
      `}
      ${media.small`
        text-align:center;
      `}
      &:hover {
        cursor: pointer;
      }
    `;
    const FullImage = styled(Image)`
      float: left;
      width: 100%;
    `;
    const RedTagSm = styled(Link)`
    color: #d02d2f;
    font-family: 'Roboto Condensed', sans-serif;
    -webkit-text-transform: uppercase;
    -webkit-text-transform: uppercase;
    text-transform: uppercase;
    ${'' /* font-size: 1.1em; */}
    display: block;
    margin: 7px 0 -9px;
    font-weight: bold;
      ${media.small`
        text-align:center;
      `}
      ${media.extrasmall`
        margin-bottom: 0px;
        float: left;
        width: 100%;
      `}
      &:hover {
        cursor: pointer;
        color: #d02d2f;
        text-decoration: none;
      }

    `;

    let postTeaser = null;

    // let theCategory = this.props.category;
    // if (this.props.primary_cat !== null) {
    //   theCategory = this.props.primary_cat;
    // }


    let theCat = '';

    if (typeof this.props.post_cat === 'string') {
      // console.log(`attempting to he.decode(this.props.post_cat)`, this.props.post_cat);
      theCat = he.decode(this.props.post_cat);
    }
    // console.log(`this.props`, this.props);
    // if (this.props.onTop) {
      postTeaser = (
          <PostTeaser>
            <Link to={this.props.post_url} className="full">
              <Image src={this.props.post_thumb} className="full" />
            </Link>
            <RedTagSmOnTop className="full" to={this.props.post_cat_link}>{theCat}</RedTagSmOnTop>
            <Link to={this.props.post_url} className="full">
              <PostTeaserH3>{he.decode(this.props.post_title)}</PostTeaserH3>
            </Link>
          </PostTeaser>
      );
    // } else {
    //   postTeaser = (
    //       <PostTeaser>
    //         <Link to={this.props.post_url} className="zoomin frame">
    //           <Image src={this.props.post_thumb} className="zoomImgTeaser" />
    //         </Link>
    //         <Link to={this.props.post_url}>
    //           <PostTeaserH3>{he.decode(this.props.post_title)}</PostTeaserH3>
    //         </Link>
    //         <RedTagSm to={this.props.post_cat_link}>{theCat}</RedTagSm>
    //       </PostTeaser>
    //   );
    // }

    return (
      <div>{postTeaser}</div>
    );

  }
}

FeaturedSingleBox.propTypes = {

};

export default FeaturedSingleBox;
