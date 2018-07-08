/*
 *
 * RadioDisplay
 *
 */

import React from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { selectCurrentThing, selectCurrentShow } from './selectors';
// import { selectCurrentShow } from 'containers/App/selectors';

// import styles from 'containers/App/styles.css';
// import localStyles from './styles.css';

export class RadioDisplay extends React.Component { // eslint-disable-line react/prefer-stateless-function
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
    let someShowTitle = 'The New Classical FM';
    if (typeof this.props.currentShow === 'object' && this.props.currentShow !== null) {
      if (typeof this.props.currentShow.title !== 'undefined') {
        someShowTitle = this.props.currentShow.title;
      }
    }
    return (
      <div>
        <p className="onAir">ON AIR: <span>{someShowTitle}</span></p>
        <div className="cleared">
          <p className="songAndArtist"><span>{someTitle} - {someArtist}</span></p>
        </div>
      </div>

    );
  }
}

// const mapStateToProps = selectRadioDisplay();
const mapStateToProps = createStructuredSelector({
  currentThing: selectCurrentThing(),
  currentShow: selectCurrentShow(),
});

function mapDispatchToProps(dispatch) {
  return {
    dispatch,
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(RadioDisplay);
