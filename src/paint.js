import $ from 'jquery';
import { enableExcelExport } from './excel-export';
import { generateHeaderWrapper } from './header-wrapper.jsx';
import { generateRowWrapper } from './row-wrapper.jsx';
import initializeStore from './store';

export default async function paint($element, layout, component) {
  const state = initializeStore({ $element, layout, component });
  const {
    ArrayGetSelectedCount,
    vNumDims,
    ConceptMatrixColElem,
    ConceptMatrixColElemTable,
    ConceptMatrixRowElem,
    vSeparatorCols,
  } = state.properties;

  let html = await generateHeaderWrapper({ state });
  const rowWrapperHTML = await generateRowWrapper({
    layout,
    colors: state.colors,
    ...state.properties
  });

  html += rowWrapperHTML;
  RenderData();


  //render data
  function RenderData() {
    // freeze header and first column
    // TODO: Note that the full table is mounted twice here, there's then some jquery down below that removes data from kpi-table and headers from data-table
    var x = "<div class='kpi-table'>";
    x += html;
    x += '</div>';
    x += "<div class='data-table'>";
    x += html;
    x += '</div>';

    $element.html(x);

    // TODO: move jquery interactions into their respective components
    $('.data-table .row-wrapper').on('scroll', function () {
      $('.kpi-table .row-wrapper').scrollTop($(this).scrollTop()),
      $(this).scrollTop() > 50 ? (
        angular.element(document.querySelector('.data-table .row-wrapper')).css('top', '0'),
        angular.element(document.querySelector('.kpi-table .row-wrapper')).css('top', '0')
      ) : (
        angular.element(document.querySelector('.data-table .row-wrapper')).css('top', '97px'),//97px
        angular.element(document.querySelector('.kpi-table .row-wrapper')).css('top', '97px')//97px
      );
    });

    //on hover popup with cell value, only in headers
    $('.header-wrapper th').hover(function () {
      $('.tooltip').delay(500).show(0);
      $('.header-wrapper th').children('.tooltip').remove();

      var element = $(this);
      var offset = element.offset();
      var toolTip = $("<div class='tooltip'></div>");

      toolTip.css(
        {
          top: offset.top,
          left: offset.left
        });

      toolTip.text(element.text());
      $('.header-wrapper th').append(toolTip);
    }, function () {
      $('.tooltip').delay(0).hide(0);
    });

    //allow making selections inside the table
    $('.data-table td').on('click', function () {
      if (layout.filteroncellclick == false)
        return;
      var indextr = $(this).parent().parent().children().index($(this).parent()); //identifica la row
      var indextd = $(this).parent().children().index($(this)); //identifica la col

      var SelectRow = 0;
      var SelectCol = 0;

      SelectRow = ConceptMatrixRowElem[(indextr)];

      // este if verifica primero si hay selecciones hechas en la dimensión, si las hay
      // las reselecciona para poder borrar antes de poder seleccionar lo que quiero
      // no es viable pedirle que seleccione a la vez elementos de 2 selecciones, se queda
      // colgado el menú de confirm, por eso uso este sistema, que sí funciona.
      // it can cause issues like error messages and wrong selections if there are null values
      // and the check allow null values is active
      if (vNumDims > 1 && indextd > 0) {
        if (ArrayGetSelectedCount[1] > 0) {
          var SelectB = JSON.parse(JSON.stringify(ConceptMatrixColElemTable));
          component.backendApi.selectValues(1, SelectB, true);
          $(this).toggleClass('selected');
        }
        SelectCol = ConceptMatrixColElemTable[(indextd)];

        component.backendApi.selectValues(1, [SelectCol], true);
        $(this).toggleClass('selected');
      }

      if (indextd > 0 && ArrayGetSelectedCount[0] > 0) {
        var SelectA = JSON.parse(JSON.stringify(ConceptMatrixRowElem));
        component.backendApi.selectValues(0, SelectA, true);
        $(this).toggleClass('selected');
      }

      if (indextd > 0) {
        component.backendApi.selectValues(0, [SelectRow], true);
        $(this).toggleClass('selected');
      }
    }),
    //allow selections through the header of the second dimension
    $('.header-wrapper th').on('click', function () {
      var indextd = $(this).parent().children().index($(this)); //identifica la col

      var SelectCol = 0;

      if (vNumDims > 1 && indextd > 0) {
        if (ArrayGetSelectedCount[1] > 0) {
          var SelectB = JSON.parse(JSON.stringify(ConceptMatrixColElem));
          component.backendApi.selectValues(1, SelectB, true);
          $(this).toggleClass('selected');
        }
        if (vSeparatorCols) {
          SelectCol = ConceptMatrixColElem[(Math.round(indextd / 2) - 1)];
        } else {
          SelectCol = ConceptMatrixColElem[(Math.round(indextd) - 1)];
        }

        component.backendApi.selectValues(1, [SelectCol], true);
        $(this).toggleClass('selected');
      }
    }),
    //allow selections in desc dimension cells
    $('.kpi-table td').on('click', function () {
      var indextr = $(this).parent().parent().children().index($(this).parent()); //identifica la row
      var SelectRow = 0;
      SelectRow = ConceptMatrixRowElem[(indextr)];

      if (ArrayGetSelectedCount[0] > 0) {
        var SelectA = JSON.parse(JSON.stringify(ConceptMatrixRowElem));
        component.backendApi.selectValues(0, SelectA, true);
        $(this).toggleClass('selected');
      }

      component.backendApi.selectValues(0, [SelectRow], true);
      $(this).toggleClass('selected');
    });

    enableExcelExport(layout, html);

    // freeze first column
    $('.qv-object-content-container').on('scroll', function (t) {
      $('.kpi-table').css('left', Math.round(t.target.scrollLeft) + 'px');
    });
    $('.kpi-table .row-wrapper tr').each(function () {
      $(this).find('th:not(.fdim-cells)').remove(),
      $(this).find('td:not(.fdim-cells)').remove();
    });
    $('.kpi-table .header-wrapper tr').each(function () {
      $(this).find('th:not(.fdim-cells)').remove();
    });
  }
}
