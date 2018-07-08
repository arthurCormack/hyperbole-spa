import styled from 'styled-components';
import { Grid, Col, Row } from 'react-bootstrap';
import { Link } from 'react-router-dom';

import { media } from 'style-utils';

export const MargedDiv = styled.div`
  margin: 125px 0;
  ${media.extrasmall`
    margin: 0 0 125px 0;
  `}
`;

export const ZMGrid = styled(Grid)`
  ${media.small`
    padding-right: 0 !important;
    padding-left: 0 !important;
  `}
`;

export const WhiteCol = styled(Col)`
  background: #fff;
  padding: 50px;
  ${media.extrasmall`
    background: none;
    padding: 0;
  `}
`;
export const WhiteRow = styled(Row)`
  background: #fff;
  padding: 0 40px 20px 40px;
  ${media.small`
      padding: 0 20px 20px 20px;
  `}
`;

export const RedTagLgLink = styled(Link)`
  color: #000;
  font-family: 'Roboto Condensed', sans-serif;
  text-transform: uppercase;
  text-align: left;
  font-size: 1.1em;
  position: relative;
  margin-bottom: 0 !important;
  top: 10px;
  display: inline;
  border-bottom: 2px solid #d02d2f;
  margin-bottom: -1px;
  &:hover {
    cursor: pointer;
    color: #d02d2f;
    text-decoration: none;
  }
`;


export const HeroWrapper = styled.div`
  position: relative;
`;



export const ArticleCol = styled(Col)`
  p {
    font-size: 1.4em;
    line-height: 145%;
    background: #fff;
    ${'' /* padding: 0 40px 20px 40px; */}
  }
  ul, ol, li {
    font-size: 1.1em;
  }
`;

export const ContentRow = styled(Row)`
  float: left;
  width: 100%;
  ${media.small`
      float:none;
      width: auto;
    `}
`;

export const AbsoluteRow = styled(Row)`
  position: absolute;
  bottom: 0;
  z-index: 9;
  ${media.medium`
    background: #fff;
  `}
  ${media.small`
    position: relative;
    margin: 0 -30px;
  `}
`;

export const ArticleTitleCol = styled(Col)`
  background: #fff;
  min-width: 720px;
  padding-top: 10px;
  /*float: left;*/
  /*width: 100%;*/
  /*position: relative;*/
  ${media.small`
    min-width: 100%;
  `}
  h1 {
    font-size: 3em;
    padding: 0 20px;
  }
`;

// const ArticleInfo = styled.div`
// `;
export const ArticleInfo = styled.div`
    ${'' /* margin: 9px 23px 10px; */}
        margin-left: -15px;
    font-family: 'Helvetica', sans-serif;
    -webkit-text-transform: uppercase;
    text-transform: uppercase;
    font-size: 0.9em;
`;


export const Separator = styled.div`
  width: 100%;
  height: 1px;
  display: block;
  background: #e6e6e6;
  margin: 40px 0;
  float: left;
`;

export const DefaultH1 = styled.h1`
  text-align: center;
`;


 export default MargedDiv;
