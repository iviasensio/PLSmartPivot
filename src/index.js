import definition from './definition';
import { exportXLS } from './excel-export';
import { initializeDataCube, initializeDesignList } from './dataset';
import initializeStore from './store';
import qlik from 'qlik';
import React from 'react';
import ReactDOM from 'react-dom';
import Root from './root.jsx';
import './main.less';

if (!window._babelPolyfill) { // eslint-disable-line no-underscore-dangle
  require('@babel/polyfill'); // eslint-disable-line global-require
}

export default {
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
  // Prevent conversion from and to this object
  exportProperties: null,
  importProperties: null,
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
  getContextMenu: async function (obj, menu) {
    const app = qlik.currApp(this);
    const isPersonalResult = await app.global.isPersonalMode();
    if (!this.$scope.layout.allowexportxls || (isPersonalResult && isPersonalResult.qReturn)) {
      return menu;
    }

    menu.addItem({
      translation: "Export as XLS",
      tid: "export-excel",
      icon: "export",
      select: () => {
        exportXLS(
          this.$element,
          this.$scope.layout.title,
          this.$scope.layout.subtitle,
          this.$scope.layout.footnote);
      }
    });
    return menu;
  },
  version: 1.0
};
