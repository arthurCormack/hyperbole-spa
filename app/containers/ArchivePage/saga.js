import { delay } from 'redux-saga'
import { take, call, put, select, fork, cancel } from 'redux-saga/effects';
import { LOCATION_CHANGE, push } from 'react-router-redux';

import { loadArchiveData, archiveDataLoaded, archiveDataLoadingError, zeroArchiveStack, setCurrentlyDisplayedChunkIndex, saveInitialPageNumber, setForceRender } from './actions';
import { activateGeneralWaypointSleepTimeout, deActivateGeneralWaypointSleepTimeout } from 'containers/App/actions';

// App has a watcher that will take care of automatically deActivating any wayPointSleepTimers
// activateGeneralWaypointSleepTimeout, deActivateGeneralWaypointSleepTimeout


import { setLeaderboardSafety, setLeaderboardTimerSafety, setLeaderboardContentCycleSafety } from 'containers/LeaderboardHolder/actions';

import { selectArchive, selectArchiveStack, selectTermData, selectLoading, selectCurrentlyDisplayedChunkIndex, selectWaypointsInViewport, selectInitialPageNumber } from './selectors';

import { LOAD_ARCHIVEDATA_SUCCESS, LOAD_ARCHIVEDATA_FAILURE, LOAD_ARCHIVEDATA, APICALLURL_GETARCHIVE } from 'containers/App/constants';
// import { setCurrentlyDisplayedItemIndex, scrollingAddressChange, zeroPostStack, autoScrollingToPost, updateCurrentlyDisplayedItemIndex } from './actions';
import { SET_CURRENTLYDISPLAYEDCHUNKINDEX, SET_CURRENTLYDISPLAYEDCHUNKDATA, FEATURED_CHUNKSIZE, REGULAR_CHUNKSIZE, COMBINEDHEROANDREGULAR_CHUNKSIZE, BOTTOMOFSTACKREACHED } from './constants';


import request from 'utils/request';
import { filter } from 'lodash';
import { makeSelectLocationState, makeSelectGeneralWaypointSleepTimeout, selectCB } from 'containers/App/selectors';
import SMEB from 'containers/DynamicRegions/SimpleMagicEditButton';
import { selectIsUserLoggedIn } from 'containers/DynamicRegions/SimpleMagicEditButton/selectors';
import { msg } from 'utils/msg';

function* getArchiveSlugElements(whichPermalink) {
  msg('getArchiveSlugElements('+whichPermalink+')')
  // strip the last character off it is a /
  let slugArray = whichPermalink.split('/');
  // trim the last item if it is a /
  if (slugArray[slugArray.length-1] === '') {
    slugArray.pop();
  }
  msg(slugArray);
  let pageNum = 1;
  let archiveType = 'category';
  let tagSlug = null;
  let categorySlug = slugArray[slugArray.length -1];
  let fullCategoryPath = null;

  if (slugArray.indexOf('page') !== -1) {
    // const pageDelineatorIndex = slugArray.indexOf('page');
    pageNum = slugArray[slugArray.length - 1];
    msg(`new pageNum==${pageNum}, typeof pageNum==${typeof pageNum}`);
    // if (pageNum === NaN) {
    //   pageNum = 1;
    // }
    categorySlug = slugArray[slugArray.length -3];
    // assume it's a category, unless the first slug is tag or tags.
    if (slugArray[1] === 'tags' || slugArray[1] === 'tag') {
      // msg(`slugArray==${slugArray}`);
      archiveType = 'tag';
      categorySlug = null;
      tagSlug = slugArray[2];
    } else {
      fullCategoryPath = slugArray.slice(0, slugArray.indexOf('page')).join('/');// the restrung array up to before the page
    }
  } else {
    // assume it's a category, unless the first slug is tag or tags.
    if (slugArray[1] === 'tags' || slugArray[1] === 'tag') {
      archiveType = 'tag';
      categorySlug = null;
      tagSlug = slugArray[slugArray.length -1];
    } else {
      fullCategoryPath = slugArray.join('/');// the restrung array
    }
    // we actually need only 1 category slug, the last one.
  }
  // fullCategoryPath
  msg(`about to return stuff, and pageNum==${pageNum}`);
  return ({ archiveType, categorySlug, tagSlug, pageNum, fullCategoryPath });// return one object which can later be easily deconstructed
}


