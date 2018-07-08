/*
 *
 * RadioDisplay
 *
 */

import React from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { selectCurrentThing } from './selectors';
// import styles from 'containers/App/styles.css';

import Img from 'components/Img';
// import localStyles from './styles.css';

export class RadioNowPlayingDrawerDisplay extends React.Component { // eslint-disable-line react/prefer-stateless-function
  render() {

    let someTitle = '...';
    let someArtist = '...';
    if (typeof this.props.currentThing !== 'undefined') {
      if (typeof this.props.currentThing.title !== 'undefined') {
        someTitle = this.props.currentThing.title;
      }
      if (typeof this.props.currentThing.artist !== 'undefined') {
        someArtist = this.props.currentThing.artist;
      }
    }
    return (

        <div>
          <p className="nowPlayingTitle">{someTitle}</p>
          <p className="nowPlayingArtist">{someArtist}</p>
        </div>

    );
  }
}

// const mapStateToProps = selectRadioDisplay();
const mapStateToProps = createStructuredSelector({
  currentThing: selectCurrentThing()
});

function mapDispatchToProps(dispatch) {
  return {
    dispatch,
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(RadioNowPlayingDrawerDisplay);
