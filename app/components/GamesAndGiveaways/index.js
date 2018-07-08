/**
*
* GamesAndGiveaways
*
*/

import React from 'react';
import styled from 'styled-components';
import { Col, Image } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import Contests from './images/dailycontests.jpg';
import Crossword from './images/dailycrossword.jpg';
import Horoscopes from './images/dailyhoroscopes.jpg';

class GamesAndGiveaways extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function
  render() {
    const GamesDiv = styled.div`
      border: 2px solid #000;
      float: left;
      width: 100%;
      padding: 25px 10px;
      margin-bottom: 20px;
      margin-top: 10px;
      h3 {
        margin: 0;
        font-family: 'Abril Fatface', cursive;
        text-align: center;
        font-size: 18pt;
      }
      p {
        font-family: 'Roboto Condensed', sans-serif;
        line-height: 16px;
      }
      a {
        color: #000;
        text-decoration: none;
      }
    `;

    const Underline = styled.div`
      height: 0.1em;
      width: 100%;
      margin: 8px auto 15px;
      background: #000;
    `;

    const UnderlineLite = styled.div`
      height: 0.1em;
      width: 100%;
      margin: 8px auto 15px;
      background: #e6e6e6;
      float: left;
      width: 100%;
    `;

    const DailyHoroscopesImage = styled(Image)`
      float: left;
      width: 120px;
      padding-right: 9px;
    `;
    const DailyContestsImage = styled(Image)`
      float: right;
      width: 140px;
      padding-right: 9px;
    `;

    const LeftP = styled.p`
      float: left;
      width: 95px;
    `;

    return (
      <Col md={4} sm={6}>
        <GamesDiv>
            <div className="full">
                <h3>Games &amp; Giveaways</h3>
                <Underline />
            </div>
            <Link to="/" className="full padBotSm">
                <DailyHoroscopesImage src={Horoscopes} />
                <p>Wondering what's in your future? Check out our daily horoscopes to find out.</p>
            </Link>
            <UnderlineLite />
            <Link to="/" className="full padBotMd">
                <LeftP>Be the first to sign up for our amazing contests.</LeftP>
                <DailyContestsImage src={Contests} />
            </Link>
            <Link to="/" className="full">
                <img src={Crossword} className="full" />
            </Link>
        </GamesDiv>
      </Col>
    );
  }
}

GamesAndGiveaways.propTypes = {

};

export default GamesAndGiveaways;
