/**
*
* ArchiveTeasers
*
*/

import React from 'react';
import styled from 'styled-components';
import { media } from 'style-utils';
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
    //

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

    const RedTagSm = styled(Link)`
      color: #d02d2f;
      font-family: 'Roboto Condensed', sans-serif;
      text-transform: uppercase;
      font-size: 1em;
      display: block;
      ${media.small`
        text-align:center;
      `}
      ${media.extrasmall`
        margin-bottom: 0px;
        float: left;
        width: 100%;
      `}
      &:hover {
        cursor: pointer;
        color: #d02d2f;
        text-decoration: none;
      }

    `;


   const PostArray = [];
   const APost = (
     <Col md={4}>
       <PostTeaser>
         <Link to="/" className="zoomin frame">
           <Image src="http://placehold.it/350x350" className="zoomImgTeaser" />
         </Link>
         <Link to="">
           <PostTeaserH3>Bacon tenderloin flank chicken kielbasa doner drumstick pancetta</PostTeaserH3>
         </Link>
         <RedTagSm>Tag Goes Here</RedTagSm>
       </PostTeaser>
     </Col>
   );

   for (var i = 0; i < 9; i ++) {
     PostArray.push(APost);
   }

    return (

      <MargedDiv>
        <Grid>
          <Row>
            <WhiteCol md={12}>
              <Row>
                <Col md={10} mdOffset={1}>
                  <Row>
                    {/* {featuredBoxStack} */}

                    {PostArray}


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



ArchiveTeasers.propTypes = {

};

export default ArchiveTeasers;
