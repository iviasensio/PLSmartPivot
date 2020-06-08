import definition from "./definition";
import { exportXLS } from "./excel-export";
import { initializeDataCube, initializeDesignList } from "./dataset";
import initializeStore from "./store";
import qlik from "qlik";
import React from "react";
import ReactDOM from "react-dom";
import Root from "./root.jsx";
import "./main.less";

if (!window._babelPolyfill) {
  // eslint-disable-line no-underscore-dangle
  require("@babel/polyfill"); // eslint-disable-line global-require
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
      max (nMeasures) {
        return nMeasures < 9 ? 2 : 1;
      },
      min: 1,
      uses: 'dimensions'
    },
    measures: {
      max (nDims) {
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
          qTop: 0,
          qLeft: 0,
          qWidth: 50,
          qHeight: 50
        }
      ],
      qMeasures: [],
      qSuppressZero: false
    }
  },
  support: {
    export: true,
    exportData: true,
    snapshot: true
  },
  async paint ($element, layout, requestPage) {
    const dataCube = await initializeDataCube(this, layout, requestPage);
    const editmodeClass = this.inAnalysisState() ? '' : 'edit-mode';
    let state, designList;
    if (dataCube === null) {
      state = {
        $element,
        component: this,
        dataCube,
        designList,
        layout,
        error: true
      };
    } else {
      designList = await initializeDesignList(this, layout);
      state = await initializeStore({
        $element,
        component: this,
        dataCube,
        designList,
        layout,
        error: false
      });
    }
    const jsx = (
      <Root editmodeClass={editmodeClass} component={this} state={state} />
    );

    ReactDOM.render(jsx, $element[0]);
  },
  snapshot: {
    canTakeSnapshot: true
  },
  async setSnapshotData (snapshotLayout) {
    snapshotLayout.snapshotData.dataCube = await initializeDataCube(
      this,
      snapshotLayout
    );
    snapshotLayout.snapshotData.designList = await initializeDesignList(
      this,
      snapshotLayout
    );
    return snapshotLayout;
  },
  async getContextMenu (obj, menu) {
    const app = qlik.currApp(this);
    const isPersonalResult = await app.global.isPersonalMode();
    if (
      !this.$scope.layout.allowexportxls ||
      (isPersonalResult && isPersonalResult.qReturn)
    ) {
      return menu;
    }

    if (this.backendApi.model.layout.qMeta.privileges.indexOf('exportdata') !== -1) {
      menu.addItem({
        translation: 'Export as XLS',
        tid: 'export-excel',
        icon: 'export',
        select: () => {
          exportXLS(
            this.$element,
            this.$scope.layout.title,
            this.$scope.layout.subtitle,
            this.$scope.layout.footnote
          );
        }
      });
    }
    return menu;
  },
  version: 1.0
};
