/*
 *
 * TileHome
 *
 */

import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { Image } from 'react-bootstrap';
import { media } from 'style-utils';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
// import SocialShareBtns from 'components/SocialShareBtns';
import {isEqual} from 'lodash';
import { selectSingleTile } from './selectors';

export class SingleTile extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function


  // shouldComponentUpdate(nextProps) {
  //   if (!isEqual(nextProps.items, this.props.items)) {
  //     return true;
  //   }
  //   return false;
  // }

  render() {

    // const featuredTile = this.props.items.map((item, i) => {
    //   if(i === 0) {
    //     return (
    //         <Link to="/tiles" key={`featuredSingleBoxCol_${i}`} className="featuredTile">
    //           {/* <div className="onHoverSocial"><SocialShareBtns /></div> */}
    //           <Image src={item.post_tile} className="fullTileImg" />
    //         </Link>
    //     );
    //   }
    //
    //
    // })
    let someTitle = null;
    if (typeof this.props.tile.post_title === 'string') {
      someTitle = this.props.tile.post_title;
    }
    let someTileImage = null;
    if (typeof this.props.tile.homeTile === 'object') {
      // someTileImage = this.props.tile.mediumTileImage.src;
      someTileImage = <Image className="full" src={this.props.tile.homeTile.src} srcSet={this.props.tile.homeTile.srcSet} />
    }
    return (
        <div>
          <Link to="/tiles" className="full">{someTileImage}</Link>
        </div>
    );
  }
}

// const mapStateToProps = (state) => {
//   // // console.log(`mapStateToProps`);
//   // // console.log(state);
//   return {
//     items: typeof state.getIn(['global', 'dynamicRegions', 'homeTile']).toJS === 'function' ? state.getIn(['global', 'dynamicRegions', 'homeTile']).toJS() : state.getIn(['global', 'dynamicRegions', 'homeTile']),
//   };
// };
const mapStateToProps = createStructuredSelector({
    tile: selectSingleTile(),
  }
);
const mapDispatchToProps = () => {
  return {};
};

// export default FeaturedFour;
export default connect(mapStateToProps, mapDispatchToProps)(SingleTile);
