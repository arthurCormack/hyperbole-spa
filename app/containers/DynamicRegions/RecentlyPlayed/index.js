/*
 *
 * RecentlyPlayed
 *
 */

import React from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { lastThreePlayed, selectRecentlyPlayed } from './selectors';

import { Table } from 'react-bootstrap';

import cx from 'classnames';
// import styles from 'containers/App/styles.css';
import { Link } from 'react-router-dom';
export class RecentlyPlayed extends React.Component { // eslint-disable-line react/prefer-stateless-function

  // set default prop for numToDisplay = 3
  getRecentlyPlayedRows() {
    if (typeof this.props.recentlyPlayed !== 'object' ||  this.props.recentlyPlayed === null || this.props.recentlyPlayed.length == 0) {
      return '';
    }
    // make a smaller array out of all recently played, but trimmed to this.props.numItems
    // trim
    let trimTop = this.props.numItems + 1;
    let recentlyPlayedSubSet = this.props.recentlyPlayed.slice(1,this.props.numItems + 1);

    return recentlyPlayedSubSet.map((thing) => {
      return (
        <tr key={thing.title}><td className="songWWTP">{thing.title}<span className="wwtpArtist">{thing.artist}</span></td><td className="floatRight">{this.displayPrettyTime(thing.time)}</td></tr>
      );
    });
  }

  displayPrettyTime(time){
    // console.log('displayPrettyTime('+time+')');
    if (typeof time !== 'string') {
      return false;
    }
    // // console.log(typeof time);
    // let test = time.getHours();

    // // console.log('NEW DATE');
//
//     // console.log(new Date(time));
//     // console.log(typeof new Date());
//
// let hours = new Date().getHours();

// // console.log('COMPAREE!!');
//   // console.log(new Date());

  let songTime = new Date();

  // let timeHour = new Date(time);

  let arr = time.split(/[\-\+ :T]/);

  // // console.log('ARR');
  // // console.log(arr);

  let third = parseInt(arr[3]);

   let theHour = songTime.setUTCHours(third);
   let songHour = (songTime.setUTCHours(third));

    let nonEpoc = (songHour/(1000*60*60))%24;
    nonEpoc = Math.floor(nonEpoc);

    let d = new Date();
    let timezoneOffset = d.getTimezoneOffset();

    nonEpoc = nonEpoc - 5;
    if(nonEpoc === -4) {
      nonEpoc = 20;
    }else if (nonEpoc === -3) {
      nonEpoc = 21;
    }else if (nonEpoc === -2) {
      nonEpoc = 22;
    }else if (nonEpoc === -1){
      nonEpoc = 23;
    }else if (nonEpoc === 0) {
      nonEpoc = 24;
    }

    // if (nonEpoc > 12) {
    //   nonEpoc = nonEpoc - 12;
    // }

    let fourth = parseInt(arr[4]);

    // // console.log('FOURTH');
    // // console.log(fourth);

     let theMin = songTime.setUTCHours(fourth);
     let songMin = (songTime.setUTCHours(fourth));

      let nonEpocMin = ((songMin/1000) % 60);
      nonEpocMin = Math.floor(nonEpocMin);

      nonEpocMin = nonEpocMin;

      if (fourth < 10) {
        fourth = '0' + fourth;
      }


      let theTime = nonEpoc + ':' + fourth;

      if (nonEpoc > 12){
        nonEpoc = parseInt(nonEpoc);
        theTime = (nonEpoc - 12) + ':' + fourth + 'pm';
      }else if(nonEpoc == 12){
        theTime = nonEpoc + ':' + fourth + 'pm';
      }else if(nonEpoc == 0){
        theTime = '12' + ':' + fourth + 'am';
      }else {
        theTime = nonEpoc + ':' + fourth + 'am';
      }

      // // console.log('NONEPOC RIGHT NOW');
      // // console.log(nonEpoc);
      // // console.log(theTime);

    return theTime;
  }

  render() {
    const defaultHeadingsSidebar = cx('defaultHeading', 'noMargBot');// ...here
    const upcomingSongsTable = cx('table', 'upcomingSongs', 'table');// ...here

    return (
      <div className="wwtpMain">
        <div className={defaultHeadingsSidebar}>
          <h2>Recently Played</h2>
        </div>
        <Table className={upcomingSongsTable}>
          <tbody>{this.getRecentlyPlayedRows()}</tbody>
        </Table>
      </div>
    );
  }
}

RecentlyPlayed.propTypes = {
  recentlyPlayed: React.PropTypes.oneOfType([React.PropTypes.array, React.PropTypes.object]),
  numItems: React.PropTypes.number,
}

RecentlyPlayed.defaultProps = {
  recentlyPlayed: [],
  numItems:3,
}

const mapStateToProps = createStructuredSelector({
  recentlyPlayed: selectRecentlyPlayed()
});


function mapDispatchToProps(dispatch) {
  return {
    dispatch,
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(RecentlyPlayed);
