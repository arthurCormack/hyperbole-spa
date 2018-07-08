/*
 *
 * HoroscopesPage
 *
 */

import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import Helmet from 'react-helmet';
import { createStructuredSelector } from 'reselect';
import { makeSelectHoroscopes, makeSelectHoroscopesDate, makeSelectHoroscopesTitle, makeSelectHoroscopesLink } from './selectors';
import { Row, Col, Grid, Image } from 'react-bootstrap';
import HeaderMasthead from 'components/HeaderMasthead';
import { RedTagLgLink, MargedDiv, WhiteCol, HeroWrapper, WhiteRow, ArticleCol, ContentRow, AbsoluteRow, ArticleTitleCol, ArticleInfo, Separator, DefaultH1 } from 'components/styled/GridStyles';
// import Horoscopes from 'containers/DynamicRegions/Horoscopes';
import { media } from 'style-utils';
import TodaysDate from 'components/TodaysDate';
import he from 'he';
// import BigBox from 'components/BigBox';
import AffixedSidebar from 'containers/AffixedSidebar';

import styled from 'styled-components';

import Aries from './images/aries.png';
import Taurus from './images/taurus.png';
import Gemini from './images/gemini.png';
import Cancer from './images/cancer.png';
import Leo from './images/leo.png';
import Virgo from './images/virgo.png';
import Libra from './images/libra.png';
import Sagittarius from './images/sagittarius.png';
import Capricorn from './images/capricorn.png';
import Aquarius from './images/aquarius.png';
import Pisces from './images/pisces.png';
import Scorpio from './images/scorpio.png';

export class HoroscopesPage extends React.Component { // eslint-disable-line react/prefer-stateless-function
  /*
  Is this a content api call ? does it include its own ads? does it load any content? perhaps from a specific horoscope page, where ad tags can be set at that level?
  Yes, let's do it properly then. We'll make a special API endpoint, or at least consider it a page load API call ...
  Should we consider a seperate API call to retrieve general ad tags, not dependant on a content API call, so that ads would be present, even on pages that didn't have a corresponding presence in the content authority?
  ok. how about this then.
  use the route container for the api call. and have it get the ads when it gets the horoscopes data. A single route's data all at once. Makes sense. striaghtforward.

  */


  render() {

    const AstroP = styled.p`
      float: left;
      width: 100%;
      padding-top: 65px;
      font-size: 1.2em !important;
      a {
        color: #636363;
      }
      a:hover {
        color: #636363;
        cursor: pointer;
      }
    `;

    let horoscopeStuff = null;

    if (this.props.horoscopes !== null) {
      horoscopeStuff = this.props.horoscopes.map((item, i) => {
          //string.charAt(0).toUpperCase() + string.slice(1);
        const signTitle = item.sign.charAt(0).toUpperCase() + item.sign.slice(1);
        const horoscopeDesc = item.horoscope;
        let HoroscopeSymbol = <Image src={Aries} />;
        if (item.sign !== null) {

          if (item.sign === "aries") {
            HoroscopeSymbol = (<Image src={Aries} />);
          } else if (item.sign === "taurus") {
            HoroscopeSymbol = (<Image src={Taurus} />);
          } else if (item.sign === "gemini") {
            HoroscopeSymbol = (<Image src={Gemini} />);
          } else if (item.sign === "cancer") {
            HoroscopeSymbol = (<Image src={Cancer} />);
          } else if (item.sign === "leo") {
            HoroscopeSymbol = (<Image src={Leo} />);
          } else if (item.sign === "virgo") {
            HoroscopeSymbol = (<Image src={Virgo} />);
          } else if (item.sign === "libra") {
            HoroscopeSymbol = (<Image src={Libra} />);
          } else if (item.sign === "sagittarius") {
            HoroscopeSymbol = (<Image src={Sagittarius} />);
          } else if (item.sign === "capricorn") {
            HoroscopeSymbol = (<Image src={Capricorn} />);
          } else if (item.sign === "aquarius") {
            HoroscopeSymbol = (<Image src={Aquarius} />);
          } else if (item.sign === "pisces") {
            HoroscopeSymbol = (<Image src={Pisces} />);
          } else if (item.sign === "scorpio") {
            HoroscopeSymbol = (<Image src={Scorpio} />);
          } else {
            HoroscopeSymbol = (<Image src={Scorpio} />);
          }

        }

        return (
          <Row>
            <Col md={3}>
              {HoroscopeSymbol}
            </Col>
            <Col md={9}>
              <h2>{signTitle}</h2>
              <p>{horoscopeDesc}</p>
            </Col>
          </Row>
        );
      });
    }

    const ZMGrid = styled(Grid)`
      ${media.small`
        padding-right: 0 !important;
        padding-left: 0 !important;
      `}
    `;

    const MargedDivSm = styled.div`
      margin: 45px 0;
    `;

    const Spacer = styled.div`
      width: 100%;
      height: 75px;
      display: block;
      float: left;
    `;

    const HoroscopesH1 = styled.div`
      text-align: left;
      font-size: 3em;
    `;

    return (

      <div>

        <ZMGrid fluid>

        <Helmet
          title="Daily Horoscopes"
          meta={[
            { name: 'description', content: 'Daily Horoscopes' },
          ]}
        />

        <HeaderMasthead version='mini'/>

          <MargedDivSm>
            <Grid>
              <Row>

                <Col md={12}>
                  <WhiteRow>
                    <ArticleCol md={8}>

                      <ContentRow className="postContent">
                        <Col md={12}>
                          <h1>Daily Horoscopes</h1>
                          <h4><TodaysDate /></h4>
                          <div className="thickUnderline"></div>
                        </Col>
                        <Col md={12}>
                          {horoscopeStuff}
                           <AstroP><a href="http://www.astrostyle.com/The_AstroTwins/index.htm" target="_blank">HOROSCOPES PROVIDED BY THE ASTROTWINS</a></AstroP>
                        </Col>
                      </ContentRow>

                    </ArticleCol>
                    <ArticleCol md={4}>
                      <Row>
                        <Spacer />
                        <AffixedSidebar index={0} active fixed key={`bigbox`}/>
                      </Row>
                    </ArticleCol>
                  </WhiteRow>
                </Col>

                </Row>
            </Grid>
          </MargedDivSm>

       </ZMGrid>
      </div>
    );
  }
}

HoroscopesPage.propTypes = {
  dispatch: PropTypes.func.isRequired,
};

const mapStateToProps = createStructuredSelector({
  horoscopes: makeSelectHoroscopes(),
  date: makeSelectHoroscopesDate(),
  title: makeSelectHoroscopesTitle(),
  link: makeSelectHoroscopesLink(),
});

function mapDispatchToProps(dispatch) {
  return {
    dispatch,
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(HoroscopesPage);
