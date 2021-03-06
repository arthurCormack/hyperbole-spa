/**
 * Server side rendering application entry module.
 *
 * This module is being transpiled by webpack and placed under
 * server/middlewares/ as `generated.serverEntry.js`.
 *
 * The server uses it to render the app at given location.
 */
import 'babel-polyfill'; // for regeneratorRuntime

import React from 'react';

import ReactDomServer, { renderToString, renderToStaticMarkup } from 'react-dom/server';

import { StaticRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { renderRoutes, matchRoutes } from 'react-router-config';

import { ConnectedRouter, routerReducer, routerMiddleware, push } from 'react-router-redux';

// import { match, RouterContext } from 'react-router';// match doesn't seem toi exist anymore in RR4. does RouterContext?

// import { createMemoryHistory } from 'history';
import createMemoryHistory from 'history/createMemoryHistory';

import { END } from 'redux-saga';
import Helmet from 'react-helmet';
// import styleSheet from 'styled-components/lib/models/StyleSheet';
import { ServerStyleSheet } from 'styled-components';

// Global styles should be injected before any other scoped style, so make sure
// this file is imported before any styled component.
import 'global-styles';
// import 'special-styles';

import createStore from 'configureStore';

// import createRoutes from 'routes';// so ... this is no longer a function, its a simple array
import Routes from 'routes';// so ... this is no longer a function, its a simple array

// Import Language Provider
import LanguageProvider from 'containers/LanguageProvider';

/*
  How are we going to handle this? we used to have a routes.js, that was responsible for tying in the routes, and merging in the component, reducer, and saga, and promisifying all of that.
  and now we don't  ... so ... what to do?
  ... now the structure of the containers, includes all of that stuff, already composed, like in:
  export default compose(
    withReducer,
    withSaga,
    withConnect,
  )(HomePage);
  so ... do we even really need to worry about routes, in the routes config sense?
  ... yes, but maybe we don't need to have a complex route ... maybe we just need a simpler routes.js
*/

import HtmlDocument from 'components/HtmlDocument';
import AppRoot from 'containers/AppRoot';
import App from 'containers/App';
import { changeLocale } from 'containers/LanguageProvider/actions';

import syncHistoryWithStore from 'setup/syncHistoryWithStore';

import monitorSagas from 'utils/monitorSagas';

import { appLocales, translationMessages as messages} from './i18n';

// function renderAppToString(store, renderProps) {
//   return renderToString(
//     <AppRoot store={store} messages={translationMessages}>
//       <RouterContext {...renderProps} />
//     </AppRoot>
//   );
// }
// import { ConnectedRouter } from 'react-router-redux';

// function renderAppToString(url, store, styleSheet) {
//   console.log(`renderAppToString(${url})`);
//   const app = (
//     <Provider store={store}>
//       <LanguageProvider messages={messages}>
//         <StaticRouter location={url} context={{}}>
//           <div>{renderRoutes(Routes)}</div>
//         </StaticRouter>
//       </LanguageProvider>
//     </Provider>
//   );
//
//   return renderToString(
//     styleSheet ? styleSheet.collectStyles(app) : app
//   );
// }
function renderAppToString(url, store, history, styleSheet ) {
  console.log(`renderAppToString(${url})`);
  // const memHistory = createMemoryHistory();// make a new one because i can't figure out how to pass history in through convoluted promise chain. gah.


  // perhaps the problem is that we are creating a memory history here, with no history .. and we need to kick things off, with the first url that we have here, as opposed to rendering with a black slate!
  /*{
  initialEntries: [ '/' ],  // The initial URLs in the history stack
  initialIndex: 0,          // The starting index in the history stack
  keyLength: 6,             // The length of location.key
  // A function to use to confirm navigation with the user. Required
  // if you return string prompts from transition hooks (see below)
  getUserConfirmation: null
}*/

  const app = (
    <Provider store={store}>
      <LanguageProvider messages={messages}>
        <ConnectedRouter history={history}>
          <div>{renderRoutes(Routes)}</div>
        </ConnectedRouter>
      </LanguageProvider>
    </Provider>
  );

  return renderToString(
    styleSheet ? styleSheet.collectStyles(app) : app
  );
}


// store, sagasDone, assets, webpackDllNames
async function renderHtmlDocument({ url, store, sagasDone, assets, webpackDllNames, memHistory }) {// renderProps is always going to be App.

  console.log(`renderHtmlDocument(${url})`);

  // I wonder ... if it might be possible to do something like this:
  /*
  // but how could we trigger the specifig sagas associated with the route?
  store.runSaga(sagas).done.then(() => {
        const html = ReactDOMServer.renderToString(appWithRouter);
        const preloadedState = store.getState();
        return res.status(200).send(render(html, loadableState, preloadedState));
    });
  */



  // console.log(`renderHtmlDocument({${url}, ${store}, ${sagasDone}, ${assets}, ${webpackDllNames}})`);
  // console.log(assets);
  // 1st render phase - triggers the sagas
  renderAppToString(url, store, memHistory);

  //

  // th thing is, with the way that the sagas,
  // send signal to sagas that we're done
  store.dispatch(END);

  // wait for all tasks to finish
  await sagasDone();

  // capture the state after the first render
  const state = store.getState().toJS();

  // prepare style sheet to collect generated css
  const styleSheet = new ServerStyleSheet();

  // 2nd render phase - the sagas triggered in the first phase are resolved by now
  const appMarkup = renderAppToString(url, store, memHistory, styleSheet);
  // should we dispathc END again, and await sagasDone, again? let's try.
  store.dispatch(END);
  await sagasDone();

  // capture the generated css
  const css = styleSheet.getStyleElement();

  const doc = renderToStaticMarkup(
    <HtmlDocument
      appMarkup={appMarkup}
      lang={state.language.locale}
      state={state}
      head={Helmet.rewind()}
      assets={assets}
      css={css}
      webpackDllNames={webpackDllNames}
    />
  );
  return `<!DOCTYPE html>\n${doc}`;
}

// async function renderHtmlDocument({ store, renderProps, sagasDone, assets, webpackDllNames }) {
//   console.log(`renderHtmlDocument()`);
//
//   // 1st render phase - triggers the sagas
//   renderAppToString(store, renderProps);
//
//   //
//
//   // th thing is, with the way that the sagas,
//   // send signal to sagas that we're done
//   store.dispatch(END);
//
//   // wait for all tasks to finish
//   await sagasDone();
//
//   // capture the state after the first render
//   const state = store.getState().toJS();
//
//   // prepare style sheet to collect generated css
//   const styleSheet = new ServerStyleSheet();
//
//   // 2nd render phase - the sagas triggered in the first phase are resolved by now
//   const appMarkup = renderAppToString(store, renderProps, styleSheet);
//
//   // capture the generated css
//   const css = styleSheet.getStyleElement();
//
//   const doc = renderToStaticMarkup(
//     <HtmlDocument
//       appMarkup={appMarkup}
//       lang={state.language.locale}
//       state={state}
//       head={Helmet.rewind()}
//       assets={assets}
//       css={css}
//       webpackDllNames={webpackDllNames}
//     />
//   );
//   return `<!DOCTYPE html>\n${doc}`;
// }

// function is404(routes) {
//   return routes.some((r) => r.name === 'notfound');
// }

function getCAARDD(store) {
  // // console.log('getCAARDD()');
  const caardd = typeof store.getState().getIn(['global', 'caardd']) !== 'undefined' ? store.getState().getIn(['global', 'caardd']) : false;
  // // console.log(caardd);

  return caardd;
}

// this is the entry point that gets called from handleSSR. we are going to use react-router-config
// and switch the structure of the containers export so that it exports an object that has both loader and compoentn params.

// i now understand why the actions in ReactSSRCasts are () => () => functions. they are user directly as the mapDispatchToProps function, and passed, as is, into the react-reduc connect HOC.



function renderAppToStringAtLocation(url, { webpackDllNames = [], assets, lang }, callback) {
  console.log(`renderAppToStringAtLocation()`);
  const memHistory = createMemoryHistory({
    initialEntries: [url],
    initialIndex: 0,
    keyLength: 6,
  });

  // initialEntries: [ '/' ],  // The initial URLs in the history stack
  // initialIndex: 0,          // The starting index in the history stack
  // keyLength: 6,             // The length of location.key
  // // A function to use to confirm navigation with the user. Required
  // // if you return string prompts from transition hooks (see below)
  // getUserConfirmation: null
  // const memHistory = createHistory();
  // console.log(`memHistory made`);
  // console.log(memHistory);

  // const store = createStore({environment}, memHistory);
  // actually, it looks like the right place to add this is before.
  // so ... we have the memHistory, and we have the createStore. so something is either wrong with one of them.
  //
  //

  const store = createStore({}, memHistory);


  // console.log(`store made`);
  // console.log(store.getState());

  // syncHistoryWithStore(memHistory, store);// is this even neccesary?

  // console.log(`finished syncHistoryWithStore`);
  // const routes = createRoutes(store);
  // const Routes = routeConfig;// defined above, by importing
  // no need to refiene this now, since we are calling it Routes now, when we are importing it.

  // let's try and do this without needing a seperate routes js file, and doing the routes in the standard react router 4 way ... which works properly in react-boilerplate
  // since we aren't doing a server side data load outside of the render, with a load function, ,the way that stephen grider suggests, and also the way that next js seems to work,
  // and are instead doing the double render technique, do we actually need to worry about the route,

  // if we were to go the route that Stephen Grider suggests, what would that mean?
  // we don't have an easy seperate loader function, we have a saga, that does the business.
  // and the saga's are middlewared into the store!

  const sagasDone = monitorSagas(store);

  // maybe if we dispatch a LOCATION_CHANGE to the store, with memHistory?!
  store.dispatch(changeLocale(lang));

  // store.dispatch(push(url));

  // renderHtmlDocument({ url, store, sagasDone, assets, webpackDllNames })
  //       .then((html) => {
  //         // const notFound = is404(renderProps.routes);// is404 only looks at matching route patterns, but doesn't care what the Content Authority thinks about whether a route exists or not, or whether there is a redirection
  //         const caardd = getCAARDD(store);
  //         callback({ html, caardd });// this is where we pass the CAARDD ... to the server
  //       })
  //       .catch((e) => callback({ error: e }));


  console.log(`url=${url}`);
  console.log(`Routes,`, Routes);
  const branch = matchRoutes(Routes, url);
  console.log(`branch`, branch);
  /*
  for reasons that I cannot comprehend, matchRoutes is not returning the correct match here on the server.
  */
  const promises = matchRoutes(Routes, url)
    .map(({ route }) => {
      console.log(`matchedRoute for ${url}... `);
      console.log(route);
      // return route.loadData ? route.loadData(store) : null;
      return null;// what if we don't run the loadData ... what if our saga will do it for us?
    })
    .map(promise => {
      // console.log(``);
      if (promise) {
        return new Promise((resolve, reject) => {
          promise.then(resolve).catch(resolve);
        });
      }
    });
    // console.log(promises);// why is the first one undefined? does that matter?
  Promise.all(promises).then(() => {
    const context = {};
    // const content = renderer(req, store, context);

    renderHtmlDocument({ url, store, sagasDone, assets, webpackDllNames, memHistory })
          .then((html) => {
            // const notFound = is404(renderProps.routes);// is404 only looks at matching route patterns, but doesn't care what the Content Authority thinks about whether a route exists or not, or whether there is a redirection
            const notFound = null;
            const caardd = getCAARDD(store);
            callback({ html, notFound, caardd });// this is where we pass the CAARDD
          })
          .catch((e) => callback({ error: e }));

    // if (context.url) {
    //   // return res.redirect(301, context.url);
    // }
    // if (context.notFound) {
    //   // res.status(404);
    // }

    // res.send(content);
  });


  // can we just call <AppRoot><App /></AppRoot> // AppRoot adds the redux store to things

  // at this point, we need to inspect the CAARDD [Content Authority Api-Response Dead-Drop], in store.global to see what kind of response to return


  // so basically, moving to react router 4, means having to redo this functionality completely, in a way that will work with RR4 api.
  // fuggleshnutz


  // what happens if we try and run it without matching the route first?


  // pseudocode this:
  // given our routes (react-router-config format), and given the url of a particular request, ... what do we do?
  // what we had was a function that would match routes given url, and then callback, with 3 params: error, redirectLocation, and renderProps
  // wtf are renderProps? i guess it's a boolean sort of. booleanish enough anyways.
  // match({ routes, location: url }, (error, redirectLocation, renderProps) => {
  //   if (error) {
  //     callback({ error });
  //   } else if (redirectLocation) {
  //     //callback({ redirectLocation: redirectLocation.pathname + redirectLocation.search });
  //     callback({ redirectLocation: redirectLocation.pathname });
  //   } else if (renderProps) {
  //     renderHtmlDocument({ store, renderProps, sagasDone, assets, webpackDllNames })
  //       .then((html) => {
  //         const notFound = is404(renderProps.routes);// is404 only looks at matching route patterns, but doesn't care what the Content Authority thinks about whether a route exists or not, or whether there is a redirection
  //         const caardd = getCAARDD(store);
  //         callback({ html, notFound, caardd });// this is where we pass the CAARDD
  //       })
  //       .catch((e) => callback({ error: e }));
  //   } else {
  //     callback({ error: new Error('Unknown error') });
  //   }
  // });

}

export {
  appLocales,
  renderAppToStringAtLocation,
};
