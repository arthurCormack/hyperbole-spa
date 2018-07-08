/*
 *
 * WeatherWidget
 *
 */

import React from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { selectGeolocationData, selectWeatherData } from './selectors';
import localStyles from './styles.css';
// import styles from '../../App/styles.css';
import { Row, Col, Form, FormGroup, FormControl, Button, Glyphicon } from 'react-bootstrap';
import WeatherWidgetComponent from 'components/WeatherWidget';
/*
  *Google Maps Geolocation API
  *API_KEY: AIzaSyBc4LlhTj7qgYSEiCS042rUyE08R4w2MvY
  *name: ClassicalFMAPIKey
  *use: key=API_KEY
  * access is restricted to *.classicalfm.ca/* radiospa.local/* *.radiospa.local/*
*/
export class WeatherWidget extends React.Component { // eslint-disable-line react/prefer-stateless-function
  render() {
    return (
           <WeatherWidgetComponent />
    );
  }
}

export default (WeatherWidget);
