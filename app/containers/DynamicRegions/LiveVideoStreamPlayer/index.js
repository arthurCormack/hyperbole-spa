/*
 *
 * RecentEvents
 *
 */

import React from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { selectVideoStreamData } from './selectors';
import { Link } from 'react-router-dom';
import { Row, Col } from 'react-bootstrap';
import Img from 'components/Img';

import cx from 'classnames';
// import localStyles from './styles.css';
// import styles from 'containers/App/styles.css';
import localStyles from './styles.css'; // .liveStreamFullHeight, .liveStreamSidebarHeight

import img8 from 'containers/App/default.jpg';
// import { selectRecentEvents } from 'containers/App/selectors';

export class LiveVideoStreamPlayer extends React.Component { // eslint-disable-line react/prefer-stateless-function

  constructor() {
    super();
    this.getVideoStreamStuff.bind(this);
  }
  componentWillMount() {


  }
  componentDidMount() {
    // the component could dispatch an action, that would trigger a saga, and pass props data via the action
  }


  getVideoStreamStuff() {
    if (this.props.videoStreamData === null || this.props.videoStreamData.situation !== 'active' ) {
      return null;
    }
    const startTime = this.props.videoStreamData.startTime;
    const endTime = this.props.videoStreamData.startTime;
    const embedCode = this.props.videoStreamData.embedcode;
    const videoTitle = this.props.videoStreamData.title;
    const videoDescription = this.props.videoStreamData.description;
    const videoLinkText = this.props.videoStreamData.linktext;
    const videoLinkURL = this.props.videoStreamData.linkurl;
    const defaultHeadering = cx('headingLink');
    const bigDimensions = cx('full', localStyles.liveStreamFullHeight);
    const sideBarDimensions = cx('full', localStyles.liveStreamSidebarHeight);

    if (!this.props.sidebar) {
      return (
        <div>
          <div className={bigDimensions} dangerouslySetInnerHTML={{ __html: embedCode }} ></div>
          <Link to={videoLinkURL} className={defaultHeadering}>
            <h1 className="bigConcertTitle">{videoTitle}</h1>
          </Link>
          <div>
            {videoDescription}
          </div>
          <Link to={videoLinkURL} className={defaultHeadering}>
            {videoLinkText}
          </Link>
        </div>
      );
    } else {
      return (
        <div>
          <div className={sideBarDimensions} dangerouslySetInnerHTML={{ __html: embedCode }} ></div>
          {/* <Link to={videoLinkURL} className={defaultHeadering}>
            <h3 className="">{videoTitle}</h3>
          </Link> */}
          {/* <div>
            {videoDescription}
          </div>
          <Link to={videoLinkURL} className={defaultHeadering}>
            {videoLinkText}
          </Link> */}
        </div>
      );
    }

  }
  render() {
    // let recentEventsContent = null;
    const wrapContainer = cx('full', 'margTop');
    const defaultHeadingsBody = cx('defaultHeading', 'noMarg');
    const someVideoStreamStuff = this.getVideoStreamStuff();// null or something
    return someVideoStreamStuff;
  }
}

LiveVideoStreamPlayer.propTypes = {
  videoStreamData: React.PropTypes.oneOfType([React.PropTypes.object]),
}

LiveVideoStreamPlayer.defaultProps = {
  videoStreamData: null,
}

const mapStateToProps = createStructuredSelector({
  videoStreamData: selectVideoStreamData(),
});


function mapDispatchToProps(dispatch) {
  return {
    dispatch,
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(LiveVideoStreamPlayer);
