/*
 *
 * RadioDisplay
 *
 */

import React from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { selectCurrentURLPath, selectIsUserLoggedIn } from './selectors';
import { Button } from 'react-bootstrap';
import styled from 'styled-components';
class SimpleMagicEditButton extends React.Component { // eslint-disable-line react/prefer-stateless-function

  // we need to know, if the wp admin menu has already loaded, and also whether or not the address has changed, from what it previously was. if it was,
  // we may need to do a little surgery on the edit link, in the wp admin markup (which was dangerouslySetInnerHTML). we need to access and set elements in there, using just vanilla js ... no react, no jquery magic.

  constructor() {
    super();

  }

  componentDidMount() {

  }

  componentDidUpdate() {

  }


  render() {
    let mainContent = null;
    if (this.props.isUserLoggedIn) {
      const SMEButton = styled(Button)`
        margin: 0 1em;
      `;
      mainContent = (<SMEButton onClick={this.props.clickEditButton}>Edit</SMEButton>);
    }

    return mainContent;
  }
}


// so ... let's have a saga that will check for the cookie, i guess we want to do it on a componentDidMount ?
SimpleMagicEditButton.defaultProps = {
  isUserLoggedIn: null,
  currentURLPath: null,
  typeOfThing: 'post',
}

const mapStateToProps = createStructuredSelector({
  isUserLoggedIn: selectIsUserLoggedIn(),
  currentURLPath: selectCurrentURLPath(),
});

function mapDispatchToProps(dispatch, ownProps) {
  return {
    clickEditButton: () => {
      // console.log(`clickEditButton .... we could use the dispatch here to dispatch an action to state; if we wanted to ...`);
      // this.post_id
      // if (this.props.typeOfThing == 'post') {
      //   ////http://ez2.local/wp-admin/post.php?post=417884&action=edit
      //   const editLink = `/wp-admin/post.php?post=${tis.props.post_id}&action=edit`;
      //   // window.location.href = editLink;
      //   window.open(
      //     editLink,
      //     '_blank' // <- This is what makes it open in a new window.
      //   );
      // } else if (this.props.typeOfThing == 'category') {
      //
      // } else if
      let editLink;
      switch (ownProps.typeOfThing) {
        case 'post':
          editLink = `/wp-admin/post.php?post=${ownProps.post_id}&action=edit`;
          window.open(
            editLink,
            '_blank' // <- This is what makes it open in a new window.
          );
        case 'category':
          //wp-admin/term.php?taxonomy=category&tag_ID=8&post_type=post
          editLink = `/wp-admin/term.php?taxonomy=category&tag_ID=${ownProps.term_id}`;
          window.open(
            editLink,
            '_blank' // <- This is what makes it open in a new window.
          );
        case 'tag':
          //wp-admin/term.php?taxonomy=category&tag_ID=8&post_type=post
          editLink = `/wp-admin/term.php?taxonomy=post_tag&tag_ID=${ownProps.term_id}`;
          window.open(
            editLink,
            '_blank' // <- This is what makes it open in a new window.
          );
        case 'page':
          //
        case 'home':
          // /wp-admin/post.php?post=5832&action=edit
          editLink = `/wp-admin/post.php?post=5832&action=edit`;
          window.open(
            editLink,
            '_blank' // <- This is what makes it open in a new window.
          );
        default:
          return false;
      }
    },
    dispatch,
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(SimpleMagicEditButton);
