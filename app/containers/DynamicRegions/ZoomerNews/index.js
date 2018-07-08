/*
 *
 * RecentEvents
 *
 */

import React from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import selectZoomerNews from './selectors';
// import { selectRecentEvents } from 'containers/App/selectors';

import { Link } from 'react-router-dom';
import { Row, Col, Clearfix } from 'react-bootstrap';
import Img from 'components/Img';

import cx from 'classnames';
// import localStyles from './styles.css';
// import styles from 'containers/App/styles.css';
import img8 from 'containers/App/dummy/8.jpg';

export class ZoomerNews extends React.Component { // eslint-disable-line react/prefer-stateless-function

  constructor() {
    // // console.log('PageWrapper.constructor');
    super();
    this.displayZoomerNews = this.displayZoomerNews.bind(this);
    this.zmShorten = this.zmShorten.bind(this);
  }

  componentWillMount() {


  }
  componentDidMount() {
    // the component could dispatch an action, that would trigger a saga, and pass props data via the action
  }

  zmShorten(zmTitle){
    let lastSpace = null;
    let trimmedText = zmTitle;

    if (zmTitle.length > 50){

          lastSpace = zmTitle.indexOf( zmTitle.substr(50), ' ');
      // Trim
          trimmedText =  zmTitle.substr(0, lastSpace) + '...';
    }
    return (<span>{trimmedText}</span>);
  }

  displayZoomerNews(whichItems, limit, clearFixBreakPoint) {

    // // console.log('displayZoomerNews()');

    if (typeof whichItems !== 'object' || whichItems === null ) {
      return;
    }

    const someItems = whichItems.slice(0,limit);
    const wrapContainer = cx('full', 'margTop');
    let newsItems = someItems.map((newsItem, index) => {
      return (
        <Col
          md={6} xs={12} className="singleNewsPiece"
          key={`${newsItem.post_title}_${index}`}
        >
          <div className="singleNewsPieceSide">
            <Link to={newsItem.permalink} className="headingLink">
              {this.zmShorten(newsItem.post_title)}
            </Link>
          </div>
        </Col>);
    });
    let newsRender = [];
    for (let i=0; i<newsItems.length; i++) {
      newsRender.push(newsItems[i]);
      if (i > 0 && (i+1)%clearFixBreakPoint == 0) {
        newsRender.push(<Clearfix key={`clearfix-${i}`}/>);
      }
    }
    return (<Row className={wrapContainer}>{ newsRender }</Row>);
  }

  render() {
    // let recentEventsContent = null;
    const wrapContainer = cx('full', 'margTop');
    const defaultHeadingsBody = cx('defaultHeading', 'noMarg');

    let someZoomerNews = null;
    if (this.props.zoomerNews === null) {
      someZoomerNews = (<span></span>);
    } else {
      someZoomerNews = this.displayZoomerNews(this.props.zoomerNews.resultSet, 6, 2);
    }

    if (typeof this.props.zoomerNews !== 'object' || this.props.zoomerNews === null ) {
      return(
        <section>
          <div className={defaultHeadingsBody}>
            <Link to="/news/zoomer-news"><h2>Zoomer News</h2></Link>
          </div>
        </section>
      );
    }
    return (
      <section>
        <div className={defaultHeadingsBody}>
          <Link to="/news"><h2>Zoomer News</h2></Link>
        </div>
        {someZoomerNews}
      </section>
    );
  }
}

ZoomerNews.propTypes = {
  zoomerNews: React.PropTypes.object,
}

ZoomerNews.defaultProps = {
  zoomerNews: null,
}

const mapStateToProps = createStructuredSelector({
  zoomerNews: selectZoomerNews(),
});


function mapDispatchToProps(dispatch) {
  return {
    dispatch,
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(ZoomerNews);
