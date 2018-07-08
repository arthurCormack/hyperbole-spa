import styled from 'styled-components';
import { Grid, Col, Row, Image } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { media } from 'style-utils';

export const PostTeaser = styled.div`
   float: left;
   width: 100%;
   margin-bottom: 25px;
   ${'' /* ${media.large`
     width: 100%;
   `} */}
   h3 {
     margin: 10px 0;
     color: #000;
   }
   ${media.small`
     float:left;
     width: 100%;
     margin-bottom:45px;
   `}
 `;

export const RedTagLink = styled(Link)`
   color: #d02d2f;
   font-family: 'Roboto Condensed', sans-serif;
   text-transform: uppercase;
   font-size: 13pt;
   display: block;
   ${media.medium`
     text-align: center;
     width: 100%;
   `}
   &:hover {
     cursor: pointer;
     color: #d02d2f;
     text-decoration: none;
   }
 `;

export const PostTeaserCat = styled.div`
   float: left;
   width: 100%;
   margin-bottom: 20px;
   ${media.medium`
     width: 210px;
     margin: 40px 57px;
   `}
   ${media.small`
     width: 100%;
     margin: 0 0 45px 0;
   `}
 `;

export const PostTeaserLinkLeft = styled(Link)`
   float: left;
   ${media.medium`
     display: block;
     margin: 0 auto 15px auto;
   `}
   img {
     ${media.medium`
       display: block;
       margin: 0 auto;
       float: none;
     `}
   }
 `;
export const PostTeaserRight = styled.div`
   float: left;
   width: 130px;
   ${media.medium`
     width: 100%;
     text-align: center;
   `}
   a {
     padding-left: 15px;
     float: left;
     ${media.medium`
       display: block;
       text-align: center;
       float: left;
       width: 100%;
     `}
     h3 {
       margin: 0;
       font-size: 16pt;
       color: #000;
       ${media.medium`
         text-align: center;
       `}
     }
   }
 `;

export const BigTeaserLink = styled(Link)`
   float: left;
   width: 100%;
   display: block;
   h3 {
     ${media.medium`
       text-align: center;
     `}
   }
 `;

export const AuthorLink = styled(Link)`
  color: #000;
  &:hover {
    cursor: pointer;
    color: #000;

  }
`;

// { PostTeaser, PostTeaserH3, RedTagSm }
// export const PostTeaser = styled.div`
//    margin: 10px 0;
//    color: #000;
//    float:left;
//    width: 100%;
//  `;


export const PostTeaserH3 = styled.h3`
   margin: 10px 0;
   color: #000;
   float: left;
   width: 100%;
   ${media.small`
     text-align:center;
   `}
   &:hover {
     cursor: pointer;
   }
 `;

 export const AbsoluteRow946 = styled(Row)`
   min-height: 946px;
   position: absolute;
 `;

export const PostTeaserH3Center = styled.h3`
    margin: 10px 0 40px 0 !important;
   color: #000;
   float: left;
   text-align: center;
   width: 100%;
   ${media.small`
     text-align:center;
   `}
   &:hover {
     cursor: pointer;
   }
 `;
export const RedTagSm = styled(Link)`
   color: #d02d2f;
   font-family: 'Roboto Condensed', sans-serif;
   text-transform: uppercase;
   font-size: 1em;
   display: block;
   ${media.small`
     text-align:center;
   `}
   ${media.extrasmall`
     margin-bottom: 0px;
     float: left;
     width: 100%;
   `}
   &:hover {
     cursor: pointer;
     color: #d02d2f;
     text-decoration: none;
   }
 `;
 export const RedTagSmOnTop = styled(Link)`
 color: #d02d2f;
 font-family: 'Roboto Condensed', sans-serif;
 -webkit-text-transform: uppercase;
 -webkit-text-transform: uppercase;
 text-transform: uppercase;
 font-size: 1.1em;
 display: block;
margin: 7px 0 -9px;
 font-weight: bold;
 float: left;
   ${media.small`
     text-align:center;
     width: 100%;
   `}
   ${media.extrasmall`
     margin-bottom: 0px;
     float: left;
     width: 100%;
   `}
   &:hover {
     cursor: pointer;
     color: #d02d2f;
     text-decoration: none;
   }

 `;


 /*INSET*/
//  export const MargedDiv = styled.div`
//   margin: 95px 0;
//   ${media.extrasmall`
//     margin: 0 0 95px 0;
//   `}
// `;
//
// export const WhiteCol = styled(Col)`
//   background: #fff;
//   padding: 50px;
//   ${media.extrasmall`
//     background: none;
//     padding: 0;
//   `}
// `;

export const FullImage = styled(Image)`
  float: left;
  width: 100%;
`;

export const FullPostCornerDiv = styled.div`
  position: relative;
  ${'' /* z-index: 9; */}
  &:hover {
    cursor: pointer;
  }
`;

export const WhiteBox = styled.div`
  position: absolute;
  background: #fff;
  width: 240px;
  left: 40px;
  top: 40px;
  padding: 15px 20px 10px;
  h3 {
    margin: 5px 0;
    color: #000;
    float: left;
    width: 100%;
    font-size: 1.7em;
  }
`;

export const FirstFeatH3Title = styled.h3`
  text-align: center;
  float: left;
  width: 100%;
  color: #000;
`;



/*DEFAULT PAGE*/

export const ZMGrid = styled(Grid)`
  ${media.small`
    padding-right: 0 !important;
    padding-left: 0 !important;
  `}
`;
export const WhiteGrid = styled(Grid)`
  background: white;
  padding-top: 45px;
  ${media.small`
    background: red;
  `}
`;

export const MargedDivOnlySmall = styled.div`
  margin: 0;
  ${media.medium`
    margin: 45px 0;
  `}
`;

export const MargedDivSm = styled.div`
  margin: 45px 0;
`;

export const WhiteRow = styled(Row)`
  background: #fff;
  padding: 50px;
`;

export const ArticleCol = styled(Col)`
  p {
    font-size: 1.4em;
    line-height: 145%;
    ${'' /* background: #fff; */}
    ${'' /* padding: 0 40px 20px 40px; */}
  }
  ul, ol, li {
    font-size: 1.1em;
  }

  h1 {
    margin-top: 0;
    font-size: 3.5em;
  }

`;

export const ContentRow = styled(Row)`
  float: left;
  width: 100%;
`;

export const FourOhFourRow = styled(Row)`
  float: left;
  width: 100%;
`;
export const BigH1 = styled(Row)`
  font-size: 6em;
  font-family: 'Roboto Condensed', sans-serif;
  text-align: center;
`;
export const BigH3 = styled(Row)`
  font-size: 2em;
  margin: 0;
  padding: 0;
  text-align: center;
`;

export const Spacer = styled.div`
  width: 100%;
  height: 75px;
  display: block;
  float: left;
`;

export const CenteredH1 = styled.h1`
    font-size: 4em;
    text-align: center;
`;
export const CenteredH2MargBot = styled.h2`
    font-size: 4em;
    text-align: center;
    margin-bottom: 25px !important;
`;

export default PostTeaser;
