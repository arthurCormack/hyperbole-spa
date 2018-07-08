/*
 *
 * RecentEvents
 *
 */

import React from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import selectUpcomingEvents from './selectors';
import { Link } from 'react-router-dom';
import { Row, Col } from 'react-bootstrap';
import Img from 'components/Img';

import cx from 'classnames';
import localStyles from './styles.css';
// import styles from 'containers/App/styles.css';
import img8 from 'containers/App/dummy/8.jpg';
// import { selectRecentEvents } from 'containers/App/selectors';

export class UpcomingEvents extends React.Component { // eslint-disable-line react/prefer-stateless-function
  componentWillMount() {


  }
  componentDidMount() {
    // the component could dispatch an action, that would trigger a saga, and pass props data via the action
  }

  displayUpcomingEvents() {
    // // console.log('displayRecentEvents()');
    // // console.log(this.props);
    if (typeof this.props.upcomingEvents !== 'object' || this.props.upcomingEvents === null || typeof this.props.upcomingEvents.resultSet !== 'object' ) {
      return null;
    }
    const portionOfUpcomingEvents = this.props.upcomingEvents.resultSet.slice(1, this.props.numItems + 1);
    return portionOfUpcomingEvents.map((event) => {

      let eventThumb = img8;
      //let eventThumb = event.thumbnails[0].thumbnail[0];
      if (typeof event.thumbnails !== 'undefined' && event.thumbnails.length > 0) {
        eventThumb = event.thumbnails[0].large[0];
      }
      return (
        <Col
          sm={4}
          xs={12}
          className="singleUpcomingEvent"
          key={event.post_title}
        >
          <Link to={event.permalink}><Img src={eventThumb} className="full" alt="" />
            <p className="singleEventDate">{event.event_start}</p>
          </Link>
          <div className="singleUpcomingEvent">
            <Link to={event.permalink} className="headingLink">
              <h4 dangerouslySetInnerHTML={{ __html: event.post_title }} ></h4>
            </Link>
          </div>
        </Col>
      );
    });
  }
  render() {
    // let recentEventsContent = null;
    const wrapContainer = cx('full', 'margTop');
    const defaultHeadingsBody = cx('defaultHeading');
    return (
      <section>
        <div className={defaultHeadingsBody}>
          <Link to="/events"><h2>Upcoming Events</h2></Link>
        </div>
        <Row>
          {this.displayUpcomingEvents()}
        </Row>
      </section>
    );
  }
}

/*UpcomingEvents.propTypes = {
  upcomingEvents: React.PropTypes.oneOfType([React.PropTypes.array, React.PropTypes.object]),
  numItems: React.PropTypes.number,
}*/

UpcomingEvents.defaultProps = {
  upcomingEvents: [],
  numItems:3,
}

const mapStateToProps = createStructuredSelector({
  upcomingEvents: selectUpcomingEvents(),
});


function mapDispatchToProps(dispatch) {
  return {
    dispatch,
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(UpcomingEvents);
