/**
*
* TrendingColumn
*
*/

import React from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';
import { media } from 'style-utils';
import TrendingBox from './TrendingBox';
import { isEqual } from 'lodash';

class TrendingColumn extends React.Component { // eslint-disable-line react/prefer-stateless-function
  shouldComponentUpdate(nextProps) {
    if (!isEqual(nextProps.items, this.props.items)) {
      return true;
    }
    return false;
  }

  render() {
    if (!this.props.items) {
      return null;
    }
    const TrendingH2 = styled.h2`
    font-family: 'Crimson', serif !important;
    font-size: 18pt;
    -webkit-text-transform: uppercase;
    ${'' /* text-transform: uppercase; */}
    ${'' /* text-decoration: underline; */}
    margin: 0 0 20px 0;
    padding-bottom: 10px;
    text-align: center;
      ${media.large`
        text-align:center;
      `}
      ${media.medium`
        padding-top: 30px;
        float: left;
        width: 100%;
      `}
    `;
    const TrendingBoxDiv = styled.div`
      ${'' /* margin-top: 10px; */}
      float: left;
      width: 100%;
      position: relative;
      left: -20px;
      ${'' /* border: 2px solid #000; */}
      ${'' /* padding: 20px 0 0 0; */}
      ${media.large`
        left: -40px;
      `}
      ${media.medium`
        left: 0;
      `}
      ${media.small`
        width: 90%;
        float: left;
        margin: 0 auto;
        display: block;
        position: relative;
        left: 5%;
        background: #fff;
      `}
    `;

    const trendingItems = this.props.items.map((item, i) => {
      return (
          <TrendingBox
            key={`featuredSingleBoxCol_${i}`}
            post_title={item.post_title}
            post_url={item.post_url}
            theNum={`${i + 1}`}
          />
      );
    })



    return (
      <div>
        <TrendingBoxDiv>
          <TrendingH2>Trending</TrendingH2>
          {trendingItems}
        </TrendingBoxDiv>
      </div>
    );
  }
}

TrendingColumn.defaultProps = {
  items: false,
};

const mapStateToProps = (state) => {
  // // console.log(`mapStateToProps`);
  // // console.log(state);
  return {
    // items: typeof state.getIn(['global', 'dynamicRegions', 'trendingList']).toJS === 'function' ? state.getIn(['global', 'dynamicRegions', 'trendingList']).toJS() : state.getIn(['global', 'dynamicRegions', 'trendingList']),
  };
};

const mapDispatchToProps = () => {
  return {};
};

// export default FeaturedFour;
export default connect(mapStateToProps, mapDispatchToProps)(TrendingColumn);
