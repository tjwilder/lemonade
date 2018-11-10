const webpack = require("webpack");
const ExtractTextPlugin = require("extract-text-webpack-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");
//
module.exports = function e(env) {
  return {
    entry: {
      vendor: [
        "./node_modules/materialize-css/dist/js/materialize.js",
        "./node_modules/materialize-css/dist/css/materialize.css",
        "./node_modules/mdi/css/materialdesignicons.css",
        "./app/css/materialdesignicons.css",
        "./app/css/master.css",
        "./app/js/offlineRuntimeInstall.js",
      ],
      entry: "./entry.js"
    },
    output: {
      path: __dirname + "/public/",
      publicPath: "/public/",
      filename: "./js/[name].js?[hash]"
    },
    stats: {
      warnings: false
    },
    devtool: "cheap-module-source-map",
    module: {
      rules: [
        {
          test: /\.css$/,
          use: ExtractTextPlugin.extract({
            fallback: "style-loader",
            use: "css-loader"
          })
        },
        {
          test: /\.(gif|png|jpe?g)$/i,
          loaders: [
            "file-loader?name=./img/[name].[ext]?[hash]",
            {
              loader: "image-webpack-loader",
              options: {
                gifsicle: {
                  interlaced: false
                },
                // optipng: {
                //   optimizationLevel: 7
                // },
                pngquant: {
                  quality: "65-90",
                  speed: 4
                },
                mozjpeg: {
                  progressive: true,
                  quality: 65
                }
                // Specifying webp here will create a WEBP version of your JPG/PNG images
                // webp: {
                //   quality: 75
                // }
              }
            }
          ]
        },
        {
          test: /\.(eot|ttf|woff|woff2|ico|svg)(\?v=\d+\.\d+\.\d+)?$/,
          loader: "url-loader?limit=1000000",
          options: {
            name: "fonts/[name].[ext]"
          }
        },
        {
          test: /\.js$/,
          exclude: [/node_modules/]
          // use: [
          //   {
          //     loader: "babel-loader?cacheDirectory",
          //     options: {
          //       presets: [["env", { modules: false }]]
          //     }
          //   }
          // ]
        }
      ]
    },
    plugins: [
      new HtmlWebpackPlugin({
        title: "Lemonade",
        template: "./app/index.ejs"
      }),
      // ... other plugins
      new webpack.optimize.CommonsChunkPlugin({
        name: "vendor",
        // filename: "build/vendor.bundle.[chunkhash].js",
        // (Give the chunk a different name)

        minChunks: Infinity
        // (with more entries, this ensures that no other module
        //  goes into the vendor chunk)
      }),
      new webpack.optimize.CommonsChunkPlugin({
        name: "manifest",
        minChunks: Infinity
      }),
      new ExtractTextPlugin("[name].css"),
    ],
    devServer: {
      compress: true,
      disableHostCheck: true
    }
  };
};
