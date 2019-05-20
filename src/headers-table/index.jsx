import React from 'react';
import PropTypes from 'prop-types';
import ExportColumnHeader from './export-column-header.jsx';
import ColumnHeader from './column-header.jsx';
import MeasurementColumnHeader from './measurement-column-header.jsx';
import { injectSeparators } from '../utilities';

const HeadersTable = ({ data, general, component, styling, isKpi }) => {
  const baseCSS = {
    backgroundColor: styling.headerOptions.colorSchema,
    color: styling.headerOptions.textColor,
    fontFamily: styling.options.fontFamily,
    textAlign: styling.headerOptions.alignment
  };

  const {
    dimension1,
    dimension2,
    measurements
  } = data.headers;

  const hasSecondDimension = dimension2.length > 0;

  return (
    <div className="header-wrapper">
      <table className="header">
        <tbody>
          <tr>
            {isKpi ?
              <ExportColumnHeader
                component={component}
                allowExcelExport={general.allowExcelExport}
                baseCSS={baseCSS}
                general={general}
                hasSecondDimension={hasSecondDimension}
                styling={styling}
                title={dimension1[0].name}
              /> : null
            }
            {!isKpi && !hasSecondDimension && measurements.map(measurementEntry => (
              <MeasurementColumnHeader
                baseCSS={baseCSS}
                general={general}
                hasSecondDimension={hasSecondDimension}
                key={`${measurementEntry.displayValue}-${measurementEntry.name}`}
                measurement={measurementEntry}
                styling={styling}
              />
            ))}
            {!isKpi && hasSecondDimension && injectSeparators(dimension2, styling.useSeparatorColumns).map((entry, index) => {
              if (entry.isSeparator) {
                const separatorStyle = {
                  color: 'white',
                  fontFamily: styling.options.fontFamily,
                  fontSize: `${13 + styling.headerOptions.fontSizeAdjustment}px`
                };

                return (
                  <th
                    className="empty"
                    key={index}
                    style={separatorStyle}
                  >
                    *
                  </th>
                );
              }
              return (
                <ColumnHeader
                  altState={data.meta.altState}
                  baseCSS={baseCSS}
                  cellWidth={general.cellWidth}
                  colSpan={measurements.length}
                  entry={entry}
                  key={entry.displayValue}
                  component={component}
                  styling={styling}
                />
              );
            })}
          </tr>
          {!isKpi && hasSecondDimension && (
            <tr>
              {injectSeparators(dimension2, styling.useSeparatorColumns).map((dimensionEntry, index) => {
                if (dimensionEntry.isSeparator) {
                  const separatorStyle = {
                    color: 'white',
                    fontFamily: styling.options.fontFamily,
                    fontSize: `${12 + styling.headerOptions.fontSizeAdjustment}px`
                  };

                  return (
                    <th
                      className="empty"
                      key={index}
                      style={separatorStyle}
                    >
                      *
                    </th>
                  );
                }
                return measurements.map(measurementEntry => (
                  <MeasurementColumnHeader
                    baseCSS={baseCSS}
                    dimensionEntry={dimensionEntry}
                    general={general}
                    hasSecondDimension={hasSecondDimension}
                    key={`${measurementEntry.displayValue}-${measurementEntry.name}-${dimensionEntry.name}`}
                    measurement={measurementEntry}
                    styling={styling}
                  />
                ));
              })}
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

HeadersTable.propTypes = {
  data: PropTypes.shape({
    headers: PropTypes.shape({
      dimension1: PropTypes.array,
      dimension2: PropTypes.array,
      measurements: PropTypes.array
    }),
    meta: PropTypes.shape({
      altState: PropTypes.string.isRequired
    })
  }).isRequired,
  general: PropTypes.shape({}).isRequired,
  component: PropTypes.shape({}).isRequired,
  styling: PropTypes.shape({
    headerOptions: PropTypes.shape({}),
    options: PropTypes.shape({})
  }).isRequired,
  isKpi: PropTypes.bool.isRequired
};

export default HeadersTable;
