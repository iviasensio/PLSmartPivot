import $ from 'jquery';
import initializeStore from './store';
import React from 'react';
import ReactDOM from 'react-dom';
import HeadersTable from './headers-table/index.jsx';
import DataTable from './data-table/index.jsx';
import { LinkedScrollWrapper, LinkedScrollSection } from './linked-scroll';

export default async function paint ($element, layout, component) {
  const state = await initializeStore({
    $element,
    component,
    layout
  });

  const jsx = (
    <LinkedScrollWrapper>
      <div className="kpi-table">
        <HeadersTable
          data={state.data}
          general={state.general}
          qlik={component}
          styling={state.styling}
        />
        <LinkedScrollSection linkVertical>
          <DataTable
            data={state.data}
            general={state.general}
            qlik={component}
            renderData={false}
            styling={state.styling}
          />
        </LinkedScrollSection>
      </div>
      <div className="data-table">
        <LinkedScrollSection linkHorizontal>
          <HeadersTable
            data={state.data}
            general={state.general}
            qlik={component}
            styling={state.styling}
          />
        </LinkedScrollSection>
        <LinkedScrollSection
          linkHorizontal
          linkVertical
        >
          <DataTable
            data={state.data}
            general={state.general}
            qlik={component}
            styling={state.styling}
          />
        </LinkedScrollSection>
      </div>
    </LinkedScrollWrapper>
  );

  ReactDOM.render(jsx, $element[0]);

  // TODO: fixing tooltips has a seperate issue, make sure to remove this as part of that issue
  $(`[tid="${layout.qInfo.qId}"] .header-wrapper th`).hover(function () {
    $(`[tid="${layout.qInfo.qId}"] .tooltip`).delay(500)
      .show(0);
    $(`[tid="${layout.qInfo.qId}"] .header-wrapper th`).children(`[tid="${layout.qInfo.qId}"] .tooltip`)
      .remove();

    const element = $(this);
    const offset = element.offset();
    const toolTip = $('<div class="tooltip"></div>');

    toolTip.css({
      left: offset.left,
      top: offset.top
    });

    toolTip.text(element.text());
    $(`[tid="${layout.qInfo.qId}"] .header-wrapper th`).append(toolTip);
  }, () => {
    $(`[tid="${layout.qInfo.qId}"] .tooltip`).delay(0)
      .hide(0);
  });
}
