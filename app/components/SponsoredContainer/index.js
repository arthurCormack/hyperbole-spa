/**
*
* SponsoredContainer
*
*/

import React from 'react';
import styled from 'styled-components';
import {Row, Col} from 'react-bootstrap';
import SponsoredItem from 'components/SponsoredItem';

class SponsoredContainer extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function
  render() {
    const SponsoredRow = styled(Row)`
      float: left;
      width: 100%;
    `;
    const SponsoredH2 = styled.h2`
      font-family: 'Helvetica', sans-serif;
      text-transform: uppercase;
      font-size: 1.2em;
      margin: 0 0 20px 0;
    `;

    let someContent = null;

    if (this.props.mode == 'singular') {
      someContent = (
        <SponsoredRow>
            <SponsoredItem />
        </SponsoredRow>
      );
    } else if (this.props.mode == 'groupOf3') {
      someContent = (
        <SponsoredRow>
          <SponsoredItem />
          <SponsoredItem />
          <SponsoredItem />
        </SponsoredRow>
        );
    }
    return (
      <div id="sponsoredPrint">
      </div>
    );
  }
}

SponsoredContainer.propTypes = {

};

SponsoredContainer.defaultProps = {
  mode: 'groupOf3',
};

export default SponsoredContainer;
