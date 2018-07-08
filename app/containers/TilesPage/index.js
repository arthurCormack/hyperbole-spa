/*
 *
 * TilesPage
 *
 */

import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import Helmet from 'react-helmet';
import { Link } from 'react-router-dom';
import HeaderMasthead from 'components/HeaderMasthead';
import { ZMGrid, WhiteGrid, MargedDivSm, WhiteRow, ArticleCol, ContentRow, Spacer } from 'components/styled/Common';
import { Row, Grid, Col, Clearfix, Image } from 'react-bootstrap';
import SocialShareBtns from 'components/SocialShareBtns';
import { makeSelectTilesPage, makeSelectTileStack } from './selectors';
import { CenteredH2MargBot } from 'components/styled/Common';
export class TilesPage extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function
 render() {

   let someTiles = null;
   let featuredSingleBoxes = null;
   let featuredBoxStack = [];
   let featuredSinglesWithClearFixes = [];
   let j = 0;

   if (typeof this.props.tiles.tileStack !== 'undefined') {

     someTiles = this.props.tiles.tileStack;

    featuredSingleBoxes = someTiles.map((item, i) => {



      const itemTitle = typeof item.post_title !== 'undefined' ? item.post_title : '';
      const itemExcerpt = typeof item.excerpt !== 'undefined' ? item.excerpt : '';
      const itemThumbnail = typeof item.largeTileImage !== 'undefined' && item.largeTileImage !== null ? item.largeTileImage.src : ''; // get later when available
      const itemSharingLink = typeof item.permalink !== 'undefined' ? item.permalink : ''; // get later when available

      // console.log(`item title==${itemTitle}`);
      // console.log(`item excerpt==${itemExcerpt}`);
      // console.log(`item thumb==${itemThumbnail}`);
      // console.log(`item permalink==${itemSharingLink}`);

         featuredBoxStack.push(
           <Col md={4} sm={6} key={`tile_${i}`}>
             <div className="full">
               {/* {i} */}
               {/* <Link to={item.permalink}> */}
               <Image src={item.squareTile.src} srcSet={item.squareTile.srcSet}/>
               <div className="tileSocial">
                 <SocialShareBtns noPrint itemAddress={itemSharingLink} itemTitle={itemTitle} itemThumbnail={itemThumbnail} itemSharingLink={itemSharingLink} />
               </div>
             {/* </Link> */}
           </div>
           </Col>
       );
     })

   }


   featuredBoxStack.forEach((item, i) => {
     featuredSinglesWithClearFixes.push(item);
     j = i + 1;
     if (j % 3 == 0) {
       featuredSinglesWithClearFixes.push(<Clearfix visibleMdBlock visibleLgBlock key={`clear_${item}`} className="MargBotMd" />);
     }
   });


   return (
     <div>

       <ZMGrid fluid>

       <Helmet
         title="Inspiration"
         meta={[
           { name: 'description', content: 'Inspiration' },
         ]}

       />

         <HeaderMasthead version='mini'/>

           <MargedDivSm>
             <Grid>
               <Row>

                 <Col md={12}>
                   <WhiteRow>
                     <ArticleCol md={12}>

                       <ContentRow className="postContent">
                         <CenteredH2MargBot>Inspiration</CenteredH2MargBot>
                         {featuredSinglesWithClearFixes}
                       </ContentRow>

                     </ArticleCol>
                   </WhiteRow>
                 </Col>

                 </Row>
             </Grid>
           </MargedDivSm>

        </ZMGrid>

     </div>
   );
 }
}

TilesPage.propTypes = {
  dispatch: PropTypes.func.isRequired,
};

const mapStateToProps = createStructuredSelector({
  tiles: makeSelectTilesPage(),
});

function mapDispatchToProps(dispatch) {
  return {
    dispatch,
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(TilesPage);
