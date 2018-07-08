module.exports = {
  plugins: [
    require('postcss-cssnext')({browsers: ['last 2 versions', 'IE > 10']}),
    require('postcss-focus')({}),
    require('postcss-reporter')({clearMessages: true}),
    require('postcss-simple-vars')({}),
  ]
}
