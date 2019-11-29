import React from 'react';
import PropTypes from 'prop-types';
import StyleBuilder from '../style-builder';
import DataCell from './data-cell.jsx';
import RowHeader from './row-header.jsx';
import { injectSeparators } from '../utilities';

// eslint-disable-next-line react/prefer-stateless-function
class DataTable extends React.PureComponent {
  render () {
    const {
      cellWidth,
      columnSeparatorWidth,
      component,
      data,
      general,
      renderData,
      styling
    } = this.props;

    const {
      headers: {
        dimension1,
        dimension2,
        measurements
      },
      matrix
    } = data;

    const separatorStyle = {
      minWidth: columnSeparatorWidth,
      maxWidth: columnSeparatorWidth
    };

    const renderMeasurementData = (dimIndex, atEvery, styleBuilder) => {
      const injectSeparatorsArray = injectSeparators(
        matrix[dimIndex],
        columnSeparatorWidth,
        atEvery
      );

      let measurementData;
      injectSeparatorsArray.forEach((matrixRow) => {
        if (dimension1[dimIndex].displayValue === matrixRow.parents.dimension1.header) {
          dimension2.forEach((dim2) => {
            if (dim2.displayValue === matrixRow.parents.dimension2.header) {
              measurementData = matrixRow;
            }
          });
        }
        if (measurementData && measurementData.isSeparator) {
          return (
            <td
              className="empty"
              key={`${dimension1.displayValue}-${dimIndex}-separator`}
              style={separatorStyle}
            />
          );
        }
        const id = `${dimension1.elementNumber}-${dimension2 && dimension2.elementNumber}-${measurementData.header}-${measurementData.index}`;
        return (
          <DataCell
            cellWidth={cellWidth}
            component={component}
            data={data}
            general={general}
            key={`${dimension1.displayValue}-${id}`}
            measurement={measurementData}
            styleBuilder={styleBuilder}
            styling={styling}
          />
        );
      });
    };

    return (
      <div className="row-wrapper">
        <table>
          <tbody>
            {dimension1.map((dimensionEntry, dimensionIndex) => {
              const rowHeaderText = dimensionEntry.displayValue || '';
              if (rowHeaderText === '-') {
                return null;
              }
              const styleBuilder = new StyleBuilder(styling);
              if (styling.hasCustomFileStyle) {
                styleBuilder.parseCustomFileStyle(rowHeaderText);
              } else {
                styleBuilder.applyStandardAttributes(dimensionIndex);
                styleBuilder.applyCustomStyle({
                  fontSize: `${14 + styling.options.fontSizeAdjustment}px`
                });
              }
              const rowStyle = {
                fontFamily: styling.options.fontFamily,
                width: '230px',
                ...styleBuilder.getStyle()
              };

              return (
                <tr key={dimensionEntry.displayValue}>
                  {!renderData ?
                    <RowHeader
                      component={component}
                      entry={dimensionEntry}
                      rowStyle={rowStyle}
                      styleBuilder={styleBuilder}
                      styling={styling}
                    /> : null
                  }
                  {renderData && renderMeasurementData(dimensionIndex, { atEvery: measurements.length }, styleBuilder)}
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    );
  }
}

DataTable.defaultProps = {
  renderData: true
};

DataTable.propTypes = {
  cellWidth: PropTypes.string.isRequired,
  columnSeparatorWidth: PropTypes.string.isRequired,
  component: PropTypes.shape({}).isRequired,
  data: PropTypes.shape({
    headers: PropTypes.shape({
      dimension1: PropTypes.array.isRequired
    }).isRequired,
    matrix: PropTypes.arrayOf(PropTypes.array.isRequired).isRequired
  }).isRequired,
  general: PropTypes.shape({}).isRequired,
  renderData: PropTypes.bool,
  styling: PropTypes.shape({
    hasCustomFileStyle: PropTypes.bool.isRequired
  }).isRequired
};

export default DataTable;
