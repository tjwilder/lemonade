const ImageminPlugin = require('imagemin-webpack-plugin')
  .default;
const HtmlMinifierPlugin = require('html-minifier-webpack-plugin');
const ClosureCompilerPlugin = require('webpack-closure-compiler');
const OfflinePlugin = require('offline-plugin');

module.exports = function (env) {
  return {
    entry: './entry.js',
    output: {
      path: __dirname,
      filename: 'bundle.js',
    },
    module: {
      rules: [{
        test: /indexB.html$/,
        loaders: ['file-loader?name=index.[ext]', 'extract-loader', 'html-loader'],
      }, {
        test: /embedEnB.html$/,
        loaders: ['file-loader?name=embedEn.[ext]', 'extract-loader', 'html-loader'],
      }, {
        test: /\.css$/,
        use: ['style-loader', 'css-loader'],
      }, {
        test: /\.(png|gif|jpg|webp)$/,
        use: ['file-loader?name=[path][name].[ext]'],
      }, {
        test: /\.(eot|ttf|woff|woff2)$/,
        loader: 'file-loader?name=[path][name].[ext]',
      }, {
        test: /\.svg$/,
        use: [{
          loader: 'file-loader?name=[path][name].[ext]',
        }],
      }, {
        test: /\.js$/,
        exclude: [/node_modules/],
        use: [{
          loader: 'babel-loader',
          options: { presets: ['es2015'] }
        }],
      }],
    },
    plugins: [
      new ImageminPlugin({
        pngquant: {
          quality: '95-100',
        },
      }),
      // ... other plugins
      new HtmlMinifierPlugin({}),
      new ClosureCompilerPlugin({
        compiler: {
          language_in: 'ECMASCRIPT6',
          language_out: 'ECMASCRIPT5',
          compilation_level: 'SIMPLE',
        },
        concurrency: 8,
      }),
      new OfflinePlugin({
        externals: ['./android-chrome-192x192.png', './android-chrome-512x512.png', './favicon-32x32.png', './favicon-16x16.png', './js/materialize.min.js', './js/jquery-3.2.1.min.js', './manifest.json'],
        caches: 'all',
        responseStrategy: 'cache-first',
        updateStrategy: 'changed'
      })
    ]
  };
};
