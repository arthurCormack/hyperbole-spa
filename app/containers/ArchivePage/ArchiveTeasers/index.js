/**
*
* ArchiveTeasers
*
*/

import React from 'react';
import styled from 'styled-components';
import { connect } from 'react-redux';
import { media } from 'style-utils';
// import FeaturedSingleMedium from 'components/FeaturedSingleMedium';
import FeaturedSingleBox from 'components/FeaturedSingleBox';
import Poll from 'components/Poll';
import AdBox from 'components/AdBox';
import GamesAndGiveaways from 'components/GamesAndGiveaways';
import { Grid, Row, Col, Image, Clearfix } from 'react-bootstrap';
import { Link } from 'react-router-dom';

class ArchiveTeasers extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function
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


    const PostTeaser = styled.div`
      margin: 10px 0;
      color: #000;
      float:left;
      width: 100%;
      `;

    const PostTeaserH3 = styled.h3`
      margin: 10px 0;
      color: #000;
      float: left;
      width: 100%;
      ${media.small`
        text-align:center;
      `}
      &:hover {
        cursor: pointer;
      }
    `;

    const featuredBoxStack = [];

    // let chunk = null;
    // if (this.props.chunkNum == 1) {
    //   chunk = this.props.items.splice(0,8);
    // } else if (this.props.chunkNum == 2) {
    //   chunk = this.props.items.splice(8,7);
    // }
    // const firstChunk = this.props.items.splice(0,8);
    // const secondChunk = this.props.items.splice(8,15);

    // let featuredBoxStackLength = 0;

    // chunk.forEach( (item, i) => {
    //   featuredBoxStack.push(
    //     <Col md={4}>
    //       <FeaturedSingleBox
    //         key={`featuredSingleBoxCol_${i}`}
    //         post_title={item.post_title}
    //         post_permalink={item.post_permalink}
    //         post_thumb={item.post_thumb}
    //       />
    //     </Col>
    //   );
    //   }

    //   if (i == 1 && this.props.chunkNum == 1 ) {
    //     featuredBoxStack.push(<GamesAndGiveaways />);
    //   }
    //   if (this.props.chunkNum == 2 ) {
    //     if (i == 3) {
    //       featuredBoxStack.push(<Poll />);
    //     } else if (i == 1) {
    //       featuredBoxStack.push(<AdBox />);
    //     }
    //   }
    // });

    // let featuredBoxStackWithClearFixes = [];
    // featuredBoxStack.forEach( (item, i) => {
    //   featuredBoxStackWithClearFixes.push(item);
    //   if ((i + 1) % 3 == 0) {
    //     featuredBoxStackWithClearFixes.push(<Clearfix visibleMdBlock visibleLgBlock />);
    //   }
    // } );

    return (

      <MargedDiv>
        <Grid>
          <Row>
            <WhiteCol md={12}>
              <Row>
                <Col md={10} mdOffset={1}>
                  <Row>
                    {/* {featuredBoxStack} */}

                    <PostTeaser>
                      <Link to="/" className="zoomin frame">
                        <Image src="http://placehold.it/350x350" className="zoomImgTeaser" />
                      </Link>
                      <Link to="">
                        <PostTeaserH3>Hello, its me</PostTeaserH3>
                      </Link>
                      <RedTagSm>Celebrity</RedTagSm>
                    </PostTeaser>

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

// ArchiveTeasers.defaultProps = {
//   items: [],
//   chunk: [],
// };


// const mapStateToProps = (state) => {
//   return {
//     items: state.getIn(['global', 'dynamicRegions', '']),
//   };
// };

// const mapDispatchToProps = () => {
//   return {};
// };

export default ArchiveTeasers;
// export default connect(mapStateToProps, mapDispatchToProps)(HomeFeatured3Col);
