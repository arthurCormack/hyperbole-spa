/*

 * ModalSearchHolder

 */

import React from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import SearchPanel from 'containers/SearchPanel';
import { throttle } from 'lodash';
import { selectIsSearchPanelOpen } from 'containers/SearchPanel/selectors';
import { Image, Modal, Button } from 'react-bootstrap';
import { toggleSearchPanel } from 'containers/SearchPanel/actions';

class ModalSearchHolder extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function
  constructor() {
    super();
    // bind stuff
  }

  render() {
    return(
      <div className="searchModal">
        <Modal show={this.props.isSearchPanelOpen} onHide={() => this.props.closeSearchPanel()} key="searchModal">
          <Modal.Header closeButton>
            <Modal.Title>Search EverythingZoomer</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <SearchPanel />
          </Modal.Body>
          <Modal.Footer>
            <Button onClick={() => this.props.closeSearchPanel()}>Close</Button>
          </Modal.Footer>
        </Modal>
      </div>
    );
  }

}

const mapStateToProps = createStructuredSelector({
  isSearchPanelOpen: selectIsSearchPanelOpen(),
});
function mapDispatchToProps(dispatch) {
  return {
    closeSearchPanel: () => {
      dispatch(toggleSearchPanel(false));
    },
    // toggleSearchPanel: () => {
    //
    // },
    dispatch,
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(ModalSearchHolder);
