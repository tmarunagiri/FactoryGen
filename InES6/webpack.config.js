var webpack = require('webpack');
var path = require('path');

module.exports = {

  // set the context (optional)
  // context: path.join( __dirname, '/src'),
  entry: [
        'webpack-dev-server/client?http://127.0.0.1:8080/',
        'webpack/hot/only-dev-server',
        './src'
  ],

  // enable loading modules relatively (without the ../../ prefix)
  resolve: {
    root: path.join( __dirname, '/src')
  },
  output: {
        path: path.join(__dirname, 'public'),
        filename: 'bundle.js'
    },
  module: {
    loaders: [

      // load and compile javascript
      { test: /\.js$/, exclude: /node_modules/, loader:"babel", query: { presets: ['es2015', 'stage-1'] } },

      // load css and process less
      { test: /\.css$/, loader: "style!css"},

      // load JSON files and HTML
      { test: /\.json$/, loader: "json" },
      { test: /\.html$/, exclude: /node_modules/, loader:"raw" },

      // load fonts(inline base64 URLs for <=8k)
      { test: /\.(ttf|eot|svg|otf)$/, loader: "file" },
      { test: /\.woff(2)?$/, loader: "url?limit=8192&minetype=application/font-woff"},

      // load images (inline base64 URLs for <=8k images)
      {test: /\.(png|jpg|gif)$/, loader: 'url-loader?limit=8192'}
    ]
  },
  plugins: [
        new webpack.HotModuleReplacementPlugin(),
        new webpack.NoErrorsPlugin()
    ],
  // webpack dev server configuration
  devServer: {
    // contentBase: "./src",
    noInfo: false,
    hot: true,
    proxy:{
      '*':'http://localhost:3000'
    }
  },

  // support source maps
  devtool: "#inline-source-map"
};