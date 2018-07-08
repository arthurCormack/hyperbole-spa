/**
 * NotFoundPage
 *
 * This is the page we show when the user visits a url that doesn't have a route
 */

 import React, { PropTypes } from 'react';
 import { connect } from 'react-redux';
 import Helmet from 'react-helmet';
 import { Row, Grid, Col } from 'react-bootstrap';
 // import { createStructuredSelector } from 'reselect';
 // import makeSelectDefaultPage from './selectors';
 import { Link } from 'react-router-dom';
import styled from 'styled-components';
 import { ZMGrid, WhiteGrid, MargedDivSm, WhiteRow, ArticleCol, FourOhFourRow, BigH1, BigH3 } from 'components/styled/Common';
 // import { media } from 'style-utils';
 // import he from 'he';
 // import BigBox from 'components/BigBox';
 // import AffixedSidebar from 'containers/AffixedSidebar';

 // import HeaderMasthead from 'components/HeaderMasthead';

 export class NotFoundPage extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function
   render() {

      const BackLink = styled(Link)`
        background: #d02e30;
          padding: 10px 20px;
          font-family: 'Crimson';
          color: #fff !important;
          font-size: 1.4em;
          margin: 20px auto 0 auto;
          display: block;
          text-align: center;
          width: 200px;
          transition: 0.2s all;
          &:hover {
            background: #a94442;
            text-decoration: none;
          }
      `;

     return (
       <ZMGrid fluid>

         <MargedDivSm>
           <Grid>
             <Row>

               <Col md={12}>
                 <WhiteRow>
                   <ArticleCol md={12}>

                     <FourOhFourRow>
                       <BigH1>404</BigH1>
                       {/* <div className="thickUnderline"></div> */}
                       <BigH3>Oops, looks like this page doesn&apos;t exist</BigH3>
                       <BackLink to="http://everythingzoomer.com/">Back Home</BackLink>
                     </FourOhFourRow>

                   </ArticleCol>
                 </WhiteRow>
               </Col>

               </Row>
           </Grid>
         </MargedDivSm>

      </ZMGrid>

     );
   }
 }


 export default NotFoundPage;
