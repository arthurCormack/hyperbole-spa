/**
*
* TodaysDate
*
*/

import React from 'react';
// import styled from 'styled-components';
// import Moment from 'react-moment';
import { format } from 'date-fns';

class TodaysDate extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function

  getTodaysDate() {
    let dateToFormat = '1976-04-19T12:59-0500';
    // return (
    //   <Moment format="dddd MMMM D, YYYY">{new Date()}</Moment>
    // );
    const someTodaysDate = format(new Date(), 'dddd MMMM D, YYYY');
    return (
      someTodaysDate
    );
  }

  render() {
    return (
      <div>
        {this.getTodaysDate()}

      </div>
    );
  }
}

TodaysDate.propTypes = {

};

export default TodaysDate;
