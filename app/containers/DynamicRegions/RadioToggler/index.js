/*
 *
 * RadioToggler
 *
 */

import React from 'react';
import { connect } from 'react-redux';

import  { controlRadio } from 'containers/App/actions';
import { Button } from 'react-bootstrap';

import { createStructuredSelector } from 'reselect';

import selectPlayingState from './selectors';
// import styles from '../../App/styles.css';
import FontAwesome from 'react-fontawesome';

export class RadioToggler extends React.Component { // eslint-disable-line react/prefer-stateless-function
  render() {
    let playPos = {
      position: 'relative',
      left: '5px',
      top: '3px'
    }
    let pausePos = {
      position: 'relative',
      top: '3px'
    }

    let toggleMessage = <FontAwesome name='play' className="drawerPlay" style={playPos}/>;
    let playCommand = 'play';
    if (this.props.playingState == 'play') {
      toggleMessage = <FontAwesome name='pause' style={pausePos} />;
      playCommand = 'pause';
    }
    return (
      <div className="radioToggler">
        <Button onClick={() => this.props.handleRadioControlPlayClick(playCommand)} className="drawerToggleIcon">{ toggleMessage }</Button>
      </div>
    );
  }
}

RadioToggler.propTypes = {
  playingState: React.PropTypes.string,
}

RadioToggler.defaultProps = {
  playingState: 'paused',
}


const mapStateToProps = createStructuredSelector({
  playingState: selectPlayingState(),
});


function mapDispatchToProps(dispatch) {
  return {
    handleRadioControlPlayClick: (playCommand) => {
      dispatch(controlRadio(playCommand));
    }
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(RadioToggler);
