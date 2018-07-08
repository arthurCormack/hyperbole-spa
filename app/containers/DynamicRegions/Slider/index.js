/*
 *
 * Slider
 *
 */

import React from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import selectSlider from './selectors';

import SlickSlider from 'components/SlickSlider';
export class Slider extends React.Component { // eslint-disable-line react/prefer-stateless-function
  render() {
    // // console.log('render Slider! typeof this.props.slider=='+typeof this.props.slider);
    // // console.log(this.props.slider);
    if (typeof this.props.slider === 'undefined' || this.props.slider == null || typeof window === 'undefined') {
      return (
        <div></div>
      );
    } else {
      // console.log(this.props);
      return (
        <SlickSlider slides={this.props.slider.slides} />
      );
    }
  }
}



const mapStateToProps = createStructuredSelector({
  slider: selectSlider()
});


function mapDispatchToProps(dispatch) {
  return {
    dispatch,
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Slider);
