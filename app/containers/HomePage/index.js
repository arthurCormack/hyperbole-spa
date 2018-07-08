/*
 * HomePage
 *
 * This is the first thing users see of our App, at the '/' route
 */

import React from 'react';
import PropTypes from 'prop-types';
import { Helmet } from 'react-helmet';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { createStructuredSelector } from 'reselect';

import injectReducer from 'utils/injectReducer';
import injectSaga from 'utils/injectSaga';
import { makeSelectLoading, makeSelectError } from 'containers/App/selectors';

import { ZMGrid } from 'components/styled/GridStyles';

import H2 from 'components/H2';

// import AtPrefix from './AtPrefix';
import CenteredSection from './CenteredSection';
// import Form from './Form';
// import Input from './Input';
// import Section from './Section';
// import messages from './messages';

import reducer from './reducer';
import saga from './saga';

import { fetchHomePage } from './actions';


import FeaturedFour from './FeaturedFour';
import FeaturedPopularTrending from './FeaturedPopularTrending';
import FullWidthPost from './FullWidthPost';
import HotTopics from './HotTopics';

import LeaderboardHolder from 'containers/LeaderboardHolder';
import StandalonePoll from './StandalonePoll';
import HomeFeatured4Col from './HomeFeatured4Col';
import InsetFullFeaturedPost from './InsetFullFeaturedPost';

export class HomePage extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function
  /**
   * when initial state username is not null, submit the form to load repos
   */
  componentDidMount() {
    if (this.props.username && this.props.username.trim().length > 0) {
      this.props.onSubmitForm();
    }
  }

  render() {
    console.log(`HomePage.render()`);
    const { loading, error, repos } = this.props;

    return (
      <article>
        <Helmet>
          <title>Home Page</title>
          <meta name="description" content="A newer, fresher, faster EZ2" />
        </Helmet>
        <ZMGrid fluid>
          <FeaturedFour />
          <FeaturedPopularTrending />
          <FullWidthPost index={0} />

          <LeaderboardHolder index={1} />

          <HotTopics />

          <LeaderboardHolder index={2} />

          {/* <HomeFeatured3Col chunkNum={1}/> */}

          <StandalonePoll />

          <HomeFeatured4Col key="HomeFeatured4Col" ref="HomeFeatured4Col" chunkNum={1} />

          <InsetFullFeaturedPost key="InsetFullFeaturedPost" ref="InsetFullFeaturedPost" />

          <HomeFeatured4Col key="HomeFeatured4Col2" ref="HomeFeatured4Col2" chunkNum={2} />

          <FullWidthPost index={1} />
        </ZMGrid>

      </article>
    );
  }
}

HomePage.propTypes = {
  loading: PropTypes.bool,
  error: PropTypes.oneOfType([
    PropTypes.object,
    PropTypes.bool,
  ]),

};

export function mapDispatchToProps(dispatch) {
  return {

  };
}

const mapStateToProps = createStructuredSelector({
  loading: makeSelectLoading(),
  error: makeSelectError(),
});

const withConnect = connect(mapStateToProps, mapDispatchToProps);

const withReducer = injectReducer({ key: 'home', reducer });
const withSaga = injectSaga({ key: 'home', saga });

export default {
  component: compose(
    withReducer,
    withSaga,
    withConnect,
  )(HomePage),
  loadData: ({ dispatch }) => {
    console.log(`HomePage.loadData()!!!`);
    dispatch(fetchHomePage());
  },
};
