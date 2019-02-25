import $ from 'jquery'; // eslint-disable-line id-length
import initializeStore from './store';
import React from 'react';
import ReactDOM from 'react-dom';
import Root from './root.jsx';

export default async function paint ($element, layout, component) {
  const state = await initializeStore({
    $element,
    component,
    layout
  });
  const editmodeClass = component.inAnalysisState() ? '' : 'edit-mode';
  const jsx = (
    <Root
      qlik={component}
      state={state}
      editmodeClass={editmodeClass}
    />
  );

  ReactDOM.render(jsx, $element[0]);

  // TODO: skipped the following as they weren't blockers for letting react handle rendering,
  // they are however the only reason we still depend on jQuery and should be removed as part of unnecessary dependencies issue
  $(`[tid="${layout.qInfo.qId}"] .data-table .row-wrapper`).on('scroll', function () {
    $(`[tid="${layout.qInfo.qId}"] .kpi-table .row-wrapper`).scrollTop($(this).scrollTop());
  });

  // freeze first column
  $(`[tid="${layout.qInfo.qId}"] .qv-object-content-container`).on('scroll', (t) => {
    $(`[tid="${layout.qInfo.qId}"] .kpi-table`).css('left', `${Math.round(t.target.scrollLeft)}px`);
  });

  // TODO: excel export is broken in most browsers, fixing it has an issue of it's own (leaving it disabled for now)
  // import { enableExcelExport } from './excel-export';
  // enableExcelExport(layout, html);

}