export function* getBottomOfStackWatcher() {
  while(true) {
    yield take(BOTTOMOFSTACKREACHED);
    msg(`ArchivePage take BOTTOMOFSTACKREACHED`);
    // const someNextItemPermalink = yield select(selectNextItemPermalink());
    // yield call(getNextPost, someNextItemPermalink);
    yield put(setForceRender(true));
    // so ... what is supposed to happen here?
    // can we simply push the next page? do we have the stuff loaded that will be needed on the next page?

  }
}
function* getCurrentlyDisplayedChunkDataWatcher() {

  // the getCurrentlyDisplayedChunkDataWatcher can only
  msg(`getCurrentlyDisplayedChunkDataWatcher()`);
  while(true) {
    const someChunkDisplayData = yield take(SET_CURRENTLYDISPLAYEDCHUNKDATA);
    msg(`currentlyDisplayedChunkDataWatcher take SET_CURRENTLYDISPLAYEDCHUNKDATA`);
    msg(someChunkDisplayData);

    // const { archiveType, categorySlug, tagSlug, pageNum } = yield call(getArchiveSlugElements, somePermalink);
    //
    const locationState = yield select(makeSelectLocationState());
    const somePermalink = locationState.locationBeforeTransitions.pathname;
    const { archiveType, categorySlug, fullCategoryPath, tagSlug, pageNum } = yield call(getArchiveSlugElements, somePermalink);

    let currentlyDisplayedChunkIndex = yield select(selectCurrentlyDisplayedChunkIndex());
    if (currentlyDisplayedChunkIndex === null) {
      currentlyDisplayedChunkIndex = 0;
    }
    // const updatedCurrentlyDisplayedChunkIndex = yield select(selectCurrentlyDisplayedChunkIndex());

    const initialPageNumber = yield select(selectInitialPageNumber());// will be 1 or more.
    // const somePageNum = currentlyDisplayedChunkIndex + initialPageNumber;
    const somePageNum = someChunkDisplayData.current + initialPageNumber;// ¯\_(ツ)_/¯
    msg(`somePageNum==${somePageNum}`);

    // we need to do a check to see if we need to load an additional chunk here. we might, on first load.
    // const currentlyDisplayedChunkIndex = yield select(selectCurrentlyDisplayedChunkIndex());/// already declared above
    const currentArchiveStack = yield select(selectArchiveStack());
    let comboChunksInStack;
    if (currentArchiveStack) {
      comboChunksInStack = Math.floor((currentArchiveStack.length)/COMBINEDHEROANDREGULAR_CHUNKSIZE);// why is this floring to 0?
    }

    if (somePageNum === pageNum ) {// this will always be true, becuase the reducer gets hit first. but we can check against the actual address that is reflected
      msg(`we really should be not pushing stuff, becasue we are already on the correct page, or we have been given an empty array for inViewportWaypoints, and we don't want to go to -Infinity`);
      // but we might need to load in some more stuff!
      msg(`currentlyDisplayedChunkIndex==${currentlyDisplayedChunkIndex}, comboChunksInStack==${comboChunksInStack}`)
      if (currentlyDisplayedChunkIndex + 1 >= comboChunksInStack) {
        msg(`currentlyDisplayedChunkIndex + 1 >= comboChunksInStack`);
        // we really ought to trigger a subsequent load then but ... do we want the thing that initiates it to be the on enter?
        yield call(getArchiveChunk, archiveType, categorySlug, tagSlug, comboChunksInStack + 1 );
      }

    } else {
      // otherwise ... we deduce and push a new location.
      // we have to first dispatch an action that, when reduced, updates the currentlyDisplayedChunkIndex
      // const nextPageIndex =
      // yield put(setCurrentlyDisplayedChunkIndex(someChunkDisplayData.current));


      // ok ... new problem: what happens when there are 2 or more items in the viewport simultaneously? they fight! and we get trapped in a back and forth struggle. so ... we need to instead implement two things:
      // 1) logic which keeps an array of all waypoingts in viewport, and determines which has priority, so there is no fighting
      // 2) timouts, so that waypoints don't dispatch immediately on new render! the timeouts by themselves should be enough to mitigate this problem. let's try them first.

      // do we use the same sort of logic that we  used with the single post pages? where we
      // msg(`someChunkDisplayData.current==${someChunkDisplayData.current}`);
      // msg(`fullCategoryPath==${fullCategoryPath}`);
      let archivePagePermalink;
      if (someChunkDisplayData.current === 0) {
        //
        if (somePageNum === 1) {
          // msg(`A`);
          archivePagePermalink = `${fullCategoryPath}`;
          if (archiveType !== 'category') {// assume its a gategory, and if its not, then correct it; it must be a tag
            archivePagePermalink = `/tag/${tagSlug}`;
          }
        } else {
          // msg(`B`);
          archivePagePermalink = `${fullCategoryPath}/page/${somePageNum}`;
          if (archiveType !== 'category') {// assume its a gategory, and if its not, then correct it; it must be a tag
            archivePagePermalink = `/tag/${tagSlug}/page/${somePageNum}`;
          }
        }
        yield put(activateGeneralWaypointSleepTimeout());
        yield put(push(archivePagePermalink));//
      } else {
        if (somePageNum === 1) {
          // msg(`C`);
          archivePagePermalink = `${fullCategoryPath}`;
          if (archiveType !== 'category') {// assume its a gategory, and if its not, then correct it; it must be a tag
            archivePagePermalink = `/tag/${tagSlug}`;
          }
        } else {
          // msg(`D`);
          archivePagePermalink = `${fullCategoryPath}/page/${somePageNum}`;
          if (archiveType !== 'category') {// assume its a gategory, and if its not, then correct it; it must be a tag
            archivePagePermalink = `/tag/${tagSlug}/page/${somePageNum}`;
          }
        }
        // msg(`archivePagePermalink==${archivePagePermalink}`);

        yield put(activateGeneralWaypointSleepTimeout());
        yield put(push(archivePagePermalink));//
      }

      // don't push the new location, unless it reflects a state different than the current one
    }

  }
}

