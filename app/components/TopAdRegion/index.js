/**
*
* TopAdRegion
*
*/

import React from 'react';
import { Grid, Row, Col } from 'react-bootstrap';
import LeaderboardHolder from 'containers/LeaderboardHolder';
import styled from 'styled-components';

class TopAdRegion extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function
  render() {
    // this needs to have a min height - the leaderboard can't be relied upon to make a space ... we don't want to have the page rerendering and jumping to insert additional (ad) content. better to have the space already allocated, and then filled when it is safe to do so.
    
    const ZMGrid = styled(Grid)`
    `;
    return (
      <ZMGrid fluid>
        <Row className="show-grid">
          <Col md={12}>
            <LeaderboardHolder index={0} />
          </Col>
        </Row>
      </ZMGrid>

    );
  }
}

TopAdRegion.propTypes = {

};

export default TopAdRegion;
