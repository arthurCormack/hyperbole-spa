import styled from 'styled-components';
// import { Grid, Col, Row, Image } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { media } from 'style-utils';

export const HotTopic = styled.div`
  ${media.small`
    float: left;
    width: 50%;
  `}
  ${media.small`
    float: left;
    width: 100%;
  `}
`;

export const ZoomHoverLink = styled(Link)`
  height: 215px;
  width: 215px;
  overflow: hidden;
  display: block;
  /*${media.large`
    margin: 0 auto;
  `}*/
  ${media.extrasmall`
    height: 100%;
    width: 100%;
  `}
  &:hover {
    cursor: pointer !important;
  }
  img {
    height: 215px;
    width: 215px;
    -webkit-transition: all 2s ease;
    -moz-transition: all 2s ease;
    -ms-transition: all 2s ease;
    transition: all 2s ease;
    cursor: pointer !important;
    ${media.extrasmall`
      height: 100% !important;
      width: 100% !important;
    `}
    &:hover {
      height: 240px;
      width: 240px;
      ${media.extrasmall`
        height: 100%;
        width: 100%;
      `}
    }
  }
`;

export const HotTopicH4 = styled.h4`
        text-align: center;
        margin: 10px 0 25px 0;
        float: left;
        width: 100%;
        font-size: 1.5em;
        color: #000;
        ${media.extrasmall`
          font-size: 1.6em;
          padding-bottom: 20px;
        `}
        &:hover {
          cursor: pointer;
        }
`;

export default HotTopic;
