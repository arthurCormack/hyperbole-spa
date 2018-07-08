/**
*
* HomeFeatured4Col
*
*/
import React from 'react';
import styled from 'styled-components';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { selectItems } from './selectors';

import { media } from 'style-utils';
import { clone } from 'lodash';
import FeaturedSingleBox from 'components/FeaturedSingleBox';
// import Poll from 'containers/DynamicRegions/Poll';
// import BigBox from 'components/BigBox';
import AffixedSidebar from 'containers/AffixedSidebar';

// import GamesAndGiveaways from 'components/GamesAndGiveaways';
import SmallSponsoredContentHolder from 'containers/SmallSponsoredContentHolder';
import { Grid, Row, Col, Image, Clearfix } from 'react-bootstrap';
import { isEqual } from 'lodash';

class HomeFeatured4Col extends React.PureComponent {


  render() {
    console.log(`HomeFeatured4Col.render()`);
    if (!this.props.items) {
      return null;
    }

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
      //lodash copy array _copy
    const featuredBoxStack = [];
    let chunk = null;
    if (this.props.chunkNum == 1) {
      chunk = clone(this.props.items).splice(0,4);
    }
    if (this.props.chunkNum == 2) {
      chunk = clone(this.props.items).splice(4);
    }

    chunk.forEach((item, i) => {
      //const SmallSponsoredContentHolderIndex = i+1;
      featuredBoxStack.push(
        <Col md={4} sm={6} key={`featuredSingleBoxCol_${this.props.chunkNum}_${i}`}>
            <FeaturedSingleBox
              post_title={item.post_title}
              post_permalink={item.post_permalink}
              post_url={item.post_url}
              post_thumb={item.post_thumb}
              post_cat={item.post_cat}
              post_cat_link={item.post_cat_link}
            />
        </Col>
      );
      if (this.props.chunkNum == 1 ) {
        if (i == 1 ) {
          // featuredBoxStack.push(<Col md={4}><BigBox key={`featuredSingleBoxCol_${this.props.chunkNum}_bigbox`} /> </Col>);
          featuredBoxStack.push(<Col md={4} key={`box_${this.props.chunkNum}_${i}`}><AffixedSidebar index={i} fixed active key={`bigbox_${this.props.chunkNum}_${i}`}/></Col>);
        }
        if (i == 3 ) {
          featuredBoxStack.push(<Col md={4} key={`box_${this.props.chunkNum}_${i}`}><SmallSponsoredContentHolder adUnitPosition={1} adUnitField={`sponsored_one`} index={0} key={`featuredSingleBoxCol_${this.props.chunkNum}_smallsponsoredcontent`} /> </Col>);
        }
      }
      if (this.props.chunkNum == 2 ) {
        if (i == 1 ) {
          featuredBoxStack.push(<Col md={4} key={`box_${this.props.chunkNum}_${i}`}><AffixedSidebar index={i} fixed active key={`bigbox_${this.props.chunkNum}_${i}`}/></Col>);
        }
        if (i == 3 ) {
          featuredBoxStack.push(<Col md={4} key={`box_${this.props.chunkNum}_${i}`}><SmallSponsoredContentHolder adUnitPosition={2} adUnitField={`sponsored_two`} index={1} key={`featuredSingleBoxCol_${this.props.chunkNum}_smallsponsoredcontent`} /> </Col>);
        }
      }
    });
/*
  Do we really want to be doing this with the sponsored content? moving the same ad unit around over the dom, with waypoint detectors? maybe not. the address isn't changing and it is like new impressions of the same ad unit with no address change. bad. unreliable.

*/


    let featuredBoxStackWithClearFixes = [];
    featuredBoxStack.forEach((item, i) => {
      featuredBoxStackWithClearFixes.push(item);
      if (i == 2 || (i + 1) % 3 == 0) {
        featuredBoxStackWithClearFixes.push(<Clearfix visibleMdBlock visibleLgBlock key={`clearfix_${i}`} />);
      }
    });

    if (this.props.chunkNum == 1) {
      return (
        <MargedDiv className="noMargTop" key={`featuredFour_chunk_${this.props.chunkNum}`}>
          <Grid>
            <Row>
              <WhiteCol md={12}>
                <Row>
                  <Col md={10} mdOffset={1}>
                    <Row>
                      {featuredBoxStackWithClearFixes}
                    </Row>
                  </Col>
                </Row>
              </WhiteCol>
            </Row>
          </Grid>
        </MargedDiv>
      )
    } else {
      return (
        <MargedDiv key={`featuredFour_chunk_${this.props.chunkNum}`}>
          <Grid>
            <Row>
              <WhiteCol md={12}>
                <Row>
                  <Col md={10} mdOffset={1}>
                    <Row>
                      {featuredBoxStackWithClearFixes}
                      {/* <SmallSponsoredContentHolder /> */}
                    </Row>
                  </Col>
                </Row>
              </WhiteCol>
            </Row>
          </Grid>
        </MargedDiv>
      )
    }

  }

}

HomeFeatured4Col.defaultProps = {
  items: false,
  chunk: [],
};

// const mapStateToProps = (state) => {
//   // // console.log(`mapStateToProps`);
//   // // console.log(state);
//   return {
//     // items: typeof state.getIn(['global', 'dynamicRegions', 'featuredBinPosts']).toJS === 'function' ? state.getIn(['global', 'dynamicRegions', 'featuredBinPosts']).toJS() : state.getIn(['global', 'dynamicRegions', 'featuredBinPosts']),
//     // poll: typeof state.getIn(['global', 'dynamicRegions', 'homePoll']).toJS === 'function' ? state.getIn(['global', 'dynamicRegions', 'homePoll']).toJS() : state.getIn(['global', 'dynamicRegions', 'homePoll']),
//   };
// };
const mapStateToProps = createStructuredSelector({
  items: selectItems(),
});

const mapDispatchToProps = () => {
  return {};
};

// export default FeaturedFour;
export default connect(mapStateToProps, mapDispatchToProps)(HomeFeatured4Col);
