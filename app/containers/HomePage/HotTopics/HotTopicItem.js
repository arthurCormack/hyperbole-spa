/**
*
* HotTopicItem
*
*/

import React from 'react';
import styled from 'styled-components';
import { Col, Image } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import VideosImg from './images/videos.jpg';
import { media } from 'style-utils';
import { HotTopic, ZoomHoverLink, HotTopicH4 } from 'components/styled/HotTopics';

class HotTopicItem extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function
  render() {

    return (
      <Col md={4} sm={4} xs={12}>
        <HotTopic>
          <Link to={this.props.tag_permalink} className="centeredMarginFull">
            <Image src={this.props.tag_thumb} className="full" />
          </Link>
          <Link to={this.props.tag_permalink}>
            <HotTopicH4>{this.props.tag_name}</HotTopicH4>
          </Link>
        </HotTopic>
      </Col>
    );
  }
}

HotTopicItem.propTypes = {

};

export default HotTopicItem;
