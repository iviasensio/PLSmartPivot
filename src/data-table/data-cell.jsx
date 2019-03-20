import React from 'react';
import PropTypes from 'prop-types';
import { ApplyPreMask } from '../masking';
import { addSeparators } from '../utilities';
import Tooltip from '../tooltip/index.jsx';

class DataCell extends React.PureComponent {
  constructor (props) {
    super(props);
    this.handleSelect = this.handleSelect.bind(this);
  }

  handleSelect () {
    const { data: { meta: { dimensionCount } }, general: { allowFilteringByClick }, measurement, qlik } = this.props;
    const hasSecondDimension = dimensionCount > 1;
    if (!allowFilteringByClick) {
      return;
    }

    qlik.backendApi.selectValues(0, [measurement.parents.dimension1.elementNumber], true);

    if (hasSecondDimension) {
      qlik.backendApi.selectValues(1, [measurement.parents.dimension2.elementNumber], true);
    }
  }

  render () {
    const {
      data,
      general,
      measurement,
      styleBuilder,
      styling
    } = this.props;

    const isColumnPercentageBased = (/%/).test(measurement.format);
    let formattedMeasurementValue = formatMeasurementValue(measurement, styling);
    if (styleBuilder.hasComments()) {
      formattedMeasurementValue = '.';
    }
    let textAlignment = 'Right';
    const textAlignmentProp = styling.options.textAlignment;
    if (textAlignmentProp) {
      textAlignment = textAlignmentProp;
    }

    let cellStyle = {
      fontFamily: styling.options.fontFamily,
      ...styleBuilder.getStyle(),
      paddingLeft: '5px',
      textAlign: textAlignment

    };

    const { semaphoreColors, semaphoreColors: { fieldsToApplyTo } } = styling;
    const isValidSemaphoreValue = !styleBuilder.hasComments() && !isNaN(measurement.value);
    const dimension1Row = measurement.parents.dimension1.elementNumber;
    const isSpecifiedMetricField = fieldsToApplyTo.metricsSpecificFields.indexOf(dimension1Row) !== -1;
    const shouldHaveSemaphoreColors = (fieldsToApplyTo.applyToMetric || isSpecifiedMetricField);
    if (isValidSemaphoreValue && shouldHaveSemaphoreColors) {
      const { backgroundColor, color } = getSemaphoreColors(measurement, semaphoreColors);
      cellStyle = {
        ...styleBuilder.getStyle(),
        backgroundColor,
        color,
        fontFamily: styling.options.fontFamily,
        paddingLeft: '5px',
        textAlign: textAlignment
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
        onClick={this.handleSelect}
        style={cellStyle}
      >
        <Tooltip
          tooltipText={formattedMeasurementValue}
        >
          {formattedMeasurementValue}
        </Tooltip>
      </td>
    );
  }
}

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
  qlik: PropTypes.shape({
    backendApi: PropTypes.shape({
      selectValues: function (props, propName) {
        if (props.isSnapshot || typeof props[propName] === 'function') {
          return null;
        }
        return new Error('Missing implementation of qlik.backendApi.selectValues.');
      }
    }).isRequired
  }).isRequired,
  styleBuilder: PropTypes.shape({
    hasComments: PropTypes.func.isRequired
  }).isRequired,
  styling: PropTypes.shape({
    symbolForNulls: PropTypes.any.isRequired
  }).isRequired
};

export default DataCell;

function formatMeasurementValue (measurement, styling) {
  const isColumnPercentageBased = (/%/).test(measurement.format);
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
  if (measurement.value < semaphoreColors.status.critical) {
    return semaphoreColors.statusColors.critical;
  }
  if (measurement.value < semaphoreColors.status.medium) {
    return semaphoreColors.statusColors.medium;
  }
  return semaphoreColors.statusColors.normal;
}
