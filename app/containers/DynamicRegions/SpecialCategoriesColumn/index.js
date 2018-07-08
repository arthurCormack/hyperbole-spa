/*
 *
 * SpecialCategoriesColumn
 *
 */

import React from 'react';
import Helmet from 'react-helmet';
import { Link } from 'react-router-dom';
import { Tab, Row, Col, Nav, NavItem, Image } from 'react-bootstrap';
import SpecialCatRecentPosts from 'containers/DynamicRegions/SpecialCatRecentPosts';
// import ArtsEnt from './images/artsandent.png';
// import ZClubs from './images/zoomerclubs.png';
// import AgesAndIcons from './images/agesandicons.png';
import ZDaily from './images/zoomerdaily.png';
import PoliticsPolicy from './images/politics-policy.png';
import ArtsEnt from './images/artsandent.png';
import StarsRoyals from './images/stars-and-royals.png';
import SexLove from './images/sex-love.png';
// import ZPhil from './images/zphilosophy.png';
// import BookClub from './images/book-club-icon.png';
// import TravelClub from './images/travel-icon.png';
// import StarsRoyals from './images/stars-and-royals.png';
import styled from 'styled-components';

export class SpecialCategoriesColumn extends React.PureComponent {
  render() {

    const TagLink = styled(Link)`
      color: #000;
      font-family: 'Roboto Condensed', 'Crimson', serif;
      font-weight: 400;
      &:hover {
        color: #000;
        cursor: pointer;
        text-decoration: none;
      }
    `;

    const SmallTitle = styled.p`
      text-align: center;
      font-size: 0.67em;
      font-family: 'Roboto Condensed', 'Crimson', serif;
      font-weight: 400;
      text-transform: uppercase;
      color: #3b3b3b;
      margin: 3px 0 0 0;
    `;

    return (
      <Tab.Container id="left-tabs-example" defaultActiveKey="tag1">
        <Row className="clearfix">
          <Col sm={4}>
            <Nav bsStyle="tabs" stacked>
              <NavItem eventKey="tag1">
                <Image src={ZDaily} className="specialCatIcon"/>
                <SmallTitle>#ZoomerDaily</SmallTitle>
              </NavItem>
              <NavItem eventKey="tag2">
                <Image src={PoliticsPolicy} className="specialCatIcon"/>
                <SmallTitle>Politics &amp; Policy</SmallTitle>
              </NavItem>
              <NavItem eventKey="tag3">
                <Image src={ArtsEnt} className="specialCatIcon"/>
                <SmallTitle>Arts &amp; <span className="smallerWord">Entertainment</span></SmallTitle>
              </NavItem>
              <NavItem eventKey="tag4">
                <Image src={StarsRoyals} className="specialCatIcon"/>
                <SmallTitle>Stars &amp; Royals</SmallTitle>
              </NavItem>
              <NavItem eventKey="tag5">
                <Image src={SexLove} className="specialCatIcon"/>
                <SmallTitle>Sex &amp; Love</SmallTitle>
              </NavItem>
            </Nav>
          </Col>
          <Col sm={8} className="redVerticalLine">
            <Tab.Content animation>
              <Tab.Pane eventKey="tag1">
                <TagLink to="/tag/zoomer-daily"><h1>#ZoomerDaily</h1></TagLink>
                <SpecialCatRecentPosts tag="zoomer-daily"/>
              </Tab.Pane>
              <Tab.Pane eventKey="tag2">
                <TagLink to="/tag/politics-policy/"><h1>Politics &amp; Policy</h1></TagLink>
                <SpecialCatRecentPosts tag="politics-policy"/>
              </Tab.Pane>
              <Tab.Pane eventKey="tag3">
                <TagLink to="/tag/arts-and-entertainment"><h1>Arts &amp; Entertainment</h1></TagLink>
                <SpecialCatRecentPosts tag="arts-and-entertainment"/>
              </Tab.Pane>
              <Tab.Pane eventKey="tag4">
                <TagLink to="/tag/stars-and-royals"><h1>Stars &amp; Royals</h1></TagLink>
                <SpecialCatRecentPosts tag="stars-and-royals"/>
              </Tab.Pane>
              <Tab.Pane eventKey="tag5">
                <TagLink to="/tag/sex-love-relating"><h1>Sex &amp; Love</h1></TagLink>
                <SpecialCatRecentPosts tag="sex-love-relating"/>
              </Tab.Pane>
            </Tab.Content>
          </Col>
        </Row>
      </Tab.Container>

    );
  }

}

SpecialCategoriesColumn.propTypes = {

};

export default SpecialCategoriesColumn;
