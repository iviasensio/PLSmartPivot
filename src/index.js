import definition from './definition';
import { initializeDataCube, initializeDesignList } from './dataset';
import initializeStore from './store';
import React from 'react';
import ReactDOM from 'react-dom';
import Root from './root.jsx';
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
      qMeasures: [],
      qSuppressMissing: true,
      qSuppressZero: false
    }
  },
  support: {
    export: true,
    exportData: true,
    snapshot: true
  },
  paint: async function ($element, layout) {
    const dataCube = await initializeDataCube(this, layout);
    const designList = await initializeDesignList(this, layout);
    const state = await initializeStore({
      $element,
      component: this,
      dataCube,
      designList,
      layout
    });
    const editmodeClass = this.inAnalysisState() ? '' : 'edit-mode';
    const jsx = (
      <Root
        editmodeClass={editmodeClass}
        component={this}
        state={state}
      />
    );

    ReactDOM.render(jsx, $element[0]);
  },
  snapshot: {
    canTakeSnapshot: true
  },
  setSnapshotData: async function (snapshotLayout) {
    snapshotLayout.snapshotData.dataCube = await initializeDataCube(this, snapshotLayout);
    snapshotLayout.snapshotData.designList = await initializeDesignList(this, snapshotLayout);
    return snapshotLayout;
  },
  version: 1.0
};
