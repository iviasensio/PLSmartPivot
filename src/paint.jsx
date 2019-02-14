import $ from 'jquery';
import initializeStore from './store';
import React from 'react';
// import ReactDOM from 'react-dom';
import { renderToStaticMarkup } from 'react-dom/server';
import HeadersTable from './headers-table/index.jsx';
import DataTable from './data-table/index.jsx';

export default async function paint ($element, layout, component) {
  const state = await initializeStore({
    $element,
    component,
    layout
  });

  const {
    ConceptMatrixColElem,
    ConceptMatrixColElemTable,
    ConceptMatrixRowElem
  } = state.properties;

  const {
    data: { meta: { dimensionCount } },
    selection: { dimensionSelectionCounts },
    styling: { useSeparatorColumns }
  } = state;

  const jsx = (
    <React.Fragment>
      <div className="kpi-table">
        <HeadersTable
          data={state.data}
          general={state.general}
          styling={state.styling}
        />
        <DataTable
          data={state.data}
          general={state.general}
          styling={state.styling}
        />
      </div>
      <div className="data-table">
        <HeadersTable
          data={state.data}
          general={state.general}
          styling={state.styling}
        />
        <DataTable
          data={state.data}
          general={state.general}
          styling={state.styling}
        />
      </div>
    </React.Fragment>
  );

  // TODO: switch to render when jquery interaction stuff in renderData is gone
  const html = renderToStaticMarkup(jsx);
  $element.html(html);
  // ReactDOM.render(jsx, $element[0]);

  RenderData();

  // TODO: move jquery interactions into their respective components
  // Hook up interactions and some html mangling
  function RenderData () {
    $('.data-table .row-wrapper').on('scroll', function () {
      $(`[tid="${layout.qInfo.qId}"] .kpi-table .row-wrapper`).scrollTop($(this).scrollTop());
    });

    // on hover popup with cell value, only in headers
    $('.header-wrapper th').hover(function () {
      $('.tooltip').delay(500)
        .show(0);
      $('.header-wrapper th').children('.tooltip')
        .remove();

      const element = $(this);
      const offset = element.offset();
      const toolTip = $("<div class='tooltip'></div>");

      toolTip.css({
        top: offset.top,
        left: offset.left
      });

      toolTip.text(element.text());
      $('.header-wrapper th').append(toolTip);
    }, () => {
      $('.tooltip').delay(0)
        .hide(0);
    });

    // allow making selections inside the table
    $('.data-table td').on('click', function () {
      if (layout.filteroncellclick == false) {
        return;
      }
      const indextr = $(this).parent()
        .parent()
        .children()
        .index($(this).parent()); // identifica la row
      const indextd = $(this).parent()
        .children()
        .index($(this)); // identifica la col

      let SelectRow = 0;
      let SelectCol = 0;

      SelectRow = ConceptMatrixRowElem[(indextr)];

      // este if verifica primero si hay selecciones hechas en la dimensión, si las hay
      // las reselecciona para poder borrar antes de poder seleccionar lo que quiero
      // no es viable pedirle que seleccione a la vez elementos de 2 selecciones, se queda
      // colgado el menú de confirm, por eso uso este sistema, que sí funciona.
      // it can cause issues like error messages and wrong selections if there are null values
      // and the check allow null values is active
      if (dimensionCount > 1 && indextd > 0) {
        if (dimensionSelectionCounts[1] > 0) {
          const SelectB = JSON.parse(JSON.stringify(ConceptMatrixColElemTable));
          component.backendApi.selectValues(1, SelectB, true);
          $(this).toggleClass('selected');
        }
        SelectCol = ConceptMatrixColElemTable[(indextd)];

        component.backendApi.selectValues(1, [SelectCol], true);
        $(this).toggleClass('selected');
      }

      if (indextd > 0 && dimensionSelectionCounts[0] > 0) {
        const SelectA = JSON.parse(JSON.stringify(ConceptMatrixRowElem));
        component.backendApi.selectValues(0, SelectA, true);
        $(this).toggleClass('selected');
      }

      if (indextd > 0) {
        component.backendApi.selectValues(0, [SelectRow], true);
        $(this).toggleClass('selected');
      }
    });
    // allow selections through the header of the second dimension
    $('.header-wrapper th').on('click', function () {
      const indextd = $(this).parent()
        .children()
        .index($(this)); // identifica la col

      let SelectCol = 0;

      if (dimensionCount > 1 && indextd > 0) {
        if (dimensionSelectionCounts[1] > 0) {
          const SelectB = JSON.parse(JSON.stringify(ConceptMatrixColElem));
          component.backendApi.selectValues(1, SelectB, true);
          $(this).toggleClass('selected');
        }
        if (useSeparatorColumns) {
          SelectCol = ConceptMatrixColElem[(Math.round(indextd / 2) - 1)];
        } else {
          SelectCol = ConceptMatrixColElem[(Math.round(indextd) - 1)];
        }

        component.backendApi.selectValues(1, [SelectCol], true);
        $(this).toggleClass('selected');
      }
    });
    // allow selections in desc dimension cells
    $('.kpi-table td').on('click', function () {
      const indextr = $(this).parent()
        .parent()
        .children()
        .index($(this).parent()); // identifica la row
      let SelectRow = 0;
      SelectRow = ConceptMatrixRowElem[(indextr)];

      if (dimensionSelectionCounts[0] > 0) {
        const SelectA = JSON.parse(JSON.stringify(ConceptMatrixRowElem));
        component.backendApi.selectValues(0, SelectA, true);
        $(this).toggleClass('selected');
      }

      component.backendApi.selectValues(0, [SelectRow], true);
      $(this).toggleClass('selected');
    });

    // freeze first column
    $('.qv-object-content-container').on('scroll', (t) => {
      $('.kpi-table').css('left', `${Math.round(t.target.scrollLeft)}px`);
    });
    $('.kpi-table .row-wrapper tr').each(function () {
      $(this).find('th:not(.fdim-cells)')
        .remove();
      $(this).find('td:not(.fdim-cells)')
        .remove();
    });
    $('.kpi-table .header-wrapper tr').each(function () {
      $(this).find('th:not(.fdim-cells)')
        .remove();
    });
  }
}
