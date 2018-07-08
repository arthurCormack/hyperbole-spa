 /**
*
* FeaturedFour
*
*/

import React from 'react';
import { connect } from 'react-redux';
import styled, { css } from 'styled-components';
import { Row, Grid, Col, Clearfix } from 'react-bootstrap';
// import { Link } from 'react-router-dom';
import { isEqual } from 'lodash';
import { media } from 'style-utils';
import { createStructuredSelector } from 'reselect';
import FeaturedSingleBox from 'components/FeaturedSingleBox';
import { selectFeaturedFourItems } from './selectors';

// import { WhiteCol } from 'components/styled/GridStyles';

class FeaturedFour extends React.Component { // eslint-disable-line react/prefer-stateless-function

  shouldComponentUpdate(nextProps) {
    // // console.log(`FeaturedFour.shouldComponentUpdate`);
    // return true;
    // console.log(`FeaturedFour.shouldComponentUpdate()`, this.props, nextProps)
    if (!isEqual(nextProps.items, this.props.items)) {
      return true;
    }
    return false;
  }

  render() {
    // console.log(`FeaturedFour.render()`);
    console.log(`FeaturedFour.render()`, this.props.items);
    if (!this.props.items) {
      return null;
    }
    const MargedDiv = styled.div`
      margin: 50px 0 0 0;
      .noBg {
        background: rgba(0,0,0,0);
      }
      .yesBg {
        background: #fff;
      }
    `;


    const WhiteCol = styled.div`
      padding: 50px 50px 0 50px;
      background: #fff;

      ${props => props.noBg && css`
        background: rgba(0,0,0,0);
      `}
      ${media.medium`
        background: none;
        padding: padding: 50px 0;
      `}
      ${media.small`
        background: none;
        padding: 0;
      `}
    `;


    // const clearme = (<Clearfix visibleSmBlock />);
    const featuredBoxStack = [];

    const featuredSingleBoxes = this.props.items.map((item, i) => {
        featuredBoxStack.push(
          <Col md={3} sm={6} className="smxsGridPoint" key={`featuredFour_${i}`}>
            <FeaturedSingleBox
              key={`featuredSingleBoxCol_${i}`}
              post_title={item.post_title}
              post_url={item.post_url}
              post_thumb={item.post_thumb}
              post_cat={item.post_cat}
              post_cat_link={item.post_cat_link}
            />
          </Col>
      );
    })

    let featuredSinglesWithClearFixes = [];
    featuredBoxStack.forEach((item, i) => {
      featuredSinglesWithClearFixes.push(item);
      if (i == 1) {
        featuredSinglesWithClearFixes.push(<Clearfix visibleSmBlock key={`clear_${item}`}/>);
      }
    });

    return (
      <MargedDiv>
          <Grid>
            <Row>
              <WhiteCol md={12} className={this.props.noBg ? `noBg` : `yesBg`}>
                <Row>
                  {featuredSinglesWithClearFixes}
                </Row>
              </WhiteCol>
            </Row>
          </Grid>
        </MargedDiv>
    );
  }
}

FeaturedFour.defaultProps = {
  noBg: false,
  items: false,
}
// const mapStateToProps = (state) => {
//   // // console.log(`mapStateToProps`);
//   // // console.log(state);
//   return {
//     items: typeof state.getIn(['global', 'dynamicRegions', 'featuredFour']).toJS === 'function' ? state.getIn(['global', 'dynamicRegions', 'featuredFour']).toJS() : state.getIn(['global', 'dynamicRegions', 'featuredFour']),
//   };
// };
const mapStateToProps = createStructuredSelector({
  items: selectFeaturedFourItems(),
});


const mapDispatchToProps = () => {
  return {};
};

// export default FeaturedFour;
export default connect(mapStateToProps, mapDispatchToProps)(FeaturedFour);
