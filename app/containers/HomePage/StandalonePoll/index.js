/*
 *
 * RadioDisplay
 *
 */

import React from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { selectPoll } from './selectors';
import { media } from 'style-utils';
import styled from 'styled-components';
import { Row, Col, Grid } from 'react-bootstrap';
import { triggerLoadPollMarkup, zeroPollMarkup } from './actions';
import { BASE_URL } from 'containers/App/constants';
export class StandalonePoll extends React.Component { // eslint-disable-line react/prefer-stateless-function

  // we need to know, if the wp admin menu has already loaded, and also whether or not the address has changed, from what it previously was. if it was,
  // we may need to do a little surgery on the edit link, in the wp admin markup (which was dangerouslySetInnerHTML). we need to access and set elements in there, using just vanilla js ... no react, no jquery magic.
  // when it comes to things that need to be dangeoursly set, then does it really make sense to store all that markup in state? it probably is not very performant.
  // for those kinds of calls, it might be better to do them, old school. We could also consider dumping it from state, once it has been delivered! That would be easy.

  constructor() {
    super();

  }

  componentDidMount() {
    // console.log('StandalonePoll.componentDidMount()');
    // only call if not done so already
    // if (this.props.pollMarkup === null) {// flow: load determination flag is this.props.pollMarkup === null, when we need to trigger load.
    //   // then we load it, by dispatching an action trigger
    //   this.props.triggerLoadPollMarkup();// null --> 0 (loading) --> <some markup /> --> 1
    // }
  }
  shouldComponentUpdate(nextProps) {
    // console.log('StandalonePoll.shouldComponentUpdate');
    // if (nextProps.pollMarkup !== null && nextProps.pollMarkup !== 0 && nextProps.pollMarkup !== 1) {
    //   return true;
    // }
    return false;
  }
  componentDidUpdate(prevProps) {
    // // console.log(`StandalonePoll.componentDidUpdate prevProps.pollMarkup==`);
    // // console.log(prevProps.pollMarkup);
    // if (this.props.pollMarkup !== null && this.props.pollMarkup !== 0 && this.props.pollMarkup !== 1) { // then there is stuff in it; so zero it!
    //   // console.log(`typeof this.props.pollMarkup==${typeof this.props.pollMarkup}`);
    //   this.props.triggerZeroPollMarkup();
    // }
    if (typeof this.props.pollMarkup === 'string') {
      // but before we do this, we get the iframe with ref=polliframe, this.refs.polliframe
      // console.log('attempting to set the pollIframe.src');
      //pollIframe = this.refs.polliframe;
      // const pollIframe = document.getElementById('polliframe');
      // pollIframe.src = `data:text/html,${encodeURIComponent(this.props.pollMarkup)}`;
      this.props.triggerZeroPollMarkup();
    }
  }

  render() {
    const MargedDiv = styled.div`
      margin: 125px 0 0 0;
      .noBg {
        background: rgba(0,0,0,0);
      }
      .yesBg {
        background: #fff;
      }
    `;

    const WhiteCol = styled(Col)`
      padding: 50px;
      background: #fff;
      /*background: ${props => props.noBg ? 'transparent' : 'white'};*/
      ${props => props.noBg && css`
        background: rgba(0,0,0,0);
      `}
      ${media.small`
        background: none;
        padding: 0;
      `}
    `;

    // let somePollMarkup = <iframe ref="polliframe" id="polliframe" width="800" height="400"><h1>Here is some stuff in an iframe</h1></iframe>;
    let somePollMarkup = <iframe ref="polliframe" id="polliframe" width="800" height="400" src={`${BASE_URL}/jedenpoll`} />;// I cannot believe what I dunce I was loading all this stuff in w sagas, when I could simply ref it directly in src. duh.

    return (
      <div className="jedenPoll">
        <Grid>
          <Row>
            <WhiteCol md={12} className={this.props.noBg ? `noBg` : `yesBg`}>
              <Row>
                <Col md={10} mdOffset={1}>
                  {somePollMarkup}
                  {/* <div>{}</div> */}
                </Col>
              </Row>
            </WhiteCol>
          </Row>
        </Grid>
      </div>
    );
  }
}
// pollMarkup null ==> htmlMarkup ==> 1 (1 means it was loaded, and then we kill it after we have dangerouslySetInnerHTML's w it. so that its not bloating memory.)
StandalonePoll.defaultProps = {
  pollMarkup: null,
}
const mapStateToProps = createStructuredSelector({
  pollMarkup: selectPoll(),
});

function mapDispatchToProps(dispatch) {
  return {
    triggerLoadPollMarkup: () => {
      // console.log('StandalonePoll.triggerPollMarkupLoad()');
      dispatch(triggerLoadPollMarkup());
    },
    triggerZeroPollMarkup: () => {
      // console.log('StandalonePoll.triggerZeroPollMarkup()');
      dispatch(zeroPollMarkup());
    },
    dispatch,
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(StandalonePoll);
