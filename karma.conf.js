const path = require('path');
const settings = require('./settings');

module.exports = (config) => {
  config.set({
    browsers: ['SlimChromeHeadless'],
    customLaunchers: {
      SlimChromeHeadless: {
        base: 'ChromeHeadless',
        flags: [
          '--headless',
          '--disable-gpu',
          '--disable-translate',
          '--disable-extensions'
        ]
      }
    },
    files: [
      {
        pattern: 'src/**/*.spec.js',
        watched: true
      }
    ],
    frameworks: ['jasmine'],
    preprocessors: {
      'src/**/*.spec.{js, jsx}': [
        'webpack',
        'sourcemap'
      ]
    },
    webpack: {
      devtool: 'source-map',
      externals: {
        jquery: {
          amd: 'jquery',
          commonjs: 'jquery',
          commonjs2: 'jquery',
          root: '_'
        }
      },
      mode: settings.mode,
      module: {
        rules: [
          {
            exclude: [/node_modules/],
            loader: 'babel-loader',
            options: {
              plugins: [
                '@babel/plugin-transform-async-to-generator',
                '@babel/plugin-proposal-class-properties'],
              presets: ['@babel/preset-react']
            },
            test: /\.(js|jsx)$/
          },
          {
            loader: 'ignore-loader',
            test: /\.less$/
          }
        ]
      },
      resolve: {
        alias: {
          'test-utilities': path.resolve('test/test-utilities')
        },
        modules: ['node_modules']
      }
    }
  });
};
