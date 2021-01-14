import React from "react";
import PropTypes from "prop-types";
import HeadersTable from "./headers-table/index.jsx";
import DataTable from "./data-table/index.jsx";
import { LinkedScrollWrapper, LinkedScrollSection } from "./linked-scroll";

class Root extends React.PureComponent {
  render () {
    const { editmodeClass, component, state } = this.props;
    const { data, general, styling, error, element } = state;

    // Determine cell- and column separator width
    let cellWidth = '0px';
    let columnSeparatorWidth = '';
    if (!error && element) {
      const tableWidth = element.getBoundingClientRect().width;

      if (general.cellWidth) {
        cellWidth = general.cellWidth;
        if (general.useColumnSeparator) {
          columnSeparatorWidth = '8px';
        }
      } else {
        // 230 is the left "header", rest is magic margins
        const headerMarginRight = 8 + 230 + 20;
        const borderWidth = 1;
        const rowCellCount = data.matrix[0].length;

        let separatorCount = 0;
        let separatorWidth = 0;
        if (general.useColumnSeparator) {
          separatorCount = data.headers.dimension2.length - 1;
          separatorWidth = Math.min(
            Math.floor((tableWidth * 0.2) / separatorCount),
            8
          );
          columnSeparatorWidth = `${separatorWidth}px`;
        }

        const separatorWidthSum =
          (separatorWidth + borderWidth) * separatorCount;
        cellWidth = `${Math.floor(
          (tableWidth - separatorWidthSum - headerMarginRight - borderWidth) /
            rowCellCount) - borderWidth}px`;
      }
    }

    return (
      <div className="root">
        {error ? (
          <div className={`error ${editmodeClass}`}>
            {state.layout.errormessage}
          </div>
        ) : (
          <LinkedScrollWrapper>
            <div className={`kpi-table ${editmodeClass}`}>
              <HeadersTable
                cellWidth={cellWidth}
                columnSeparatorWidth={columnSeparatorWidth}
                component={component}
                data={data}
                general={general}
                isKpi
                styling={styling}
              />
              <LinkedScrollSection linkVertical>
                <DataTable
                  cellWidth={cellWidth}
                  columnSeparatorWidth={columnSeparatorWidth}
                  component={component}
                  data={data}
                  general={general}
                  renderData={false}
                  styling={styling}
                />
              </LinkedScrollSection>
            </div>
            <div
              className={`data-table ${editmodeClass}`}
              style={{ width: general.cellWidth ? 'auto' : '100%' }}
            >
              <LinkedScrollSection linkHorizontal>
                <HeadersTable
                  cellWidth={cellWidth}
                  columnSeparatorWidth={columnSeparatorWidth}
                  component={component}
                  data={data}
                  general={general}
                  isKpi={false}
                  styling={styling}
                />
              </LinkedScrollSection>
              <LinkedScrollSection linkHorizontal linkVertical>
                <DataTable
                  cellWidth={cellWidth}
                  columnSeparatorWidth={columnSeparatorWidth}
                  component={component}
                  data={data}
                  general={general}
                  styling={styling}
                />
              </LinkedScrollSection>
            </div>
          </LinkedScrollWrapper>
        )}
      </div>
    );
  }
}

Root.propTypes = {
  component: PropTypes.shape({}).isRequired,
  editmodeClass: PropTypes.string.isRequired,
  state: PropTypes.shape({
    data: PropTypes.object,
    general: PropTypes.object,
    styling: PropTypes.object
  }).isRequired
};

export default Root;
