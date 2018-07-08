/**
*
* NavigationItems
*
*/

import React from 'react';
import { connect } from 'react-redux';
// import msg from 'utils/msg';
import styled from 'styled-components';
import { Nav, NavItem, MenuItem, NavDropdown, NavBar } from 'react-bootstrap';
import FontAwesome from 'react-fontawesome';
import { media } from 'style-utils';
import { LinkContainer } from 'react-router-bootstrap';
import { push } from 'react-router-redux';
import { toggleSearchPanel } from 'containers/SearchPanel/actions';
class NavigationItems extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function

  constructor(props) {
    super(props)
    // this.state = { healthIsOpen: false, styleIsOpen: false, foodIsOpen: false, travelIsOpen: false, moneyIsOpen:false }
  }

  componentWillMount() {
    this.setState({ healthIsOpen: false, styleIsOpen: false, foodIsOpen: false, travelIsOpen: false, moneyIsOpen:false });
  }
  // handleOpen = (whichNavItem) => {
  //   let someState = this.state.isOpen;
  //   someState[whichNavItem] = true;
  //   this.setState({ isOpen: someState })
  // }
  //
  // handleClose = (whichNavItem) => {
  //   let someState = this.state.isOpen;
  //   someState[whichNavItem] = false;
  //   this.setState({ isOpen: someState })
  // }

  handleClick = () => {
    //  this.setState({ isOpen: false })
    // console.log('handleClick');
    // this.props.navigateTo()
  }
  handle_health_enter = () => {
    this.setState({ healthIsOpen: true })
  }
  handle_health_leave = () => {
    this.setState({ healthIsOpen: false })
  }
  handle_style_enter = () => {
    this.setState({ styleIsOpen: true })
  }
  handle_style_leave = () => {
    this.setState({ styleIsOpen: false })
  }
  handle_food_enter = () => {
    this.setState({ foodIsOpen: true })
  }
  handle_food_leave = () => {
    this.setState({ foodIsOpen: false })
  }
  handle_travel_enter = () => {
    this.setState({ travelIsOpen: true })
  }
  handle_travel_leave = () => {
    this.setState({ travelIsOpen: false })
  }
  handle_money_enter = () => {
    this.setState({ moneyIsOpen: true })
  }
  handle_money_leave = () => {
    this.setState({ moneyIsOpen: false })
  }

  render() {

    const ZMNav = styled(Nav)`
          display: inline-block !important;
          ${media.print`
            display: none;
          `}
    `;

    const HomeNavItem = styled(NavItem)`
      color: #000;
    `;

    const CustomA = styled.a`
      &:hover {
        text-decoration: none !important;
      }
      color: #000;
    `

    let extraItems = null;

    if(this.props.primary == true) {
      extraItems = (
        null
        // <LinkContainer to="/"><MenuItem>Primary</MenuItem></LinkContainer>
      );
    }

    if(this.props.secondary == true) {
      extraItems = (
        null
        // <LinkContainer to="/"><MenuItem>Secondary</MenuItem></LinkContainer>
      );
    }



    const positioning = this.props.secondary == true ? true : false;

    return (
      <ZMNav pullRight={positioning}>
        {/* <LinkContainer to="/" className="noPrint">
          <MenuItem className="noPrint">Home</MenuItem>
        </LinkContainer> */}
        <HomeNavItem
          href="/"
          className="noPrint"
          onClick={ (e) => {
            e.preventDefault();
            this.props.handleDropDownClickNav(`/`);
          } }
        >Home
        </HomeNavItem>
        <NavDropdown
           className="noPrint"
          title="Health"
          onMouseEnter = { this.handle_health_enter }
          onMouseLeave = { this.handle_health_leave }
          // onClick = { this.handleClick('health') }
          onClick={ (e) => {
            e.preventDefault();
            // console.log('onClick Health?!');
            this.props.handleDropDownClickNav(`/health`);
          } }
          /* react bootstrap navs and dropdowns do not implement onClick events! they have their own internal mechanism with clicks. we have to approach orthagonally */
          open={ this.state.healthIsOpen }
          // expanded={ this.state.isOpen.health }
          id="health-dropdown-container"
          ref="HealthDropdown"
          onToggle={() => {
            // this.props.handleDropDownClickNav(`/health`);
            // console.log('onToggle health');
            return null;
          }}
        >
          <LinkContainer to="/health/longevity">
            <MenuItem>Longevity</MenuItem>
          </LinkContainer>
          <LinkContainer to="/health/diet-nutrition">
            <MenuItem>Diet &amp; Nutrition</MenuItem>
          </LinkContainer>
          <LinkContainer to="/health/fitness">
            <MenuItem>Zoomer Fitness</MenuItem>
          </LinkContainer>
          <LinkContainer to="/health/zoomer-yoga">
            <MenuItem>Zoomer Yoga</MenuItem>
          </LinkContainer>
        </NavDropdown>
        <NavDropdown
          className="noPrint"
          title="Money"
          onMouseEnter = { this.handle_money_enter }
          onMouseLeave = { this.handle_money_leave }
          onClick={ () => {
            this.props.handleDropDownClickNav(`/money`);
          } }
          /* react bootstrap navs and dropdowns do not implement onClick events! they have their own internal mechanism with clicks. we have to approach orthagonally */
          open={ this.state.moneyIsOpen }
          id="money-dropdown-container"
          ref="MoneyDropdown"
          onToggle={() => {
            // this.props.handleDropDownClickNav(`/money`);
            // console.log('onToggle');
            return null;
          }}
        >
          <LinkContainer to="/tag/real-estate">
            <MenuItem>Real Estate</MenuItem>
          </LinkContainer>
          <LinkContainer to="/money/personal-finance">
            <MenuItem>Personal Finance</MenuItem>
          </LinkContainer>
          <LinkContainer to="/money/work-retirement">
            <MenuItem>Work &amp; Retirement</MenuItem>
          </LinkContainer>
          <LinkContainer to="/money/budget">
            <MenuItem>Budget</MenuItem>
          </LinkContainer>
          <LinkContainer to="/money/investing-assets">
            <MenuItem>Investing</MenuItem>
          </LinkContainer>
        </NavDropdown>
        <NavDropdown
           className="noPrint"
          title="Travel"
          onMouseEnter = { this.handle_travel_enter}
          onMouseLeave = { this.handle_travel_leave }
          onClick={ () => {
            this.props.handleDropDownClickNav(`/travel`);
          } }
          /* react bootstrap navs and dropdowns do not implement onClick events! they have their own internal mechanism with clicks. we have to approach orthagonally */
          open={ this.state.travelIsOpen }
          id="travel-dropdown-container"
          ref="TravelDropdown"
          onToggle={() => {
            // this.props.handleDropDownClickNav(`/travel`);
            // console.log('onToggle');
            return null;
          }}
        >
          <LinkContainer to="/travelclub">
            <MenuItem>Travel Club</MenuItem>
          </LinkContainer>
          <LinkContainer to="/travel/savvy-tips">
            <MenuItem>Savvy Tips</MenuItem>
          </LinkContainer>
          <LinkContainer to="/travel/destinations">
            <MenuItem>Destinations</MenuItem>
          </LinkContainer>
          <LinkContainer to="/travel/best-of-canada">
            <MenuItem>Best of Canada</MenuItem>
          </LinkContainer>
          <LinkContainer to="/travel/bucket-list">
            <MenuItem>Bucket List</MenuItem>
          </LinkContainer>
        </NavDropdown>
        <NavDropdown
           className="noPrint"
          title="Food"
          onMouseEnter = { this.handle_food_enter }
          onMouseLeave = { this.handle_food_leave }
          // onClick = { this.handleClick('health') }
          /* react bootstrap navs and dropdowns do not implement onClick events! they have their own internal mechanism with clicks. we have to approach orthagonally */
          open={ this.state.foodIsOpen }
          id="food-dropdown-container"
          ref="FoodDropdown"
          onClick={ () => {
            this.props.handleDropDownClickNav(`/food`);
          } }
          onToggle={() => {
            // this.props.handleDropDownClickNav(`/food`);
            // console.log('onToggle');
            return null;
          }}
        >
          <LinkContainer to="/food/recipes">
            <MenuItem>Recipes</MenuItem>
          </LinkContainer>
          <LinkContainer to="/food/libations">
            <MenuItem>Libations</MenuItem>
          </LinkContainer>
          <LinkContainer to="/food/celeb-chefs">
            <MenuItem>Celeb Chefs</MenuItem>
          </LinkContainer>
          <LinkContainer to="/food/entertaining">
            <MenuItem>Entertaining</MenuItem>
          </LinkContainer>
        </NavDropdown>

        <NavDropdown
           className="noPrint"
          title="Style"
          onMouseEnter={ this.handle_style_enter }
          onMouseLeave={ this.handle_style_leave }
          onClick={ () => {
            this.props.handleDropDownClickNav(`/style`);
          } }
          /* react bootstrap navs and dropdowns do not implement onClick events! they have their own internal mechanism with clicks. we have to approach orthagonally */
          open={ this.state.styleIsOpen }
          id="style-dropdown-container"
          ref="StyleDropdown"
          onToggle={() => {
            // this.props.handleDropDownClickNav(`/style`);
            // console.log('onToggle style');
            return null;
          }}
        >
          <LinkContainer to="/style/fashion">
            <MenuItem>Fashion</MenuItem>
          </LinkContainer>
          <LinkContainer to="/style/beauty">
            <MenuItem>Beauty</MenuItem>
          </LinkContainer>
          <LinkContainer to="/style/home-garden">
            <MenuItem>Home &amp; Garden</MenuItem>
          </LinkContainer>
          <LinkContainer to="/style/shopping">
            <MenuItem>Shopping</MenuItem>
          </LinkContainer>
        </NavDropdown>


        {/* {extraItems} */}
        {/* <MenuItem>
            <FontAwesome name='search' className="searchIcon" onClick={() => {this.props.toggleSearchPanel(true)}}/>
        </MenuItem> */}
      </ZMNav>
    );
  }
}

NavigationItems.propTypes = {
  // primary: null,
  // secondary: null,
};

const mapStateToProps = () => {
  return {};
}

function mapDispatchToProps(dispatch) {
  return {
    // toggleSearchPanel: (isSearchPanelOpen=true) => {
    //   dispatch(toggleSearchPanel(isSearchPanelOpen));
    // },
    // handleClick() {
    //   dispatch(push(urlPath));
    // }
    handleDropDownClickNav: (urlPath) => {
      // console.log('handleDropDownClickNav');
      dispatch(push(urlPath));
    },
    dispatch,
  };
}

// export default NavigationItems;
export default connect(mapStateToProps, mapDispatchToProps)(NavigationItems);
