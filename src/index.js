import paint from './paint';
import definition from './definition';
import './main.less';

if (!window._babelPolyfill) { // eslint-disable-line no-underscore-dangle
  require('@babel/polyfill'); // eslint-disable-line global-require
}

export default {
  controller: [
    '$scope',
    '$timeout',
    function () { }
  ],
  definition,
  initialProperties: {
    qHyperCubeDef: {
      qDimensions: [],
      qInitialDataFetch: [
        {
          qHeight: 1000,
          qWidth: 10
        }
      ],
      qMeasures: []
    }
  },
  paint ($element, layout) {
    try {
      paint($element, layout, this);
    } catch (exception) {
      console.error(exception); // eslint-disable-line no-console
      throw exception;
    }
  },
  snapshot: {
    canTakeSnapshot: true
  },
  version: 1.0
};