function* getArchiveChunk(archiveType, categorySlug, tagSlug, pageNum ) {
  msg(`getArchiveChunk(${archiveType}, ${categorySlug}, ${tagSlug}, ${pageNum})`);

  const currentTermData = yield select(selectTermData());
  const currentlyDisplayedChunkIndex = yield select(selectCurrentlyDisplayedChunkIndex());
  const currentArchiveStack = yield select(selectArchiveStack());// this is used to determine how to proceed ... and will be used by the getArchive ... so ... it isn't really needed right here.
  const currentActualNumberOfItemsInArchiveStack = filter(currentArchiveStack, (item) => { return item !== null ? true : false }).length;

  if (typeof currentTermData !== 'undefined' && currentTermData !== null) {
    if (currentActualNumberOfItemsInArchiveStack >= currentTermData.count) {
      return false; // we bail out because we already have all the stuff we could possibly want
    }
  } else {
    // this is the situation, where it is the first load.
  }

  const isLoading = yield select(selectLoading());
  if (isLoading) {
    return false;// bails out of generator
  } else {
    yield put(loadArchiveData());// announce our intentions to the world!
  }
  const cb = yield select(selectCB());


  let requestURL = `${APICALLURL_GETARCHIVE}/category/${categorySlug}/${pageNum-1}`;
  if ( archiveType === 'tag') {
    requestURL = `${APICALLURL_GETARCHIVE}/tags/${tagSlug}/${pageNum-1}`;
  }

  const loggedInToWP = yield select(selectIsUserLoggedIn());
  // if (loggedInToWP) {
  //   requestURL += `&loggedintowp=true`;
  // }

  // msg(`...requestURL==${requestURL}`);
  try {
    // msg(`just before someArchive = yield call(request, requestURL) ...`);
    const someArchive = yield call(request, requestURL);// this does indeed get called ... and we appear to be getting a response! ... so wtf!
    //
    // msg(`wtf!`);
    // msg(`someArchive`);
    // msg(someArchive);
    yield put(archiveDataLoaded(someArchive));
  } catch (err) {
    console.log(err);
    yield put(archiveDataLoadingError(err));
  }
}

