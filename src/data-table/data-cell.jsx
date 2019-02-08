import React from 'react';
import PropTypes from 'prop-types';
import { ApplyPreMask } from '../masking';
import { addSeparators } from '../utilities';

function formatMeasurementValue (measurement, styling) {
  // TODO: measurement.name is a horrible propertyname, it's actually the column header
  const isColumnPercentageBased = measurement.name.substring(0, 1) === '%';
  let formattedMeasurementValue = '';
  if (isColumnPercentageBased) {
    if (isNaN(measurement.value)) {
      formattedMeasurementValue = styling.symbolForNulls;
    } else {
      formattedMeasurementValue = ApplyPreMask('0,00%', measurement.value);
    }
  } else {
    let magnitudeDivider;
    switch (measurement.magnitude.toLowerCase()) {
      case 'k':
        magnitudeDivider = 1000;
        break;
      case 'm':
        magnitudeDivider = 1000000;
        break;
      default:
        magnitudeDivider = 1;
    }
    const formattingStringWithoutMagnitude = measurement.format.replace(/k|K|m|M/gi, '');
    if (isNaN(measurement.value)) {
      formattedMeasurementValue = styling.symbolForNulls;
    } else {
      let preFormatValue = measurement.value;
      if (isColumnPercentageBased) {
        preFormatValue *= 100;
      }
      switch (formattingStringWithoutMagnitude) {
        case '#.##0':
          formattedMeasurementValue = addSeparators((preFormatValue / magnitudeDivider), '.', ',', 0);
          break;
        case '#,##0':
          formattedMeasurementValue = addSeparators((preFormatValue / magnitudeDivider), ',', '.', 0);
          break;
        default:
          formattedMeasurementValue = ApplyPreMask(
            formattingStringWithoutMagnitude,
            (preFormatValue / magnitudeDivider)
          );
          break;
      }
    }
  }
  return formattedMeasurementValue;
}

function getSemaphoreColors (measurement, semaphoreColors) {
  if (measurement < semaphoreColors.status.critical) {
    return semaphoreColors.statusColors.critical;
  }
  if (measurement < semaphoreColors.status.medium) {
    return semaphoreColors.statusColors.medium;
  }
  return semaphoreColors.statusColors.normal;
}

const DataCell = ({ data, general, measurement, styleBuilder, styling }) => {
  const isColumnPercentageBased = measurement.name.substring(0, 1) === '%';
  let formattedMeasurementValue = formatMeasurementValue(measurement, styling);
  if (styleBuilder.hasComments()) {
    formattedMeasurementValue = '.';
  }

  let cellStyle = {
    fontFamily: styling.options.fontFamily,
    ...styleBuilder.getStyle(),
    paddingRight: '4px',
    textAlign: 'right'

  };
  const { semaphoreColors } = styling;
  const isValidSemaphoreValue = !styleBuilder.hasComments() && !isNaN(measurement.value);
  const shouldHaveSemaphoreColors = semaphoreColors.fieldsToApplyTo.applyToAll || semaphoreColors.fieldsToApplyTo.specificFields.indexOf(measurement.name) !== -1;
  if (isValidSemaphoreValue && shouldHaveSemaphoreColors) {
    const { backgroundColor, color } = getSemaphoreColors(measurement, semaphoreColors);
    cellStyle = {
      backgroundColor,
      color,
      fontFamily: styling.options.fontFamily,
      fontSize: styleBuilder.getStyle().fontSize,
      paddingLeft: '4px',
      textAlign: 'right'
    };
  }

  let cellClass = 'grid-cells';
  const hasTwoDimensions = data.headers.dimension2 && data.headers.dimension2.length > 0;
  const shouldUseSmallCells = isColumnPercentageBased && data.headers.measurements.length > 1 && hasTwoDimensions;
  if (shouldUseSmallCells) {
    cellClass = 'grid-cells-small';
  }

  return (
    <td
      className={`${cellClass}${general.cellSuffix}`}
      style={cellStyle}
    >
      {formattedMeasurementValue}
    </td>
  );
};

DataCell.propTypes = {
  data: PropTypes.shape({
    headers: PropTypes.shape({
      measurements: PropTypes.array.isRequired
    }).isRequired
  }).isRequired,
  general: PropTypes.shape({
    cellSuffix: PropTypes.string.isRequired
  }).isRequired,
  measurement: PropTypes.shape({
    format: PropTypes.string,
    name: PropTypes.string,
    value: PropTypes.any
  }).isRequired,
  styleBuilder: PropTypes.shape({
    hasComments: PropTypes.func.isRequired
  }).isRequired,
  styling: PropTypes.shape({
    symbolForNulls: PropTypes.any.isRequired
  }).isRequired
};

export default DataCell;
