import { createSelector } from 'reselect';

/**
 * Direct selector to the slider state domain
 */

const selectGlobal = () => (state) => state.get('global');
/*
home state only gets rendered,
on the home page. but we couold have slideshows on other route containers
...so ... we need to scope the slideshow in global,
so that we can reuse the slider container on other routes
*/
// const selectSlider = () => (state) => state.getIn('slider');

/**
 * Other specific selectors
 */


/**
 * Default selector used by Slider
 */





const selectSlider = () => createSelector(
  selectGlobal(),
  (globalState) => {
    let slideShow = globalState.getIn(['dynamicRegions', 'slider']);
    if (typeof slideShow === 'object') {
      return slideShow;
    } else {
      return null;
    }

  }
);


export default selectSlider;
export {
  selectSlider,
};
