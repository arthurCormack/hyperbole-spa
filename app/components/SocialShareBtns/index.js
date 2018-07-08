/**
*
* SocialShareBtns
*
*/

import React from 'react';
import styled from 'styled-components';


import FontAwesome from 'react-fontawesome';
import serialize from 'utils/serialize';
import { connect } from 'react-redux';
import he from 'he';

import FacebookProvider, { Share } from 'react-facebook';
import { TwitterShareButton, TwitterIcon } from 'react-share';

import { createStructuredSelector } from 'reselect';
// import { conjureSocialMediaThing } from './actions';

class SocialShareBtns extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function


  printArticle() {
    // console.log('print index');
     window.print();
  }

  render() {
    const TwitterShareButtonStyled = styled(TwitterShareButton)`
      float: left;
      &:focus {
        outline: none;
      }
    `

    const SocialShare = styled.div`
      float: left;
      width: 100%;
      padding-bottom: 12px;
      a, button {
        float: left;
        width: 35px;
        height: 35px;
        display: block;
        -webkit-text-align: center;
        text-align: center;
        background: #3b3b3b;
        color: #fff;
        font-size: 14pt;
        line-height: 35px;
        -webkit-transition: 0.2s all;
        transition: 0.2s all;
        border-radius: 0;
    }
      .fbShare {background: #3b5998; }
      .fbShare:hover {background: #283e6d; }
      .twitterShare {background: #00aced;}
      .twitterShare:hover {background: #0889b9;}
      .pinShare {background: #ca0034;}
      .pinShare:hover {background: #900d2e;}
      .printShare {
        background: #3b3b3b;
        padding: 0;
        border-radius: 0px;
      }
      .printShare:hover {background: #131313;}
    `;


    let someAddress = this.props.itemAddress !== null ? this.props.itemAddress : '/';//
    //itemSharingLink
    if (typeof this.props.itemSharingLink === 'string') {
      someAddress = "http://everythingzoomer.com" + this.props.itemSharingLink; // override with specific sharing link

    }
    let statepin = null;

    if(this.props.itemThumbnail !== null) {
      statepin = typeof this.props.itemThumbnail.src !== 'undefined' ? this.props.itemThumbnail.src : null;

    } else {
      //statepin = "undefined";
    }
    // someAddress = someAddress.replace('ez2.local', 'ez2.everythingzoomer.com');
    const facebookParams = {
      u: someAddress,
    };
    const facebookURL = `https://www.facebook.com/sharer/sharer.php?${serialize(facebookParams)}`;


    let twitterShareUrl = he.decode(someAddress);
    // let twitterURL = `http://twitter.com/share?${twitterShareUrl}`;

    const pinterestURL = `http://pinterest.com/pin/create/button/?url=${someAddress}&media=${statepin}`;

    let printIcon = null;

    if (this.props.noPrint) {

    } else {
      printIcon = (
        <button onClick={this.printArticle} className="printShare">
          <FontAwesome name="print"></FontAwesome>
        </button>
      );
    }

    return (
      <SocialShare id="socialPrint">
        <FacebookProvider appId="534273583592060">
          <Share href={someAddress}>
            <button type="button" className="fbShare"><FontAwesome name="facebook"></FontAwesome></button>
          </Share>
        </FacebookProvider>
        <TwitterShareButtonStyled url={twitterShareUrl}><TwitterIcon size={35} round={false} /></TwitterShareButtonStyled>
        {printIcon}
      </SocialShare>
    );
  }
}

SocialShareBtns.defaultProps = {
  itemAddress: null,
  itemThumbnail: {src: null},
}
SocialShareBtns.propTypes = {

};
const mapStateToProps = createStructuredSelector({

});
const mapDispatchToProps = (dispatch) => {
  return {
    clickSocialMediaThing: (url, title) => {
      // console.log(`clickSocialMediaThing(${url, title})`);
      // dispatch(conjureSocialMediaThing(url, title));
      window.open(`${url}`, "SocialSharing", "width=480,height=300");
    },
    dispatch,
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(SocialShareBtns);
