/**
*
* HotTopics
*
*/

import React from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import styled from 'styled-components';
import { Grid, Row, Col, Image } from 'react-bootstrap';
import { Link } from 'react-router-dom';


import HotTopicItem from './HotTopicItem';
import CustomHotTopics from './CustomHotTopics';
// import TodaysDate from 'components/TodaysDate';
import { media } from 'style-utils';
// import Contests from './images/contests.jpg';
// import Games from './images/games.jpg';
import Horoscopes from './images/horoscopes.jpg';
import { clone, isEqual } from 'lodash';
import { MargedDivOnlySmall } from 'components/styled/Common';
import { selectItems } from './selectors';
import { HotTopic, ZoomHoverLink, HotTopicH4 } from 'components/styled/HotTopics';

class HotTopics extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function

  render() {
    console.log(`HotTopics.render()`);

    if (!this.props.items) return null;

    const MargedDiv = styled.div`
      margin: 125px 0;
    `;

    const WhiteCol = styled(Col)`
      background: #fff;
      padding: 50px;
      ${media.extrasmall`
        background: none;
        padding: 0;
      `}
    `;

    const HotTopicHeadingRow = styled.div`
      position: relative;
      text-align: center;
      margin: 0 auto 20px auto;
      float: left;
      width: 100%;
    `;

    const HotTopicsHeading = styled.h1`
      font-family: 'Cormorant Infant', serif;
      text-align: center;
      font-size: 6.5em;
      letter-spacing: -4px;
      ${media.extrasmall`
        font-size: 4em;
      `}
    `;

    const HotTopicsDate = styled.span`
      font-family: 'Roboto Condensed', sans-serif;
      text-transform: uppercase;
      position: relative;
      top: -18px;
      ${'' /* left: -60px; */}
      font-size: 1.1em;
      text-align: center;
      ${media.extrasmall`
          top: 0;
          left: 0;
          text-align: center;
      `}
    `;

    const ZoomHoverLinkXtra = styled(Link)`
      height: 215px;
      width: 215px;
      overflow: hidden;
      display: block;
      /*${media.large`
        margin: 0 auto;
      `}*/
      ${media.extrasmall`
        height: 100%;
        width: 100%;
      `}
      &:hover {
        cursor: pointer !important;
      }
      img {
        height: 215px;
        width: 215px;
        -webkit-transition: all 2s ease;
        -moz-transition: all 2s ease;
        -ms-transition: all 2s ease;
        transition: all 2s ease;
        cursor: pointer !important;
        ${media.extrasmall`
          height: 100% !important;
          width: 100% !important;
        `}
        &:hover {
          height: 240px;
          width: 240px;
          ${media.extrasmall`
            height: 100%;
            width: 100%;
          `}
        }
      }
    `;

    const HXtraH4 = styled.h4`
            text-align: center;
            margin: 10px 0 25px 0;
            float: left;
            width: 100%;
            font-size: 1.5em;
            color: #000;
            ${media.extrasmall`
              font-size: 1.6em;
              padding-bottom: 20px;
            `}
            &:hover {
              cursor: pointer;
            }
    `;

    const someTopics = this.props.items.map((item, i) => {
      console.log(item, i);
      return (
        <Col md={4} sm={4} xs={12} key={`featuredSingleBoxCol1_${i}`}>
          <HotTopic>
            <Link to={item.tag_permalink} className="centeredMarginFull">
              <Image src={item.tag_thumb} className="full" />
            </Link>
            <Link to={item.tag_permalink}>
              <HotTopicH4>{item.tag_name}</HotTopicH4>
            </Link>
          </HotTopic>
        </Col>
      );
    })

    return (
      <MargedDivOnlySmall>
        <Grid>
          <Row>
            <WhiteCol>
              <Row>
                <HotTopicHeadingRow>
                  <HotTopicsHeading>Insider</HotTopicsHeading>
                  <HotTopicsDate>
                    {/* <TodaysDate /> */}
                    {/* <h4>Join The Club</h4> */}
                  </HotTopicsDate>
                </HotTopicHeadingRow>
              </Row>
              <Row>
                <Col lg={10} lgOffset={1} md={10} mdOffset={1}>
                  <Row>
                    {someTopics}
                  </Row>
                </Col>
              </Row>
            </WhiteCol>
          </Row>
        </Grid>
      </MargedDivOnlySmall>
    );

  }
}

HotTopics.defaultProps = {
  index: 0,
};
// const mapStateToProps = (state) => {
//   // // console.log(`mapStateToProps`);
//   // // console.log(state);
//   return {
//     items: typeof state.getIn(['global', 'dynamicRegions', 'hotTopics']).toJS === 'function' ? state.getIn(['global', 'dynamicRegions', 'hotTopics']).toJS() : state.getIn(['global', 'dynamicRegions', 'hotTopics']),
//   };
// };
const mapStateToProps = createStructuredSelector({
  items: selectItems(),
});


const mapDispatchToProps = () => {
  return {};
};

// export default FeaturedFour;
export default connect(mapStateToProps, mapDispatchToProps)(HotTopics);
