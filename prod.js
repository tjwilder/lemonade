const OfflinePlugin = require('offline-plugin');

const webpack = require('webpack');

const UglifyJSPlugin = require('uglifyjs-webpack-plugin');

const HtmlMinifierPlugin = require('html-minifier-webpack-plugin');

const ExtractTextPlugin = require('extract-text-webpack-plugin');

const HtmlWebpackPlugin = require('html-webpack-plugin');
//
module.exports = function prod(env) {
  return {
    entry: {
      vendor: [
        './node_modules/materialize-css/dist/js/materialize.js',
        './node_modules/materialize-css/dist/css/materialize.css',
        './node_modules/mdi/css/materialdesignicons.css',
        // "./app/css/materialdesignicons.css",
        './app/css/master.css',
        './app/js/offlineRuntimeInstall.js',
      ],
      entry: './entry.js',
    },
    output: {
      path: `${__dirname}/public/`,
      publicPath: './',
      filename: './js/[name].js?[chunkhash]',
      chunkFilename: './js/[id].js?[chunkhash]',
    },
    stats: {
      warnings: false,
    },
    devtool: 'cheap-module-source-map',
    module: {
      rules: [
        {
          test: /\.(woff|woff2|svg|eot|ttf|svg)$/,
          loader: 'url-loader?limit=1000000000?',
        },
        {
          test: /\.css$/,
          use: ExtractTextPlugin.extract({
            fallback: 'style-loader',
            use: 'css-loader',
          }),
        },
        {
          test: /\.(gif|png|jpe?g)$/i,
          loaders: [
            'file-loader?name=./img/[name].[ext]?[hash]',
            {
              loader: 'image-webpack-loader',
              options: {
                gifsicle: {
                  interlaced: false,
                },
                // optipng: {
                //   optimizationLevel: 7
                // },
                pngquant: {
                  quality: '65-90',
                  speed: 4,
                },
                mozjpeg: {
                  progressive: true,
                  quality: 65,
                },
                // Specifying webp here will create a WEBP version of your JPG/PNG images
                // webp: {
                //   quality: 75
                // }
              },
            },
          ],
        },
        {
          test: /\.js$/,
          exclude: [/node_modules/],
          // use: [
          //   {
          //     loader: "babel-loader?cacheDirectory",
          //     options: {
          //       presets: [["env", { modules: false }]]
          //     }
          //   }
          // ]
        },
      ],
    },
    plugins: [
      new HtmlWebpackPlugin({
        title: 'Lemonade',
        template: './app/index.ejs',
        hash: true,
        filename: './index.html',
      }),

      new ExtractTextPlugin('./css/[name].css?[chunkhash]'),
      // ... other plugins
      new UglifyJSPlugin({
        cache: true,
        parallel: true,
        sourceMap: true,
        uglifyOptions: {
          ecma: 8,
          output: {
            comments: false,
          },
        },
      }),
      new HtmlMinifierPlugin({
        minifyCSS: true,
        minifyJS: true,
        removeComments: true,
        removeEmptyAttributes: true,
        removeEmtpyElements: true,
        removeOptionalTags: true,
        removeRedundantAttributes: true,
        useShortDoctype: true,
        removeStyleLinkTypeAttributes: true,
        sortAttributes: true,
        sortClassName: true,
        minifyURLs: true,
        collapseWhitespace: true,
        collapseInlineTagWhitespace: true,
        collapseBooleanAttributes: true,
      }),

      new OfflinePlugin({
        externals: ['https://fonts.googleapis.com/icon?family=Material+Icons'],
        caches: 'all',
        responseStrategy: 'network-first',
        // responseStrategy: "cache-first",
        updateStrategy: 'all',
        // updateStrategy: "changed",
        minify: 'true',
        autoUpdate: 1000 * 60 * 60 * 2,
        ServiceWorker: {
          events: 'true',
        },
        // AppCache: {
        //   events: "true"
        // }
      }),
    ],
  };
};
