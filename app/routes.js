// These are the pages you can go to.
// They are all wrapped in the App component, which should contain the navbar etc

import App from 'containers/App';
import HomePage from 'containers/HomePage';
import SinglePostPage from 'containers/SinglePostPage';
import SinglePage from 'containers/SinglePage';
import ArchivePage from 'containers/ArchivePage';
//  path: '/:categorySlug/:secondaryCategorySlug/:tertiaryCategorySlug/:yearSlug/:monthSlug/:daySlug/:postSlug(/)',
// import NotFoundPage from 'containers/NotFoundPage';

export default [
  {
    ...App,
    routes: [
      {
        ...HomePage,// this will provide both component and loader params
        path: '/',
        exact: true,
      },
      {
        ...SinglePage,
        path: '/test',

      },
      {
        ...SinglePostPage,
        path: '/:categorySlug/:secondaryCategorySlug/:tertiaryCategorySlug/:yearSlug/:monthSlug/:daySlug/:postSlug'
      },
      {
        ...SinglePostPage,
        path: '/:categorySlug/:secondaryCategorySlug/:yearSlug/:monthSlug/:daySlug/:postSlug'
      },
      {
        ...SinglePostPage,
        path: '/:categorySlug/:yearSlug/:monthSlug/:daySlug/:postSlug'
      },
      {
        ...ArchivePage,
        path: '/:categorySlug'
      },
    ]
  }
];


// export default [
//   {
//     ...App,
//     routes: [
//       {
//         ...HomePage,
//         path: '/',
//         exact: true
//       },
//       {
//         ...NotFoundPage
//       }
//     ]
//   }
// ];
