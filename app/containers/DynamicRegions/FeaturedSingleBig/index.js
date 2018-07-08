/**
*
* FeaturedSingleBig
*
*/

import React from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { Image } from 'react-bootstrap';
import BigImg from './images/postThumbLg.jpg';
import { media } from 'style-utils';
import he from 'he';

class FeaturedSingleBig extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function
  render() {
    const BigImgPic = styled(Image)`
      margin-top: 44px;
      float:left;
      width: 100%;
    `;

    const PostTeaser = styled.div`
      float:left;
      width: 100%;
      >h3 {
        margin: 10px 0;
        color: #000;
      }
      &:hover {
        cursor: pointer !important;
      }
    `;

    const PaddedLink = styled(Link)`
      ${'' /* margin-top: 54px; */}
    `;

    const RedTag = styled(Link)`
      float: left;
      width: 100%;
      text-align: center;
      color: #d02d2f;
      font-family: 'Roboto Condensed', sans-serif;
      text-transform: uppercase;
      text-align: center;
      font-size: 1.3em;
      position: relative;
      margin-bottom: 0 !important;
      top: 10px;
      display: block;
      &:hover {
        cursor: pointer;
        color: #d02d2f;
        text-decoration: none;
      }
    `;

    const H3Title = styled.h3`
      float: left;
      width: 100%;
      text-align: center;
      padding-top: 10px;
    `;


    const featuredSingleBigBox = this.props.items.map((item, i) => {

      let theCat = '';

      if (typeof item.post_cat == 'string') {
        theCat = he.decode(item.post_cat);
      }

      return (
          <PostTeaser key={`featuredSingleBoxCol_${i}`}>
            <PaddedLink to={item.post_url} className="zoominLg frameLg">
              <Image src={item.post_thumb} className="" />
            </PaddedLink>
            {/* <RedTag to={item.post_cat_link}>{theCat}</RedTag>
            <H3Title>{item.post_title}</H3Title> */}
          </PostTeaser>


      );
    })

    return (
      <div>{featuredSingleBigBox}</div>
    );
  }
}


const mapStateToProps = (state) => {
  return {
    items: typeof state.getIn(['global', 'dynamicRegions', 'featuredSingleBig']).toJS === 'function' ? state.getIn(['global', 'dynamicRegions', 'featuredSingleBig']).toJS() : state.getIn(['global', 'dynamicRegions', 'featuredSingleBig']),
  };
};

const mapDispatchToProps = () => {
  return {};
};

// export default FeaturedFour;
export default connect(mapStateToProps, mapDispatchToProps)(FeaturedSingleBig);
