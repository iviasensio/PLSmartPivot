const CopyWebpackPlugin = require('copy-webpack-plugin');
const StyleLintPlugin = require('stylelint-webpack-plugin');
const settings = require('./settings');

console.log('Webpack mode:', settings.mode); // eslint-disable-line no-console

const config = {
  devtool: 'source-map',
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
  mode: settings.mode,
  // TODO: breaks core-js for some reason
  // resolve: {
  //   extensions: ['js', 'jsx']
  // },
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
    filename: `${settings.name}.js`,
    libraryTarget: 'amd',
    path: settings.buildDestination
  },
  plugins: [
    new CopyWebpackPlugin([
      `assets/${settings.name}.qext`,
      `assets/${settings.name}.png`,
      'assets/wbfolder.wbl',
      'resources/Excel.png',

      // TODO: remove entries below this line
      'resources/Accounts.csv',
      'resources/Accounts2.csv',
      'resources/QlikLook.csv'
    ], {}),
    new StyleLintPlugin({
      files: '**/*.less'
    })
  ]
};

module.exports = config;
