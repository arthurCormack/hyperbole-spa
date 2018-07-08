/**
*
* HomeLogo
*
*/

import React from 'react';
import { connect } from 'react-redux';
import { Image } from 'react-bootstrap';

// import { Link } from 'react-router-dom';// Link now comes from react-router-dom
import { Link } from 'react-router-dom';

import { media } from 'style-utils';
import styled from 'styled-components';
import LogoImage from './images/ezlogo.jpg';
import Quote from 'containers/DynamicRegions/Quote';


class HomeLogo extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function
  render() {
    const LogoLink = styled(Link)`
      position: relative;
      top: -34px;
      ${media.large`
        top: -22px;
      `}
      ${media.medium`
        top: -25px;
      `}
      ${media.small`
        top: -25px;
      `}
      ${media.extrasmall`
        top: -23px;
      `}
    `;

    const Logo = styled(Image)`
      width: 600px;
      margin: 0 auto;
      display: block;
      transition: 0.2s all;
      position: relative;
      ${media.large`
        width: 370px;
      `}
      ${media.medium`
        width: 510px;
      `}
      ${media.small`
        width: 140px;
      `}
      ${media.extrasmall`
        width: 140px;
      `}
    `;

    return (
      <div>
        <Quote />
        <LogoLink to="/" className="full">
          <Logo src={LogoImage} />
        </LogoLink>
      </div>
    );
  }
}

HomeLogo.propTypes = {
  // quote: [],
};


const mapStateToProps = (state) => {
  return {

  };
};

const mapDispatchToProps = () => {
  return {};
};

// export default FeaturedFour;
export default connect(mapStateToProps, mapDispatchToProps)(HomeLogo);
