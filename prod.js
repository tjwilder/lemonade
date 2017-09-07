// const ImageminPlugin = require('imagemin-webpack-plugin')
//   .default;
const HtmlMinifierPlugin = require("html-minifier-webpack-plugin");
const ClosureCompiler = require("google-closure-compiler-js").webpack;
const OfflinePlugin = require("offline-plugin");
const OptimizeJsPlugin = require("optimize-js-plugin");
const path = require("path");
const ExtractTextPlugin = require("extract-text-webpack-plugin");
const PurifyCSSPlugin = require("purifycss-webpack");
const glob = require("glob-all");
//
module.exports = function prod(env) {
  return {
    entry: "./entry.js",
    output: {
      path: __dirname,
      filename: "bundle.js"
    },
    stats: {
      warnings: false
    },
    devtool: "cheap-module-source-map",
    module: {
      rules: [
        {
          test: /indexB.html$/,
          loaders: [
            "file-loader?name=index.[ext]",
            "extract-loader",
            "html-loader"
          ]
        },
        {
          test: /embedEnB.html$/,
          loaders: [
            "file-loader?name=embedEn.[ext]",
            "extract-loader",
            "html-loader"
          ]
        },
        {
          test: /\.css$/,
          loader: ExtractTextPlugin.extract({
            fallback: "style-loader",
            use: "css-loader"
          })
        },
        {
          test: /\.(png|gif|jpg|webp)$/,
          use: ["file-loader?name=[path][name].[ext]"]
        },
        {
          test: /\.(eot|ttf|woff|woff2)$/,
          loader: "file-loader?name=[path][name].[ext]"
        },
        {
          test: /\.svg$/,
          use: [
            {
              loader: "file-loader?name=[path][name].[ext]"
            }
          ]
        },
        {
          test: /\.js$/,
          exclude: [/node_modules/],
          use: [
            {
              loader: "babel-loader",
              options: {
                presets: [["es2015", { modules: false }]]
              }
            }
          ]
        }
      ]
    },
    plugins: [
      // new ImageminPlugin({
      //   pngquant: {
      //     quality: '95-100',
      //   },
      // }),
      // ... other plugins
      new HtmlMinifierPlugin({}),
      new OptimizeJsPlugin({
        sourceMap: true
      }),
      new ClosureCompiler({
        compiler: {
          language_in: "ECMASCRIPT6",
          language_out: "ECMASCRIPT5",
          compilation_level: "ADVANCED",
          warning_level: "QUIET",
          externs: [
            {
              src: `
                      var jQuery = {};
                      
                      var $ = {}  

                      Materialize.toast();
               `
            }
          ]
        },
        makeSourceMaps: true,
        concurrency: 6
      }),
      new ExtractTextPlugin("[name].css"),
      new PurifyCSSPlugin({
        minimize: true,
        verbose: true,
        // Give paths to parse for rules. These should be absolute!
        paths: glob.sync([
          path.join(__dirname, "*.html"),
          path.join(__dirname, "js/*.js")
        ])
      }),
      new OfflinePlugin({
        externals: ["./js/materialize.min.js", "./js/jquery-3.2.1.min.js"],
        caches: "all",
        responseStrategy: "network-first",
        updateStrategy: "all",
        minify: "true",
        ServiceWorker: {
          events: "true"
        },
        AppCache: {
          events: "true"
        }
      })
    ]
  };
};
