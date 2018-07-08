import React from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import { selectSelectedStream } from './selectors';
import { filterStream } from 'containers/App/actions';
// import styles from 'containers/App/styles.css';
import { ButtonToolbar, Button, Nav, NavItem } from 'react-bootstrap';


export class StreamFilters extends React.Component { // eslint-disable-line react/prefer-stateless-function
  constructor () {
    super();
    this.displayStreamButtons.bind(this);

  }
  displayStreamButtons() {
    const someRegionFilterButtons = this.props.streams.map((streamObj, i) => {
      let someButton =  null;
      if (streamObj.streamIdentifier == this.props.selectedStream) {
        return(<NavItem key={`streamfilter_${i}`} onClick={() => this.props.handleRegionFilterClick(streamObj.streamIdentifier)} eventKey="1">{streamObj.name}</NavItem>);
        // return(<Button onClick={() => this.props.handleRegionFilterClick(region)} bsStyle="primary" bsSize="small">{region}</Button>);
      } else {
        return(<NavItem key={`streamfilter_${i}`} onClick={() => this.props.handleRegionFilterClick(streamObj.streamIdentifier)}>{streamObj.name}</NavItem>);
        // return(<Button onClick={() => this.props.handleRegionFilterClick(region)} bsSize="small">{region}</Button>);
      }
    });
    return someRegionFilterButtons;
  }
  render() {

    return(
      <div>
        <Nav bsStyle="tabs" activeKey="1" onSelect={this.handleSelect} className="streamSelector">
          {/* <NavItem eventKey="1" href="/home">NavItem 1 content</NavItem>
          <NavItem eventKey="2" title="Item">NavItem 2 content</NavItem>
          <NavItem eventKey="3" >NavItem 3 content</NavItem> */}
          {this.displayStreamButtons()}
        </Nav>


        {/* <ButtonToolbar> */}
          {/* {this.displayRegionButtons()} */}
          {/* <Button onClick={() => this.props.handleRegionFilterClick('National')} bsStyle="primary" bsSize="small">National</Button>
          <Button onClick={() => this.props.handleRegionFilterClick('Toronto')} bsSize="small">Toronto</Button>
          <Button onClick={() => this.props.handleRegionFilterClick('Cobourg')} bsSize="small">Cobourg</Button>
          <Button onClick={() => this.props.handleRegionFilterClick('Collingwood')} bsSize="small">Collingwood</Button> */}
        {/* </ButtonToolbar> */}
      </div>
    );
  }
}

StreamFilters.propTypes = {
  regions: React.PropTypes.array,
  selectedStream: React.PropTypes.string,

}

StreamFilters.defaultProps = {
  regions: [],
  selectedStream: 'National',
}


const mapStateToProps = createStructuredSelector({
  selectedStream: selectSelectedStream(),
});


function mapDispatchToProps(dispatch) {
  return {
    handleRegionFilterClick: (whichStream) => {
      // console.log('handleStreamFilterClick('+whichStream+')');
      dispatch(filterStream(whichStream));
    },
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(StreamFilters);
