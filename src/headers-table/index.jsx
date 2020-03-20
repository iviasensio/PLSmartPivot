import React from 'react';
import PropTypes from 'prop-types';
import Dim1Header from './dim1-header.jsx';
import ColumnHeader from './column-header.jsx';
import MeasurementColumnHeader from './measurement-column-header.jsx';
import { injectSeparators } from '../utilities';

class HeadersTable extends React.PureComponent {
  render () {
    const {
      cellWidth,
      columnSeparatorWidth,
      component,
      data,
      isKpi,
      styling
    } = this.props;

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

    const separatorStyle = {
      minWidth: columnSeparatorWidth,
      maxWidth: columnSeparatorWidth
    };

    return (
      <div className="header-wrapper">
        <table className="header">
          <tbody>
            <tr>
              {isKpi ?
                <Dim1Header
                  baseCSS={baseCSS}
                  component={component}
                  hasSecondDimension={hasSecondDimension}
                  styling={styling}
                  title={dimension1[0].name}
                /> : null
              }
              {!isKpi && !hasSecondDimension && measurements.map(measurementEntry => (
                <MeasurementColumnHeader
                  baseCSS={baseCSS}
                  cellWidth={cellWidth}
                  hasSecondDimension={hasSecondDimension}
                  key={`${measurementEntry.displayValue}-${measurementEntry.name}-${measurementEntry.index}`}
                  measurement={measurementEntry}
                  styling={styling}
                />
              ))}
              {!isKpi && hasSecondDimension && injectSeparators(dimension2, columnSeparatorWidth).map((entry, index) => {
                if (entry.isSeparator) {
                  return (
                    <th
                      className="empty"
                      key={index}
                      style={separatorStyle}
                    />
                  );
                }
                return (
                  <ColumnHeader
                    baseCSS={baseCSS}
                    cellWidth={cellWidth}
                    colSpan={measurements.length}
                    component={component}
                    entry={entry}
                    key={`${entry.displayValue}-${index}-separator`}
                    styling={styling}
                  />
                );
              })}
            </tr>
            {!isKpi && hasSecondDimension && (
              <tr>
                {injectSeparators(dimension2, columnSeparatorWidth).map((dimensionEntry, index) => {
                  if (dimensionEntry.isSeparator) {
                    return (
                      <th
                        className="empty"
                        key={index}
                        style={separatorStyle}
                      />
                    );
                  }
                  return measurements.map(measurementEntry => (
                    <MeasurementColumnHeader
                      baseCSS={baseCSS}
                      cellWidth={cellWidth}
                      dimensionEntry={dimensionEntry}
                      hasSecondDimension={hasSecondDimension}
                      key={`${measurementEntry.displayValue}-${measurementEntry.name}-${measurementEntry.index}-${dimensionEntry.name}`}
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
  }
}

HeadersTable.propTypes = {
  cellWidth: PropTypes.string.isRequired,
  columnSeparatorWidth: PropTypes.string.isRequired,
  data: PropTypes.shape({
    headers: PropTypes.shape({
      dimension1: PropTypes.array,
      dimension2: PropTypes.array,
      measurements: PropTypes.array
    })
  }).isRequired,
  component: PropTypes.shape({}).isRequired,
  styling: PropTypes.shape({
    headerOptions: PropTypes.shape({}),
    options: PropTypes.shape({})
  }).isRequired,
  isKpi: PropTypes.bool.isRequired
};

export default HeadersTable;