export function* archiveLoadingSaga() {
  msg('*************archiveLoadingSaga');
  while(true) {
      const isLoading = yield select(selectLoading());
      // SET_CURRENTLYDISPLAYEDCHUNKDATA
      const currentlyDisplayedChunkDataWatcher = yield fork(getCurrentlyDisplayedChunkDataWatcher);
      const bottomOfStackWatcher = yield fork(getBottomOfStackWatcher);
      // and then we want to check current conditions, and kick things off the right way
      // is there currently archive stuff?
      // a lot of getArchive will be deprecated, and cannabalized and put into here instead.
      const locationState = yield select(makeSelectLocationState());
      const somePermalink = locationState.locationBeforeTransitions.pathname;
      const { archiveType, categorySlug, tagSlug, pageNum } = yield call(getArchiveSlugElements, somePermalink);
      // msg(`archiveType==${archiveType}, categorySlug==${categorySlug}, tagSlug==${tagSlug}, pageNum==${pageNum}`);
      const activeTermSlug = archiveType === 'tag' ? tagSlug : categorySlug;

      const currentTermData = yield select(selectTermData());
      // msg(`currentTermData`);
      // msg(currentTermData);

      const currentTermSlug = currentTermData !== null ? currentTermData.slug : null;

      if (currentTermData === null) {
        yield put(zeroArchiveStack());// zero it, in case we are coming from somewhere else, we want to start with a clean slate
        // yes, a clean slate, but we also want to know what page we are starting the stack from.
        // so ... we need to dispatch an action that will store that.
        yield put(saveInitialPageNumber(pageNum));
        // msg(`starting with a clean slate`);
        // now ... how do we want to handle it, if we don't start on page 1?
        // we could a) redirect to page 1, and make it always start there ... or we could jsut always start at whatever page we are given. no page is the same as page 1 btw.

        yield call(getArchiveChunk, archiveType, categorySlug, tagSlug, pageNum );

      } else if (currentTermData !== null && currentTermSlug !== activeTermSlug) {// but we might be coming from a post page, or any other non-archive page. so there are other potential circumstances where we mihgt have to zero this.!
        // console.log(`here we are ...`);
        yield put(zeroArchiveStack());
        yield call(getArchiveChunk, archiveType, categorySlug, tagSlug, pageNum );
        // console.log(`do we make it here?`);// no we do not!
      } else {
        // msg(`currentTermSlug==activeTermSlug==${activeTermSlug}`);
        // msg(`subsequent page:${pageNum}`);
        // we may have already loaded stuff into.
        // we might not have data in state yet for the ads if it comes freshfrom the server - why is that?

        const currentlyDisplayedChunkIndex = yield select(selectCurrentlyDisplayedChunkIndex());
        const currentArchiveStack = yield select(selectArchiveStack());// this is used to determine how to proceed ... and will be used by the getArchive ... so ... it isn't really needed right here.
        if (currentArchiveStack) {
          const comboChunksInStack = Math.floor((currentArchiveStack.length)/COMBINEDHEROANDREGULAR_CHUNKSIZE);// why is this floring to 0?
          const totalComboChunksInArchive = Math.floor((currentTermData.count)/COMBINEDHEROANDREGULAR_CHUNKSIZE);
          // msg(`currently, we have ${comboChunksInStack} comboChunksInStack, and currentlyDisplayedChunkIndex==${currentlyDisplayedChunkIndex}`);
          const currentActualNumberOfItemsInArchiveStack = filter(currentArchiveStack, (item) => { return item !== null ? true : false }).length;
          if (currentActualNumberOfItemsInArchiveStack >= currentTermData.count) {
            return false; // we bail out
          }
          if (currentlyDisplayedChunkIndex + 1 >= comboChunksInStack) {
            yield call(getArchiveChunk, archiveType, categorySlug, tagSlug, comboChunksInStack + 1 );
          }
        }

      }


      // yield put(setLeaderboardSafety(true));
      yield put(setLeaderboardContentCycleSafety(true));

      yield take( LOCATION_CHANGE );
      // msg(`... take( LOCATION_CHANGE ) ... so is it that the watchers get cancelled ... and are not completely killed off initially, but get to have a dying gasp ... where it can do some stuff ...`);
      yield cancel(currentlyDisplayedChunkDataWatcher);
      yield cancel(bottomOfStackWatcher);
      // console.log(`but are they not, like the legendary phoenix, reborn from the ashes?`);

  }
  /*
  So ... how is this really going to work?
  is there an archive stack to begin with?
  is there a pageNum?
  we look at the pageNum,
    and if there is a stack already, and if it matches the current term, then
      if pageNum will add onto, in a non-disjointed way, the stack, then load that stuff
      else zero the stack, and start adding fresh to it.

  rendering:
    render chunk and a chunk waypoint around it, with the chunk index param.

  actions ... bottomOfStackWaypoint ...
  triggers next chunk load + force render

  */

  // maybe what we need to do, is set up while loop.
  //
}

// export default [
//   archiveLoadingSaga,
// ];

export default archiveLoadingSaga;
