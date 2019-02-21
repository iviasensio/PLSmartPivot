import React from 'react';
import PropTypes from 'prop-types';
import StyleBuilder from '../style-builder';
import DataCell from './data-cell.jsx';
import HeaderPadding from './header-padding.jsx';
import RowHeader from './row-header.jsx';
import { injectSeparators } from '../utilities';

class DataTable extends React.PureComponent {
  render () {
    const { data, general, qlik, renderData, styling } = this.props;
    const {
      headers: {
        dimension1,
        measurements
      },
      matrix
    } = data;

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
                  <RowHeader
                    entry={dimensionEntry}
                    qlik={qlik}
                    rowStyle={rowStyle}
                    styleBuilder={styleBuilder}
                    styling={styling}
                  />
                  {renderData && injectSeparators(
                    matrix[dimensionIndex],
                    styling.useSeparatorColumns,
                    { atEvery: measurements.length }
                  ).map((measurementData, index) => {
                    if (measurementData.isSeparator) {
                      const separatorStyle = {
                        color: 'white',
                        fontFamily: styling.options.fontFamily,
                        fontSize: `${12 + styling.options.fontSizeAdjustment}px`
                      };

                      return (
                        <td
                          className="empty"
                          key={`${dimensionEntry.displayValue}-${index}-separator`}
                          style={separatorStyle}
                        >
                          *
                        </td>
                      );
                    }
                    const { dimension1: dimension1Info, dimension2, measurement } = measurementData.parents;
                    const id = `${dimension1Info.elementNumber}-${dimension2 && dimension2.elementNumber}-${measurement.header}`;
                    return (
                      <DataCell
                        data={data}
                        general={general}
                        key={`${dimensionEntry.displayValue}-${id}`}
                        measurement={measurementData}
                        qlik={qlik}
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
  data: PropTypes.shape({
    headers: PropTypes.shape({
      dimension1: PropTypes.array.isRequired
    }).isRequired,
    matrix: PropTypes.arrayOf(PropTypes.array.isRequired).isRequired
  }).isRequired,
  general: PropTypes.shape({}).isRequired,
  qlik: PropTypes.shape({}).isRequired,
  renderData: PropTypes.bool,
  styling: PropTypes.shape({
    hasCustomFileStyle: PropTypes.bool.isRequired
  }).isRequired
};

export default DataTable;
