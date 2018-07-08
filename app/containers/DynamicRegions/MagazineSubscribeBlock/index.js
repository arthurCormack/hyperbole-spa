/**
 *
 * MagazineSubscribeBlock
 *
 * This component is displays some data about the current magazine subscription
 * It is a container, because it will call the api? but should it do the calling?
 * once we start making calls to the API, then a lot of new questions get raised.
 * we make the API, but we make the API agains a content data model. ON the existing content Data model?
 * to start building out the API, what assumptions do we have to make>
 * well ... the way that we have been dealing with the magazine subscription, traditionally, is retarded.
 * let's do it better. Fields on the Home page, is the cleanest way to deal with it. And then the API pulls from that.
 * so ... make the fields (issue title, image, and blurb and CTA).
 * we are going to render that whole section that can be placed - probably in the footer, or wherever we want to place it.
 *
 */


import React from 'react';
import { connect } from 'react-redux';

import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { createStructuredSelector } from 'reselect';

// import Img from 'components/Img';

import { Grid, Row, Col, Clearfix, Image, Fade } from 'react-bootstrap';
import LazyImage from 'components/LazyImage';


import GoldieCover from './GoldieCover.jpg';
export class MagazineSubscribeBlock extends React.Component { // eslint-disable-line react/prefer-stateless-function
  componentWillMount() {

  }
  componentDidMount() {

  }

  render() {
    return (
      <section id="big-footer-feature" className="big-footer-feature cf">
        {/* <div className="footer-feature-image fadein inview">
          <Link to="/subscribe">
            <Img src={GoldieCover} alt="Zoomer Magazine Cover Art" />
          </Link>
        </div>
        <div className="footer-feature-textwrap">
          <h3 className="footer-feature-title">Get Zoomer Magazine</h3>
          <p className="text-big">You like what you are reading and want moredelivered to your door?</p>
          <p className="text-small">Subscriptions start as low as $19.99. Subscribe for two years for $39.99, and get a Carp membership!</p>
          <a className="footer-feature-btn" href="http://www.everythingzoomer.com/subscribe/">Subscribe to Zoomer Magazine</a>
        </div> */}
        <Grid>
          <Row>
            <Col md={4} mdOffset={0} sm={6} smOffset={0} lg={4} className="fadein">
              <Link to="/subscribe">
                <LazyImage height={500} responsive className="" src={GoldieCover} alt="Zoomer Magazine Cover Art" />
              </Link>
            </Col>
            <Col md={8} mdOffset={0} sm={6} smOffset={0}>
              <h3 className="footer-feature-title">Get Zoomer Magazine</h3>
              <p className="text-big">You like what you are reading, and want more, delivered to your door?</p>
              <p className="text-small">Subscriptions start as low as $19.99. Subscribe for two years for $39.99, and get a Carp membership!</p>
              <a className="footer-feature-btn" href="http://www.everythingzoomer.com/subscribe/">Subscribe to Zoomer Magazine</a>
            </Col>
          </Row>
        </Grid>
      </section>
    );
  }
}

MagazineSubscribeBlock.propTypes = {
  // upcomingEvents: React.PropTypes.oneOfType([React.PropTypes.array, React.PropTypes.object]),
  // numItems: React.PropTypes.number,
  issueTitle: React.PropTypes.string,
  excerpt: React.PropTypes.string,
  coverArt: React.PropTypes.string,
  callToAction: React.PropTypes.string,
}


MagazineSubscribeBlock.defaultProps = {
  issueTitle: 'Zoomer Magazine',
  excerpt: '',
  coverArt: '',
  callToAction: 'Subscribe',
};

const mapStateToProps = createStructuredSelector({
  // upcomingEvents: selectUpcomingEvents(),
});


function mapDispatchToProps(dispatch) {
  return {
    dispatch,
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(MagazineSubscribeBlock);
