/**
*
* FeaturedPopularTrending
*
*/

import React from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import styled from 'styled-components';
import { media } from 'style-utils';
// import MostPopularColumn from 'containers/DynamicRegions/MostPopularColumn';
import SpecialCategoriesColumn from './SpecialCategoriesColumn';
// import FeaturedSingleBig from 'containers/DynamicRegions/FeaturedSingleBig';
// import TileHome from 'containers/DynamicRegions/TileHome';
// import SingleTile from 'containers/DynamicRegions/SingleTile';
import HomeTile from './HomeTile';

import TrendingColumn from './TrendingColumn';
import { Row, Col, Grid } from 'react-bootstrap';
import { selectSpecialCategories, selectHomeTile, selectTrendingColumn, selectLoading, selectError } from './selectors';
// ok so now, this is a container, and instead of letting the three things inside it each do their own thing, it is responsible for 1 call,
// replacing the combined 7 calls of the 3 child containers!
//

class FeaturedPopularTrending extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function
  render() {

    console.log(`FeaturedPopularTrending.render()`);
    if (this.props.loading) {
      return (<div>Loading...</div>);
    }
    if (!this.props.specialCategories) return null;
    const MargedDiv = styled.div`
      margin: 0 0 80px 0;
    `;

    const WhiteCol = styled(Col)`
      background: #fff;
      padding: 10px 50px 50px 50px;
      ${media.small`
        background: none;
        padding: 0;
      `}
    `;

    const TileCol = styled(Col)`
      ${media.large`
        position: relative;
        left: -34px;
      `}
      ${media.medium`
        left: 0;
      `}
    `;

    return (
      <MargedDiv>
        <Grid>
          <Row>
            <WhiteCol md={12}>
              <Row>
                <Col lg={4} md={4} sm={12}>
                  <SpecialCategoriesColumn specialCategories={this.props.specialCategories}/>
                </Col>
                <TileCol lg={5} md={6} sm={12}>
                <HomeTile tile={this.props.homeTile}/>
                </TileCol>
                <Col lg={3} md={2} sm={12}>
                  <TrendingColumn items={this.props.trendingColumn}/>
                </Col>
              </Row>
            </WhiteCol>
          </Row>
        </Grid>
      </MargedDiv>
    );
  }
}

FeaturedPopularTrending.defaultProps = {
  loading: false,
  error: false,
  specialCategories: false,
  homeTile: false,
  trendingColumn: false,
}

const mapStateToProps = createStructuredSelector({
  loading: selectLoading(),
  error: selectError(),
  specialCategories: selectSpecialCategories(),
  homeTile: selectHomeTile(),
  trendingColumn: selectTrendingColumn(),
});
function mapDispatchToProps(dispatch) {
  return {

    dispatch,
  };
}

FeaturedPopularTrending.propTypes = {

};

export default connect(mapStateToProps, mapDispatchToProps)(FeaturedPopularTrending);
