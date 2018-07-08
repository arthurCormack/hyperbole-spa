/**
*
* HomeFeatured3Col
*
*/

import React from 'react';
import styled from 'styled-components';
import { connect } from 'react-redux';
import { media } from 'style-utils';
// import FeaturedSingleMedium from 'components/FeaturedSingleMedium';
import FeaturedSingleBox from 'components/FeaturedSingleBox';
import Poll from 'containers/DynamicRegions/Poll';
// import BigBox from 'components/BigBox';
import AffixedSidebar from 'containers/AffixedSidebar';

import GamesAndGiveaways from 'components/GamesAndGiveaways';
import { Grid, Row, Col, Image, Clearfix } from 'react-bootstrap';

class HomeFeatured3Col extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function
  render() {
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

    const featuredBoxStack = [];

    let chunk = null;
    if (this.props.chunkNum == 1) {
      chunk = this.props.items.splice(0,7);
    }
    if (this.props.chunkNum == 2) {
      chunk = this.props.items.splice(0,8);
    }
    // const firstChunk = this.props.items.splice(0,8);
    // const secondChunk = this.props.items.splice(8,15);

    // let featuredBoxStackLength = 0;

    chunk.forEach( (item, i) => {
      featuredBoxStack.push(
        <Col md={4}>
          <FeaturedSingleBox
            key={`featuredSingleBoxCol_${i}`}
            post_title={item.post_title}
            post_permalink={item.post_permalink}
            post_url={item.post_permalink}
            post_thumb={item.post_thumb}
            post_cat={item.post_cat}
            post_cat_link={item.post_cat_link}
          />
        </Col>
      );

    if (this.props.chunkNum == 1 ) {
      if (i == 1) {
        featuredBoxStack.push(<GamesAndGiveaways />);
      }
      if (i == 3 ) {
        featuredBoxStack.push(<Col md={4}><Poll embed={this.props.poll.home_poll}/></Col>);
      }
    }
    if (this.props.chunkNum == 2 ) {
        if (i == 1) {
          // featuredBoxStack.push(<BigBox />);//
          featuredBoxStack.push(<AffixedSidebar index={i} fixed key={`bigbox_featuredthreee`}/>);

        }
      }
    });

    let featuredBoxStackWithClearFixes = [];
    featuredBoxStack.forEach( (item, i) => {
      featuredBoxStackWithClearFixes.push(item);
      if (i == 2 || (i + 1) % 3 == 0) {
        featuredBoxStackWithClearFixes.push(<Clearfix visibleMdBlock visibleLgBlock />);
      }
    } );

    return (

      <MargedDiv>
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
    );
  }
}

HomeFeatured3Col.defaultProps = {
  items: [],
  chunk: [],
};


const mapStateToProps = (state) => {
  // // console.log(`mapStateToProps`);
  // // console.log(state);
  return {
    items: typeof state.getIn(['global', 'dynamicRegions', 'recentPosts']).toJS === 'function' ? state.getIn(['global', 'dynamicRegions', 'recentPosts']).toJS() : state.getIn(['global', 'dynamicRegions', 'recentPosts']),
    poll: typeof state.getIn(['global', 'dynamicRegions', 'homePoll']).toJS === 'function' ? state.getIn(['global', 'dynamicRegions', 'homePoll']).toJS() : state.getIn(['global', 'dynamicRegions', 'homePoll']),
  };
};

const mapDispatchToProps = () => {
  return {};
};

// export default FeaturedFour;
export default connect(mapStateToProps, mapDispatchToProps)(HomeFeatured3Col);
