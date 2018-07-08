/*
 *
 * ReduxBurgerMenu
 *
 */

import React from 'react';

import {slide as Menu, reveal as revealMenu} from 'react-burger-menu';
import {decorator as reduxBurgerMenuMaker} from 'redux-burger-menu/lib/immutable';
import {action as toggleMenu} from 'redux-burger-menu/lib/immutable';

const ReduxBurgerMenu = reduxBurgerMenuMaker(Menu);
export default ReduxBurgerMenu;
