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

    const renderMeasurementData = (dimIndex, atEvery) => {
      if (dimension2.length <= 0) {
        return injectSeparators(
          matrix[dimIndex],
          columnSeparatorWidth,
          atEvery
        );
      }
      const measurementDataRow = [];
      let index = 0,
        match;
      dimension2.forEach(dim2 => {
        measurements.forEach((measure, mesInd) => {
          for (index = 0; index < matrix[dimIndex].length; index++) {
            match = false;
            if (
              matrix[dimIndex][index].parents &&
              dimension1[dimIndex].displayValue ===
                matrix[dimIndex][index].parents.dimension1.header
            ) {
              if (
                dim2.displayValue ===
                matrix[dimIndex][index].parents.dimension2.header
              ) {
                if (
                  measure.name ===
                  matrix[dimIndex][index].parents.measurement.header
                ) {
                  measurementDataRow.push(matrix[dimIndex][index]);
                  match = true;
                  break;
                }
              }
            }
          }
          if (!match) {
            measurementDataRow.push({
              displayValue: "",
              parents: {
                dimension1: {
                  elementNumber: dimension1[dimIndex].elementNumber,
                  header: dimension1[dimIndex].displayValue
                },
                dimension2: {
                  elementNumber: dim2.elementNumber,
                  header: dim2.displayValue
                },
                measurement: {
                  header: measure.name,
                  index: mesInd
                }
              }
            });
          }
        });
      });
      return injectSeparators(
        measurementDataRow,
        columnSeparatorWidth,
        atEvery
      );
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
                  {renderData && renderMeasurementData(dimensionIndex, { atEvery: measurements.length }).map((measurementData, index) => {
                    if (measurementData.isSeparator) {
                      return (
                        <td
                          className="empty"
                          key={`${dimensionEntry.displayValue}-${index}-separator`}
                          style={separatorStyle}
                        />
                      );
                    }

                    // eslint-disable-next-line no-shadow
                    const { dimension1: dimension1Info, dimension2, measurement } = measurementData.parents;
                    const id = `${dimension1Info.elementNumber}-${dimension2 && dimension2.elementNumber}-${measurement.header}-${measurement.index}`;
                    return (
                      <DataCell
                        cellWidth={cellWidth}
                        component={component}
                        data={data}
                        general={general}
                        key={`${dimensionEntry.displayValue}-${id}`}
                        measurement={measurementData}
                        styleBuilder={styleBuilder}
                        styling={styling}
                      />
                    );
                  })}
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
