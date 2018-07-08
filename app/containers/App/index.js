/**
 *
 * App
 *
 * This component is the skeleton around the actual pages, and should only
 * contain code that should be seen on all pages. (e.g. navigation bar)
 */

import React from 'react';
import { renderRoutes } from 'react-router-config';
import { Helmet } from 'react-helmet';

import injectSaga from 'utils/injectSaga';// for making of the global dynamic saga
import { compose } from 'redux';
import saga from './sagas';
import { DAEMON } from 'utils/constants';

import styled from 'styled-components';
// import { Switch, Route } from 'react-router-dom';

import HomePage from 'containers/HomePage/Loadable';

import NotFoundPage from 'containers/NotFoundPage/Loadable';
import Header from 'components/Header';
import Footer from 'components/Footer';
import TopAdRegion from 'components/TopAdRegion';
import HeaderMasthead from 'containers/HeaderMasthead';
import AppWrapper from './AppWrapper';
import PageWrapper from 'containers/PageWrapper';

import FooterRegion from 'components/FooterRegion';

// import { renderRoutes } from 'react-router-config';

// export default function App() {
//   console.log(`it's the App, yo`);
//   return (
//     <AppWrapper>
//       <Helmet
//         titleTemplate="%s - Everything Zoomer"
//         defaultTitle="Everything Zoomer"
//         meta={[
//           { name: 'description', content: 'Everything Zoomer' },
//           { property: 'fb:app_id', content: 534273583592060 },
//         ]}
//       >
//         <meta name="description" content="Everything Zoomer" />
//       </Helmet>
//       {/* <Header /> */}
//       <HeaderMasthead />
//
//
//     </AppWrapper>
//   );
// }

const withSaga = injectSaga({ key: 'App', saga, mode: DAEMON });

const App = ({ route }) => {
  // console.log(`App(), route:`, route);
  // console.log(`...App()`);
  return (
    <div>
      <Helmet
        titleTemplate="%s - Everything Zoomer"
        defaultTitle="Everything Zoomer"
        meta={[
          { name: 'description', content: 'Everything Zoomer' },
          { property: 'fb:app_id', content: 534273583592060 },
        ]}
      >
        <meta name="description" content="Everything Zoomer" />
      </Helmet>

      <PageWrapper>
        <TopAdRegion />
        <HeaderMasthead />
        {renderRoutes(route.routes)}
        <FooterRegion />
       </PageWrapper>
    </div>
  );
};

// export default {
//   component: App,
// };
export default {
  component: compose(
    withSaga,
  )(App),
};
