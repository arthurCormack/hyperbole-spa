/**
*
* SpecialCatRecentPosts
*
*/

import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { getSpecialRecentPostsForTag } from './actions';
import { createStructuredSelector } from 'reselect';
// import styled from 'styled-components';
import he from 'he';
import { Tab, Row, Col, Nav, NavItem, Image } from 'react-bootstrap';
// import { selectSpecialCategories } from './selectors';
import { selectSpecialCategories } from 'containers/HomePage/FeaturedPopularTrending/selectors';

class SpecialCatRecentPosts extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function
  // we have this.props.tag
  // which can be used as a key, to look up in specialCategories, if we have that.

  // componentDidMount() {
  //   // console.log('SpecialCatRecentPosts.componentDidMount');
  //   if (this.props.tag !== null && (typeof this.props.items === 'undefined' || this.props.items.length === 0)) {
  //     this.props.triggerSpecialCatRecentPosts(this.props.tag);
  //   }
  // }

  render() {
    // console.log(`SpecialCatRecentPosts.render()`);
    if (!this.props.specialCategories || !this.props.tag) return null;
    const items = this.props.specialCategories[this.props.tag].resultSet;
    // console.log(`SpecialCatRecentPosts items:`, items);
    let featuredMostPopularBoxes = null;
    //if (this.props.items !== null && typeof this.props.items !== 'undefined') {
    if (items.length > 0) {
       featuredMostPopularBoxes = items.map((item, i) => {
        return (
          // <div >
            <Link to={item.permalink} className="specialCatPost" key={`tag${i}`}>
              <div className="full">
                <h2>{he.decode(item.post_title)}</h2>
              </div>
              <div className="full">
                <p>{he.decode(item.excerpt)}</p>
              </div>
            </Link>
          // </div>
        );
      })
    } else {

      featuredMostPopularBoxes = null;
    }

    return (
      <div>
        {featuredMostPopularBoxes}
      </div>
    );
  }
}

// SpecialCatRecentPosts.propTypes = {
// };


SpecialCatRecentPosts.defaultProps = {
  specialCategories: false,
  tag: null,
};


// const mapStateToProps = (state, ownProps) => {
//   // return {
//   //   items: () => {
//   //     if (this.props.tag === null) {
//   //       return null;
//   //     } else {
//   //       return typeof state.getIn(['global', 'dynamicRegions', 'specialCatRecentPosts', this.props.tag]).toJS === 'function' ?
//   //       state.getIn(['global', 'dynamicRegions', 'specialCatRecentPosts', this.props.tag]).toJS() :
//   //       state.getIn(['global', 'dynamicRegions', 'specialCatRecentPosts', this.props.tag]);
//   //     }
//   //   },
//   // };
//
//   return {
//     // items: typeof state.getIn(['global', 'dynamicRegions', 'specialCatRecentPosts', ownProps.tag]).toJS === 'function' ?
//     //       state.getIn(['global', 'dynamicRegions', 'specialCatRecentPosts', ownProps.tag]).toJS() :
//     //       state.getIn(['global', 'dynamicRegions', 'specialCatRecentPosts', ownProps.tag])
//     // items: selectSpecialCatRecentPosts(ownProps.tag),
//     items: typeof state.getIn(['global', 'dynamicRegions', 'specialCatRecentPosts']).toJS === 'function' ? state.getIn(['global', 'dynamicRegions', 'specialCatRecentPosts']).toJS()[ownProps.tag] : state.getIn(['global', 'dynamicRegions', 'specialCatRecentPosts'])[ownProps.tag],
//     // items: typeof state.getIn(['global', 'dynamicRegions', 'specialCatRecentPosts']).toJS === 'function' ? state.getIn(['global', 'dynamicRegions', 'specialCatRecentPosts', ownProps.tag]).toJS() : state.getIn(['global', 'dynamicRegions', 'specialCatRecentPosts', ownProps.tag]);
//   }
//
//
// };

const mapStateToProps = createStructuredSelector({
  specialCategories: selectSpecialCategories(),
});

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    triggerSpecialCatRecentPosts: (tag) => {
      // console.log(`triggerSpecialCatRecentPosts(${tag})`);
      // // console.log(this.props);
      // if (typeof ownProps.items !== 'object' || ownProps.items.length === 0) {// only trigger this sequence, if it hasn't already been done before!
      dispatch(getSpecialRecentPostsForTag(tag));
      //}
      //dispatch(getSpecialRecentPostsForTag(tag));
    },
    dispatch,
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(SpecialCatRecentPosts);
