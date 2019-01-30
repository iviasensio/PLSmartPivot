import '@babel/polyfill';
import paint from './paint';
import definition from './definition';
import './main.less';

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
