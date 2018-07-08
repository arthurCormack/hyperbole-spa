/**
*
* TrendingColumn
*
*/

import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { media } from 'style-utils';

class TrendingBox extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function
  render() {
    const TrendingItem = styled(Link)`
      float: left;
      width: 100%;
      padding: 0 20px 0px;
      height: 100px;
      ${media.large`
          width: 160px;
          padding: 0;
      `}
      ${media.medium`
          padding: 0px 0 0 26%;
          width: 100%;
      `}
      ${media.small`
        padding: 20px;
        float: none;
        width: 65%;
        margin: 0 auto;
        display: block;
      `}
      ${media.small`
          height: 150px;
      `}
      h3 {
        color: #000;
        transition: 0.2s all;
        &:hover {
            color: #d02d2f;
        }
      }
      &:hover, &:active, &:focus {
        text-decoration: none;
      }
    `;

    const TrendingNum = styled.p`
      font-family: 'Vidaloka', serif;
      font-size: 72pt;
      color: #000;
      float: left;
      width: 70px;
      display: inline;
      font-weight: semi-bold;
      position: relative;
      top: -30px;
      ${media.large`
        font-family: 'Vidaloka', serif;
        font-size: 52pt;
        color: #000;
        float: left;
        width: 43px;
        display: inline;
        font-weight: semi-bold;
        position: relative;
        top: -20px;
      `}
    `;

    const TrendingTitle = styled.h3`
      font-family: 'Roboto Condensed', sans-serif;
      font-size: 15pt;
      font-weight: 200;
      margin: 10px 0 0 2px;
      position: relative;
      top: -7px;
      ${media.large`
        font-size: 13pt;
      `}
    `;

    return (
      <div className="full">
        <TrendingItem to={this.props.post_url}>
          <TrendingNum className={`${'trend' +this.props.theNum}`}>{this.props.theNum}</TrendingNum>
          <TrendingTitle>{this.props.post_title}</TrendingTitle>
        </TrendingItem>
      </div>
    );
  }
}

TrendingBox.propTypes = {

};

TrendingBox.defaultProps = {
  theNum: 1,
  post_title: 'blah',
};

export default TrendingBox;
