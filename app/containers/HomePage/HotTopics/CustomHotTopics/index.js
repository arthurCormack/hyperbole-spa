/*
 *
 * CustomHotTopics
 *
 */

import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';
import { Grid, Row, Col, Image } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { media } from 'style-utils';
import { clone, isEqual } from 'lodash';

import { HotTopic, ZoomHoverLink, HotTopicH4 } from 'components/styled/HotTopics';

export class CustomHotTopics extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function

  shouldComponentUpdate(nextProps) {
    if (!isEqual(nextProps.items, this.props.items)) {
      return true;
    }
    return false;
  }

  render() {

    let CustomTopics = this.props.items.map((item, i) => {
      return (
        <Col md={4} sm={4} xs={12} key={`featuredSingleBoxCol1_${i}`}>
          <HotTopic>
            <Link to={item.link} className="centeredMarginFull">
              <Image src={item.image.sizes.teaser_square} className="full" />
            </Link>
            <Link to={item.link}>
              <HotTopicH4>{item.title}</HotTopicH4>
            </Link>
          </HotTopic>
        </Col>
      );
    })

    return (
    <div>{CustomTopics}</div>
    );
  }
}


const mapStateToProps = (state) => {
  return {
    items: typeof state.getIn(['global', 'dynamicRegions', 'customHotTopics']).toJS === 'function' ? state.getIn(['global', 'dynamicRegions', 'customHotTopics']).toJS() : state.getIn(['global', 'dynamicRegions', 'customHotTopics']),
  };
};

const mapDispatchToProps = () => {
  return {};
};

// export default FeaturedFour;
export default connect(mapStateToProps, mapDispatchToProps)(CustomHotTopics);
