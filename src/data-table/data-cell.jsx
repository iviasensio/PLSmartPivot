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

    qlik.backendApi.selectValues(0, [measurement.parents.dimension1.elementNumber], false);

    if (hasSecondDimension) {
      qlik.backendApi.selectValues(1, [measurement.parents.dimension2.elementNumber], false);
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

    let textAlignment = styling.options.textAlignment || 'Right';

    let cellStyle = {
      fontFamily: styling.options.fontFamily,
      ...styleBuilder.getStyle(),
      paddingLeft: '5px',
      textAlign: textAlignment
    };

    const isEmptyCell = measurement.displayValue === '';
    const isColumnPercentageBased = (/%/).test(measurement.format);
    let formattedMeasurementValue;
    if (isEmptyCell) {
      formattedMeasurementValue = '';
      cellStyle.cursor = 'default';
    } else if (styleBuilder.hasComments()) {
      formattedMeasurementValue = '.';
    } else {
      formattedMeasurementValue = formatMeasurementValue(measurement, styling);
    }

    const { conditionalColoring } = styling;
    if (conditionalColoring.enabled) {
      const isValidConditionalColoringValue = !styleBuilder.hasComments() && !isNaN(measurement.value);
      const isSpecifiedRow =
        conditionalColoring.rows.indexOf(measurement.parents.dimension1.header) !== -1;
      const isSpecifiedMeasure =
        conditionalColoring.measures.indexOf(measurement.parents.measurement.index) !== -1;
      const shouldHaveConditionalColoring = (conditionalColoring.colorAllRows || isSpecifiedRow)
        && (conditionalColoring.colorAllMeasures || isSpecifiedMeasure);
      if (isValidConditionalColoringValue && shouldHaveConditionalColoring) {
        const { color, textColor } = getConditionalColor(measurement, conditionalColoring);
        cellStyle.backgroundColor = color.color;
        cellStyle.color = textColor.color;
      }
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
        onClick={isEmptyCell ? null : this.handleSelect}
        style={cellStyle}
      >
        <Tooltip
          styling={styling}
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

function getConditionalColor (measurement, conditionalColoring) {
  if (measurement.value < conditionalColoring.threshold.poor) {
    return conditionalColoring.colors.poor;
  }
  if (measurement.value < conditionalColoring.threshold.fair) {
    return conditionalColoring.colors.fair;
  }
  return conditionalColoring.colors.good;
}
