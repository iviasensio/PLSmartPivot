import React from 'react';
import PropTypes from 'prop-types';
import StyleBuilder from '../style-builder';
import DataCell from './data-cell.jsx';
import HeaderPadding from './header-padding.jsx';
import { injectSeparators } from '../utilities';

const DataTable = ({ data, general, styling }) => {
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
              <td
                className="fdim-cells"
                style={rowStyle}
              >
                <HeaderPadding
                  styleBuilder={styleBuilder}
                  styling={styling}
                />
                {dimensionEntry.displayValue}
              </td>
              {injectSeparators(
                matrix[dimensionIndex],
                styling.useSeparatorColumns,
                { atEvery: measurements.length }
              ).map(measurementData => {
                if (measurementData.isSeparator) {
                  const separatorStyle = {
                    color: 'white',
                    fontFamily: styling.options.fontFamily,
                    fontSize: `${12 + styling.options.fontSizeAdjustment}px`
                  };

                  return (
                    <td
                      className="empty"
                      key={`${dimensionEntry.displayValue}-${measurementData.name}-separator`}
                      style={separatorStyle}
                    >
                      *
                    </td>
                  );
                }
                return (
                  <DataCell
                    data={data}
                    general={general}
                    key={`${dimensionEntry.displayValue}-${measurementData.name}`}
                    measurement={measurementData}
                    styleBuilder={styleBuilder}
                    styling={styling}
                  />
                );
              })}
            </tr>
          );
        })}
      </table>
    </div>
  );
};

DataTable.propTypes = {
  data: PropTypes.shape({
    headers: PropTypes.shape({
      dimension1: PropTypes.array.isRequired
    }).isRequired,
    matrix: PropTypes.arrayOf(PropTypes.array.isRequired).isRequired
  }).isRequired,
  general: PropTypes.shape({}).isRequired,
  styling: PropTypes.shape({
    hasCustomFileStyle: PropTypes.bool.isRequired
  }).isRequired
};

export default DataTable;
