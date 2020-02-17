const path = require('path');
const MiniHtmlWebpackPlugin = require('mini-html-webpack-plugin');
const miniHtmlWebpackPluginTemplate = require('@vxna/mini-html-webpack-template');
const postCssUse = require('postcss-use');
// const autoprefixer = require('autoprefixer');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const webpackDashboard = require('webpack-dashboard/plugin');

const codePenPostCssUseModules = ['lost', 'postcss-apply', 'postcss-color-function', 'postcss-conditionals', 'postcss-custom-media', 'postcss-discard-comments', 'postcss-each', 'postcss-extend', 'postcss-flexbox', 'postcss-for', 'postcss-media-minmax', 'postcss-mixins', 'postcss-nested', 'postcss-nested-ancestors', 'postcss-preset-env', 'postcss-reverse-media', 'postcss-simple-vars', 'postcss-triangle'];

module.exports = {
  mode: 'development',
  entry: './src/index.js',
  output: {
    filename: '[name].bundle.js',
  },
  devServer: { 
    port: 3000,
    hot: true,
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
          options: {
            presets: [
              ['@babel/preset-env', { modules: false }]
            ]
          }
        }
      },
      {
        test: /\.pug$/,
        include: path.resolve(__dirname, 'src'),
        use: ['pug-loader']
      },
      {
        test: /\.css$/,
        use: [
          'style-loader', 
          { loader: 'css-loader', options: { importLoaders: 1 } }, 
          {
            loader: 'postcss-loader',
            options: {
              plugins: () => [
                postCssUse({ modules: codePenPostCssUseModules }),
                // autoprefixer()
              ]
            }
          }
        ]
      }
    ]
  },
  plugins: [
    new webpackDashboard(),
    new CleanWebpackPlugin(),
    new MiniHtmlWebpackPlugin({
      context: {
        lang: 'en',
        title: 'Landing Page | fCC Responsive Web Design Projects',
        container: 'root',
        head: {
          links: [
            { rel: "stylesheet", href: "https://unpkg.com/normalize.css@8.0.1/normalize.css"},
            { rel: "stylesheet", href: "https://fonts.googleapis.com/css?family=Federo|Open+Sans&display=swap" },
            { rel: "preload", href: "https://live.staticflickr.com/5103/5676875263_2fd6328a8f.jpg", as: "image" },
            { rel: "preload", href: "https://live.staticflickr.com/4473/37694010252_4358929aeb_c.jpg", as: "image" },
            { rel: "preload", href: "https://live.staticflickr.com/3691/12256046533_1ce12441be_c.jpg", as: "image" },
            { rel: "preload", href: "https://live.staticflickr.com/65535/48994864191_4a523436de.jpg", as: "image" },
            { rel: "preload", href: "https://live.staticflickr.com/2817/11186848285_1a9fed5ab2_z.jpg", as: "image" },
            { rel: "preload", href: "https://live.staticflickr.com/7359/11476390335_b3b77fa3b5.jpg", as: "image" },
            { rel: "preload", href: "https://live.staticflickr.com/4500/37677776826_27f75ea5b9.jpg", as: "image" }
          ],
          scripts: [
            // { defer: true, src: 'https://use.fontawesome.com/releases/v5.3.1/js/all.js' }
          ]
        },
        body: {
          scripts: [
            { src: 'https://cdn.freecodecamp.org/testable-projects-fcc/v1/bundle.js' }
          ]
        },
        trimWhitespace: true
      },
      template: miniHtmlWebpackPluginTemplate
    })
  ],
  optimization: {
    splitChunks: {
      chunks: 'all'
    }
  }
};
