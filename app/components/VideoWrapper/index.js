/**
*
* Shrinkbox
*
*/

import React from 'react';
import styled from 'styled-components';
import YouTube from 'react-youtube';
// import ReactPlayer from 'react-player'

class VideoWrapper extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function
  shouldComponentUpdate() {
    return false;
  }
  render() {
    return (
      <YouTube
        key="featured_video_youtubeinstance"
        {...this.props}
      />
    );
  }
}
VideoWrapper.defaultProps = {
  videoId: null,
};
export default VideoWrapper;
