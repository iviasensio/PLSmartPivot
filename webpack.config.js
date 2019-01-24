const CopyWebpackPlugin = require('copy-webpack-plugin');
const StyleLintPlugin = require('stylelint-webpack-plugin');
const settings = require('./settings');

console.log('Webpack mode:', settings.mode); // eslint-disable-line no-console

const config = {
  devtool: 'source-map',
  entry: [
    './src/index.js'
  ],
  mode: settings.mode,
  output: {
    path: settings.buildDestination,
    filename: settings.name + '.js',
    libraryTarget: 'amd'
  },
  externals: {
    jquery: {
      amd: 'jquery',
      commonjs: 'jquery',
      commonjs2: 'jquery',
      root: '_'
    },
  },
  module: {
    rules: [
      {
        enforce: 'pre',
        test: /\.(js|jsx)$/,
        exclude: /(node_modules|Library)/,
        loader: 'eslint-loader',
        options: {
          failOnError: true
        }
      },
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            plugins: ['@babel/plugin-transform-async-to-generator'],
            presets: [
              '@babel/preset-env',
              '@babel/preset-react'
            ]
          }
        }
      },
      {
        test: /.less$/,
        use: ['style-loader', 'css-loader', 'less-loader']
      }
    ]
  },
  plugins: [
    new CopyWebpackPlugin([
      'assets/' + settings.name + '.qext',
      'assets/' + settings.name + '.png',
      'assets/wbfolder.wbl',

      // TODO: remove entries below this line
      'resources/Accounts.csv',
      'resources/Accounts2.csv',
      'resources/QlikLook.csv',
      'resources/Excel.png',
    ], {}),
    new StyleLintPlugin()
  ]
};

module.exports = config;
