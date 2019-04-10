import paint from './paint.jsx';
import definition from './definition';
import './main.less';

if (!window._babelPolyfill) { // eslint-disable-line no-underscore-dangle
  require('@babel/polyfill'); // eslint-disable-line global-require
}

export default {
  controller: [
    '$scope',
    '$timeout',
    function controller () {}
  ],
  design: {
    dimensions: {
      max: 1,
      min: 0
    }
  },
  data: {
    dimensions: {
      max: function (nMeasures) {
        return nMeasures < 9 ? 2 : 1;
      },
      min: 1,
      uses: 'dimensions'
    },
    measures: {
      max: function (nDims) {
        return nDims < 2 ? 9 : 8;
      },
      min: 1,
      uses: 'measures'
    }
  },
  definition,
  initialProperties: {
    version: 1.0,
    qHyperCubeDef: {
      qDimensions: [],
      qInitialDataFetch: [
        {
          qHeight: 1,
          qWidth: 10
        }
      ],
      qMeasures: []
    }
  },
  support: {
    export: true,
    exportData: true,
    snapshot: true
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
