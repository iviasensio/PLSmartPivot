import React from 'react';
import PropTypes from 'prop-types';
import HeadersTable from './headers-table/index.jsx';
import DataTable from './data-table/index.jsx';
import { LinkedScrollWrapper, LinkedScrollSection } from './linked-scroll';

class Root extends React.PureComponent {
  constructor (props) {
    super(props);
    this.onDataTableRefSet = this.onDataTableRefSet.bind(this);
    this.renderedTableWidth = 0;
  }

  componentDidUpdate () {
    const tableWidth = this.dataTableRef.getBoundingClientRect().width;
    if (this.renderedTableWidth !== tableWidth) {
      this.forceUpdate();
    }
  }

  onDataTableRefSet (element) {
    this.dataTableRef = element;
    this.forceUpdate();
  }

  render () {
    const { editmodeClass, component, state } = this.props;
    const { data, general, styling } = state;

    // Determine cell- and column separator width
    let cellWidth = '0px';
    let columnSeparatorWidth = '';
    if (this.dataTableRef) {
      const tableWidth = this.dataTableRef.getBoundingClientRect().width;
      this.renderedTableWidth = tableWidth;

      if (general.cellWidth) {
        cellWidth = general.cellWidth;
        if (general.useColumnSeparator) {
          columnSeparatorWidth = '8px';
        }
      } else {
        const headerMarginRight = 8;
        const borderWidth = 1;
        const rowCellCount = data.matrix[0].length;

        let separatorCount = 0;
        let separatorWidth = 0;
        if (general.useColumnSeparator) {
          separatorCount = data.headers.dimension2.length - 1;
          separatorWidth = Math.min(Math.floor(tableWidth * 0.2 / separatorCount), 8);
          columnSeparatorWidth = `${separatorWidth}px`;
        }

        const separatorWidthSum = (separatorWidth + borderWidth) * separatorCount;
        cellWidth = `${Math.floor((tableWidth - separatorWidthSum - headerMarginRight - borderWidth)
          / rowCellCount) - borderWidth}px`;
      }
    }

    return (
      <div className="root">
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
            ref={this.onDataTableRefSet}
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
            <LinkedScrollSection
              linkHorizontal
              linkVertical
            >
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
      </div>
    );
  }
}

Root.propTypes = {
  component: PropTypes.shape({}).isRequired,
  editmodeClass: PropTypes.string.isRequired,
  state: PropTypes.shape({
    data: PropTypes.object.isRequired,
    general: PropTypes.object.isRequired,
    styling: PropTypes.object.isRequired
  }).isRequired
};

export default Root;
