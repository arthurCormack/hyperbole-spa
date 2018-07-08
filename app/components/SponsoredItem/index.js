/**
*
* SponsoredItem
*
*/

import React from 'react';
import styled from 'styled-components';
import {Row, Col, Image} from 'react-bootstrap';
import {Link} from 'react-router';
import SponsoredImage from './images/postThumb14.jpg';

class SponsoredItem extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function
  render() {
    const SponsoredItemLink = styled(Link)`
      float: left;
      width: 100%;
      &:hover {
        cursor: pointer;
      }
      h3 {
        margin: 10px 0;
        font-size: 1.4em;
        color: #000;
      }
    `;

if (this.props.free) {
  return (
    <SponsoredItemLink to="">
      <Image src={SponsoredImage} className="full" />
      <h3 className="full">Game-Changing Products Invented in Canada</h3>
    </SponsoredItemLink>
  );
} else {
  return (
    <Col sm={4}>
      <SponsoredItemLink to="">
        <Image src={SponsoredImage} className="full" />
        <h3 className="full">Game-Changing Products Invented in Canada</h3>
      </SponsoredItemLink>
    </Col>
  );
}

  }
}

SponsoredItem.propTypes = {

};

export default SponsoredItem;
