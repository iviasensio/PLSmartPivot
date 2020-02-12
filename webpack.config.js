const StyleLintPlugin = require('stylelint-webpack-plugin');
const packageJSON = require('./package.json');
const path = require('path');

const DIST = path.resolve("./dist");
const MODE = process.env.NODE_ENV || 'development';
const SOURCE_MAP = 'sourec-map';
const DEVTOOL = (process.env.NODE_ENV === 'development') ? SOURCE_MAP : false;

console.log('Webpack mode:', MODE); // eslint-disable-line no-console

const config = {
  devtool: DEVTOOL,
  entry: ['./src/index.js'],
  externals: {
    jquery: {
      amd: 'jquery',
      commonjs: 'jquery',
      commonjs2: 'jquery',
      root: '_'
    },
    qlik: {
      amd: 'qlik',
      commonjs: 'qlik',
      commonjs2: 'qlik',
      root: '_'
    }
  },
  mode: MODE,
  module: {
    rules: [
      {
        enforce: 'pre',
        exclude: /(node_modules|Library)/,
        loader: 'eslint-loader',
        options: {
          failOnError: true
        },
        test: /\.(js|jsx)$/
      },
      {
        exclude: /node_modules/,
        test: /\.(js|jsx)$/,
        use: {
          loader: 'babel-loader',
          options: {
            plugins: [
              '@babel/plugin-transform-async-to-generator',
              '@babel/plugin-proposal-class-properties'
            ],
            presets: [
              '@babel/preset-env',
              '@babel/preset-react'
            ]
          }
        }
      },
      {
        test: /.less$/,
        use: [
          'style-loader',
          'css-loader',
          'less-loader'
        ]
      }
    ]
  },
  output: {
    filename: `${packageJSON.name}.js`,
    libraryTarget: 'amd',
    path: DIST
  },
  plugins: [
    new StyleLintPlugin({
      files: '**/*.less'
    })
  ]
};

module.exports = config;
