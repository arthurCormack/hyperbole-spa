/*
 *
 * RadioPlayer
 *
 */

import React from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { selectRadioPlayer, selectSocketConnectionEstablished, selectPerformances, selectStreamURL } from './selectors';
// import jwplayer from "exports?jwplayer!../../../vendor/jwplayer/jwplayer";
import "../../../vendor/jwplayer/jwplayer";
import styles from './styles.css';

import { activateStreamErrorEmergencyProtocol } from 'containers/App/actions';
import { ACTIVATE_STREAMERROR_EMERGENCYPROTOCOL } from 'containers/App/constants';

export class RadioPlayer extends React.Component { // eslint-disable-line react/prefer-stateless-function

  constructor() {
    super();
    this.conjureJWPlayer.bind(this);
  }
  componentDidMount() {
    this.conjureJWPlayer();
  }

  conjureJWPlayer() {
    // console.log('conjureJWPlayer()');
    if (typeof window === 'undefined') {
      return false;
    }
    if (typeof window.jwplayer === 'undefined') {
      return false;
    }
    jwplayer = window.jwplayer;

    jwplayer.key = this.props.licensekey;
    let activeStreamURL = null;
    const dynamicStreamURL = this.props.dynamicStreamURL;// mp3 stream for classical
    const defaultStreamURL = this.props.defaultstreamurl;// mp3 stream for classical
    if (dynamicStreamURL !== null ) {
      activeStreamURL = dynamicStreamURL;
    } else {
      activeStreamURL = defaultStreamURL;
    }

    jwplayer('radioplayer').setup({
      file: activeStreamURL,
      type: 'mp3',
      height: 36,
      width: 400,
      autostart: false,
      skin: {
        name: 'bekle',
        active: 'red',
        inactive: 'white',
        background: 'black',
      }
    });

    /*
     * Player Event Handlers
    */

    jwplayer().on('error', (e) => {
      // console.log('jwplayer.on.error');
      // console.log(e);
      //we need to dispatch an action that says that an error in the stream has occurred ...
      this.props.handleStreamError();
    });
    /*
    jwplayer().on('meta', (e) => {
      // // console.log('jwplayer.on.meta');
      // // console.log(e);
      //let thisTitle = e.metadata.title;
      //let thisArtist = e.metadata.artist;
      //let thisImage = e.metadata.url;
      // // console.log(e.metadata)
    });

    jwplayer().on('beforePlay', () => {
      // // console.log('jwplayer.on.beforePlay');
    });
    jwplayer().on('buffer', () => {
      // // console.log('jwplayer.on.buffer');
    });
    */
    jwplayer().on('play', () => {
      // console.log('jwplayer.on.play');
    });
    jwplayer().on('pause', () => {
      // console.log('jwplayer.on.pause');
      // this.props.handleStreamError();//just to test; easier to replicate
    });

  }

  render() {
    return (
      <div className={styles.radioPlayerWrapper}>
        <div id="radioplayer" />
      </div>
    );
  }
}

// const mapStateToProps = selectRadioPlayer();
const mapStateToProps = createStructuredSelector({
  dynamicStreamURL: selectStreamURL(),
});

function mapDispatchToProps(dispatch) {
  return {
    handleStreamError: () => {
      // console.log('handleStreamError');
      dispatch(activateStreamErrorEmergencyProtocol());
    }
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(RadioPlayer);
