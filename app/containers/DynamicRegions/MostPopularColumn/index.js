/**
*
* MostPopularColumn
*
*/

import React from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
// import { Image } from 'react-bootstrap';
import FeaturedSingleBox from 'components/FeaturedSingleBox';
import { media } from 'style-utils';

class MostPopularColumn extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function
  render() {
    const MostPopularHeading = styled.h2`
      text-transform: uppercase;
      margin: 0 0 10px 0;
      font-size: 2em;
      ${media.large`
        text-align:center;
      `}
    `;


    const featuredMostPopularBoxes = this.props.items.map((item, i) => {
      return (
          <FeaturedSingleBox
            key={`featuredMostPopular_${i}`}
            post_title={item.post_title}
            post_url={item.post_url}
            post_thumb={item.post_thumb}
            post_cat={item.post_cat}
            post_cat_link={item.post_cat_link}
          />
      );
    })


    return (
      <div>
        <MostPopularHeading>Most Popular</MostPopularHeading>
        <div className="full">
          {/* <FeaturedSingleBox /> */}
          {/* <FeaturedSingleBox /> */}
          {featuredMostPopularBoxes}
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  // // console.log(`mapStateToProps`);
  // // console.log(state);
  return {
    items: typeof state.getIn(['global', 'dynamicRegions', 'mostPopular']).toJS === 'function' ? state.getIn(['global', 'dynamicRegions', 'mostPopular']).toJS() : state.getIn(['global', 'dynamicRegions', 'mostPopular']),
    noBg: false,
  };
};

const mapDispatchToProps = () => {
  return {};
};

// export default MostPopularColumn;
export default connect(mapStateToProps, mapDispatchToProps)(MostPopularColumn);
