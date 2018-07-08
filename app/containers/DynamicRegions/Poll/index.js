/**
*
* Poll
*
*/

import React from 'react';
// import styled from 'styled-components';


class Poll extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function
  render() {
    return (
      <div dangerouslySetInnerHTML={{ __html: this.props.embed }} />
    );
  }
}

Poll.propTypes = {

};

export default Poll;
