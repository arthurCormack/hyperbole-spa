/**
*
* Shrinkbox
*
*/

import React from 'react';
import ReactDOM from 'react-dom';
import styled, { css } from 'styled-components';
import Waypoint from 'react-waypoint';
import {Motion, spring} from 'react-motion';
import { Well } from 'react-bootstrap';

import { media } from 'style-utils';

import VideoWrapper from 'components/VideoWrapper';

// import YouTube from 'react-youtube';

class ShrinkBoxVideo extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function
  constructor() {

    super();
    this.doBoxShrink.bind(this);
    this.doBoxUnshrink.bind(this);
    this.shrinkBoxEnter.bind(this);
    this.shrinkBoxLeave.bind(this);

    this.state = {shrinkMode: 'unshrunk'};

  }
  componentWillMount () {
    //this.setState({shrinkMode: 'unshrunk'});
  }
  shrinkBoxEnter() {
    // console.log('shrinkBoxEnter()');
    this.doBoxUnshrink();
  }
  shrinkBoxLeave() {
    // console.log('shrinkBoxLeave()');
    // what are the exact dimensions and positions of this.refs.videowrapper ?
    // const boundingBox = this.refs.videowrapper.getBoundingClientRect();
    // // console.log('boundingBox:');
    // // console.log(boundingBox);

    this.doBoxShrink();
  }

  doBoxShrink() {
    // console.log('doBoxShrink()');
    const shrinkBoxBaseNode = ReactDOM.findDOMNode(this.refs.shrinkboxbase);
    // // console.log('videoWrapperNode:');
    // // console.log(videoWrapperNode);
    const boundingBox = shrinkBoxBaseNode.getBoundingClientRect();
    // console.log(boundingBox);

    this.setState({shrinkMode: 'shrunk'});

    const shrinkBoxNode = ReactDOM.findDOMNode(this.refs.shrinkbox);
    shrinkBoxNode.classList.add('shrunk');
  }
  doBoxUnshrink() {
    // console.log('doBoxUnshrink()');
    this.setState({shrinkMode: 'unshrunk'});
    const shrinkBoxNode = ReactDOM.findDOMNode(this.refs.shrinkbox);
    shrinkBoxNode.classList.remove('shrunk');
  }

  render() {
    // console.log('ShrinkBoxVideo.render');
    // console.log(this.props)
    // const sizes = {
    //   small: 768,
    //   medium: 992,
    //   large: 1200
    // }
    const ShrinkingBoxBase = styled.div`
      height: 360px;
      /* Small devices (tablets, 768px and up) */
      ${media.small`
      ${''/*   height: 432px; */ }
      `}

      /* Medium devices (desktops, 992px and up) */
      ${media.medium`
      ${''/* height: 558px;*/}
      `}

      /* Large devices (large desktops, 1200px and up) */
      ${media.large`
      ${''/* height: 675px; */}
      `}

      .ShrinkingBox {
        position: relative;
        z-index:10;
      }
      .ShrinkingBox.shrunk {
        ${''/* border:5px solid fuchsia; */}
        position: fixed;
        bottom: 1em;
        right: 1em;
        width: 569px;
        height: 320px;

        ${media.small`
          width: 320px;
          height: 180px;
          display:none;
        `}
        /* Medium devices (desktops, 992px and up) */
        ${media.medium`
          width: 426px;
          height: 240px;
        `}

        /* Large devices (large desktops, 1200px and up) */
        ${media.large`
          width: 569px;
          height: 320px;
        `}
      }
    `;
    const ShrinkingBox = styled.div`
      /* Extra small devices (phones, less than 768px) */
      /* No media query since this is the default in Bootstrap */
      ${''/* border: 5px solid yellow; */}
      height: 360px;
      /* Small devices (tablets, 768px and up) */
      ${media.small`
      ${''/* height: 432px; */ }
      `}

      /* Medium devices (desktops, 992px and up) */
      ${media.medium`
      ${''/*   height: 558px;*/ }
      `}

      /* Large devices (large desktops, 1200px and up) */
      ${media.medium`
      ${''/*   height: 675px;*/ }
      `}
    `;

    const opts = {
      height: '100%',
      width: '100%',
      playerVars: { // https://developers.google.com/youtube/player_parameters
        autoplay: this.props.active ? 1 : 0,
      }
    };
    return (
      <Waypoint
        onEnter={() => {
          // // console.log('ShrinkBoxVideo WayPoint onEnter!');
          this.shrinkBoxEnter();
          /*
          what is going to happen when we enter?
          The default state, is the big player window in the hero spot.
          and when we leave, we will trigger a sequence ... give the appearance of moving the video from its bigSpot to it's littleSpot
          bigSpot = whereEver it is when the onLeave gets called. So we have to determine its postion relative to the viewport, and then switch its positioning to use fixed positioning,
          and then move it
          // we may simply have to do the dangerously set innerHTML, so that React, will leave it alone and not keep re-rendering the damn thing

          !! putting the VideoWrapper inside a ShrinkingBox and a ShrinkingBoxBase, causes it to redraw, a lot.! ... alternative required.
          // can't change the dom, without causing a re-render. that seems to be unavoidable.
          // but what does that mean about applying new inline styles? it can't happen in the render! because the render won't happen

          // when do we actually want to re-render? when the currentPostIndex of the postStack changes, and the ShrinkBoxVideo becomes either current or not current - changes whether or not it is the current thing
          // so we need to Connect to redux in order to know if we are changing current status or not. Or we could just get handed thhe props
          */
        }}
        onLeave={() => {
          // // console.log('ShrinkBoxVideo WayPoint onLeave!');
          this.shrinkBoxLeave();
        }}
        topOffset="25%"
        bottomOffset="25%"
      >
      <div className="full">
        <ShrinkingBoxBase ref={`shrinkboxbase`} key="ShrinkingBoxBase">
          <ShrinkingBox className="ShrinkingBox" ref="shrinkbox" key="ShrinkingBox">
            <VideoWrapper opts={opts} videoId={this.props.videoId} key="videowrapper" ref="videowrapper" />
          </ShrinkingBox>
        </ShrinkingBoxBase>
      </div>
    </Waypoint>
    );
  }
  shouldComponentUpdate(nextProps) {
    if (nextProps.active !== this.props.active) {
      return true;
    }
    return false;
  }
}

export default ShrinkBoxVideo;
