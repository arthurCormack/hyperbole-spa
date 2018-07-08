// Important modules this config uses
const path = require('path');
const webpack = require('webpack');
const nodeExternals = require('webpack-node-externals');
const imageWebpackQuery = require('./imageWebpackQuery');

const outputPath = path.join(process.cwd(), 'server', 'middlewares');


// we are going to have to refactor this in a couple of ways. plugins + loaders need to be made webpack 4 compatible.
// also, we can't define it statically, because with webpack 4 we need to indicate a mode which is one of none, production, or development
// so ... to use the same one in both contexts, it cannot be static. we need a function that we can pass a config object to,
// much like we do for webpack.base.babel.js
// that way we can set mode=development ... arg. but wait. we might need to have 2 files.
// webpack.ssr.dev.babel.js and webpack.ssr.prod.js. becasue in dev mode, it gets called and has to work by itself,
// without passing in an object, when we call ssr:generate


// module.exports = {
//   name: 'server',
//   target: 'node',
//   externals: [nodeExternals()],
//   entry: [
//     path.join(process.cwd(), 'app/serverEntry.js'),
//   ],
//   output: {
//     path: outputPath,
//     filename: 'generated.serverEntry.js',
//     publicPath: '/',
//     libraryTarget: 'commonjs2',
//   },
//   module: {
//
//     loaders: [{
//       test: /\.jsx?$/, // Transform all .js files required somewhere with Babel
//       loader: 'babel-loader',
//       exclude: /node_modules/,
//       query: {
//         plugins: [
//           'dynamic-import-node',
//         ],
//       },
//     },
//     {
//       test: /\.css$/,
//       include: /node_modules/,
//       loaders: ['isomorphic-style-loader', 'css-loader'],
//     }, {
//       test: /\.css$/,
//       exclude: /node_modules/,
//       loaders: ['css-loader', 'postcss-loader'],
//     }, {
//       test: /\.json$/,
//       loader: 'json-loader',
//     }, {
//       test: /\.(jpg|png|gif)$/,
//       loaders: [
//         {
//           loader: 'file-loader',
//           query: {
//             emitFile: false,
//           },
//         },
//         {
//           loader: 'image-webpack-loader',
//           query: imageWebpackQuery,
//         },
//       ],
//     }],
//   },
//   plugins: [
//     new webpack.optimize.OccurrenceOrderPlugin(true),
//
//     new webpack.optimize.LimitChunkCountPlugin({ maxChunks: 1 }),
//
//     // Always expose NODE_ENV to webpack, in order to use `process.env.NODE_ENV`
//     // inside your code for any environment checks; UglifyJS will automatically
//     // drop any unreachable code.
//     new webpack.DefinePlugin({
//       'process.env': {
//         NODE_ENV: JSON.stringify(process.env.NODE_ENV),
//         API_URL: JSON.stringify(process.env.API_URL),
//       },
//     }),
//   ],
//   resolve: {
//     modules: ['app', 'node_modules'],
//     extensions: [
//       '.js',
//       '.jsx',
//       '.react.js',
//     ],
//   },
// };
