import React from 'react';
import PropTypes from 'prop-types';
import Tooltip from '../tooltip/index.jsx';

class DataCell extends React.PureComponent {
  constructor (props) {
    super(props);
    this.handleSelect = this.handleSelect.bind(this);
  }

  handleSelect () {
    const {
      data: {
        meta: {
          dimensionCount
        }
      },
      general: {
        allowFilteringByClick
      },
      measurement,
      component
    } = this.props;

    const hasSecondDimension = dimensionCount > 1;
    if (!allowFilteringByClick) {
      return;
    }
// fixes the console error on selection made from data cells
    component.selectValues(0, [measurement.parents.dimension1.elementNumber], false);
    if (hasSecondDimension) {
      component.selectValues(1, [measurement.parents.dimension2.elementNumber], false);
    }
  }

  render () {
    const {
      cellWidth,
      measurement,
      styleBuilder,
      styling
    } = this.props;

    let textAlignment = styling.options.textAlignment || 'Right';

    let cellStyle = {
      fontFamily: styling.options.fontFamily,
      ...styleBuilder.getStyle(),
      paddingLeft: '5px',
      textAlign: textAlignment,
      minWidth: cellWidth,
      maxWidth: cellWidth
    };

    const isEmptyCell = measurement.displayValue === '';
    let formattedMeasurementValue;
    if (isEmptyCell || styleBuilder.hasComments()) {
      formattedMeasurementValue = '';
      cellStyle.cursor = 'default';
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

    return (
      <td
        className="grid-cells"
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
  cellWidth: PropTypes.string.isRequired,
  data: PropTypes.shape({
    headers: PropTypes.shape({
      measurements: PropTypes.array.isRequired
    }).isRequired,
    meta: PropTypes.shape({
      dimensionCount: PropTypes.number.isRequired
    }).isRequired
  }).isRequired,
  general: PropTypes.shape({}).isRequired,
  measurement: PropTypes.shape({
    format: PropTypes.string,
    name: PropTypes.string,
    value: PropTypes.any
  }).isRequired,
  component: PropTypes.shape({
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
  if (isNaN(measurement.value)) {
    return styling.symbolForNulls;
  }

  return measurement.displayValue;
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
