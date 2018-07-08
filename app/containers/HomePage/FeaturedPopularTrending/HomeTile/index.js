/**
*
* HomeTile
*
*/

import React from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import styled from 'styled-components';
import { media } from 'style-utils';
import { isEqual } from 'lodash';
import { Image } from 'react-bootstrap';

// import { selectHomeTile } from './selectors';

class HomeTile extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function
  // shouldComponentUpdate(nextProps) {
  //   if (!isEqual(nextProps.items, this.props.items)) {
  //     return true;
  //   }
  //   return false;
  // }

  render()  {
    if (!this.props.tile) return null;
    return (
      <Image src={this.props.tile} className='full' />
    );
  }
}

HomeTile.defaultProps = {
  tile: false,
}

// const mapStateToProps = (state) => {
//   // // console.log(`mapStateToProps`);
//   // // console.log(state);
//   return {
//     // items: typeof state.getIn(['global', 'dynamicRegions', 'homeTile']).toJS === 'function' ? state.getIn(['global', 'dynamicRegions', 'homeTile']).toJS() : state.getIn(['global', 'dynamicRegions', 'homeTile']),
//   };
// };
const mapStateToProps = createStructuredSelector({

});


const mapDispatchToProps = () => {
  return {};
};

// export default FeaturedFour;
export default connect(mapStateToProps, mapDispatchToProps)(HomeTile);
