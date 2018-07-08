/**
*
* FullWidthPost
*
*/

import React from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect'
import { selectHomeHeroes, selectHomeHeroItems } from './selectors';

import { Grid, Col, Row, Image } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { media } from 'style-utils';
import styled from 'styled-components';

import { isEqual } from 'lodash';

class FullWidthPost extends React.Component { // eslint-disable-line react/prefer-stateless-function
  // shouldComponentUpdate () {
  //   // // console.log('FullWidthPost.shouldComponentUpdate() --> false');
  //   // return false;
  // }
  shouldComponentUpdate(nextProps) {
    // console.log(`FullWidthPost.shouldComponentUpdate()`, nextProps.items);
    if (!isEqual(nextProps.items, this.props.items)) {
      return true;
    }
    return false;
  }

  render() {
    // console.log(`FullWidthPost.render()`, this.props.items);
    if (!this.props.items || this.props.items.length === 0) {
      return null;
    }
    // // console.log('FullWidthPost.render()');
    // // console.log('this.props==');
    // // console.log(this.props);
    const FullLink = styled(Link)`
      float: left;
      width: 100%;
    `;

    const HeroImg = styled(Image)`
      float: left;
      width: 100% !important;
    `;

    const WhiteCol = styled(Col)`
      background: white;
      float: left;
      width: 100%;
    `;

    const RedTagLgLink = styled(Link)`
    color: #d02d2f;
    font-family: 'Roboto Condensed', sans-serif;
    text-transform: uppercase;
    text-align: center;
    font-size: 1.3em;
    position: relative;
    margin-bottom: 0 !important;
    top: 10px;
    display: block;
    padding-top: 8px;
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
          font-size: 2em;
        `}
        ${media.extrasmall`
          font-size: 24px;
          padding-bottom: 14px;
        `}
      }
    `;

    const homeHeroContent = this.props.items.map((item, i) => {
        if (this.props.index == i) {
          return (
            <div key={`featuredSingleBoxCol_${this.props.index}_${i}`}>
              {/* <Grid fluid> */}
                <Row>
                  <FullLink to={item.post_url}>
                    {/* <HeroImg {...item.post_thumb[0]} /> */}
                    <HeroImg src={item.post_thumb.src} srcSet={item.post_thumb.srcSet} />
                  </FullLink>
                </Row>
              {/* </Grid> */}
              <Grid>
                <Row>
                  <WhiteCol md={12}>
                    <RedTagLgLink to={item.post_cat_link}>{item.post_cat}</RedTagLgLink>
                    <HeadingLgLink to={item.post_url}>
                      <h2>{item.post_title}</h2>
                    </HeadingLgLink>
                  </WhiteCol>
                </Row>
              </Grid>
            </div>
          );
      }
    })
    return (
      <div>{homeHeroContent}</div>
    );
  }
}
//
// const mapStateToProps = (state) => {
//   // // console.log(`mapStateToProps`);
//   // // console.log(state);
//   return {
//     items: state.getIn(['global', 'dynamicRegions', 'homeHero']),
//     noBg: false,
//   };
// };

FullWidthPost.defaultProps = {
  items: [],
  noBg: false,
};
const mapStateToProps = createStructuredSelector({
  items: selectHomeHeroItems(),
});

// const mapStateToProps = (state) => {
//   // // console.log(`mapStateToProps`);
//   // // console.log(state);
//   return {
//     // items: typeof state.getIn(['global', 'dynamicRegions', 'homeHero']).toJS === 'function' ? state.getIn(['global', 'dynamicRegions', 'homeHero']).toJS() : state.getIn(['global', 'dynamicRegions', 'homeHero']),
//
//   };
// };

const mapDispatchToProps = () => {
  return {};
};

// export default FeaturedFour;
export default connect(mapStateToProps, mapDispatchToProps)(FullWidthPost);
