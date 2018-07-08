/**
*
* Quote
*
*/

import React from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import styled from 'styled-components';
import { selectQuote } from './selectors';

import { media } from 'style-utils';



class Quote extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function
  render() {

    const QuoteTxt = styled.p`
      text-align: center;
      position: relative;
      top: -30px;
      margin: 10px 0px 20px 0;
      font-style: italic;
      font-size: 14pt;
      ${'' /* ${media.large`
        display:none;
      `} */}
    `

    return (
      <QuoteTxt dangerouslySetInnerHTML={{ __html: this.props.quote}} />
    );
  }
}

const mapStateToProps = createStructuredSelector({
  quote: selectQuote(),
});


export default connect(mapStateToProps)(Quote);
// export default Quote;
