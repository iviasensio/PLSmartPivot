/* eslint-disable object-shorthand */
/* eslint-disable space-before-function-paren */
import React from 'react';
import PropTypes from 'prop-types';
import { HEADER_FONT_SIZE } from '../initialize-transformed';
import Tooltip from '../tooltip/index.jsx';

class ColumnHeader extends React.PureComponent {
  constructor(props) {
    super(props);
    this.handleSelect = this.handleSelect.bind(this);
  }

  // fixes console error for column selected values
  handleSelect() {
    const { component, entry } = this.props;
    component.selectValues(1, [entry.elementNumber], false);
  }

  render() {
    const { baseCSS, cellWidth, colSpan, component, entry, styling } = this.props;
    const inEditState = component.inEditState();
    const isMediumFontSize = styling.headerOptions.fontSizeAdjustment === HEADER_FONT_SIZE.MEDIUM;

    const style = {
      ...baseCSS,
      fontSize: `${14 + styling.headerOptions.fontSizeAdjustment}px`,
      height: isMediumFontSize ? '43px' : '33px',
      verticalAlign: 'middle',
      minWidth: cellWidth,
      maxWidth: cellWidth
    };

    return (
      <th
        className="grid-cells"
        colSpan={colSpan}
        onClick={this.handleSelect}
        style={style}
      >
        <Tooltip
          isTooltipActive={!inEditState}
          styling={styling}
          tooltipText={entry.displayValue}
        >
          {entry.displayValue}
        </Tooltip>
      </th>
    );
  }
}

ColumnHeader.defaultProps = {
  colSpan: 1
};

ColumnHeader.propTypes = {
  baseCSS: PropTypes.shape({}).isRequired,
  cellWidth: PropTypes.string.isRequired,
  colSpan: PropTypes.number,
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
  entry: PropTypes.shape({
    displayValue: PropTypes.string.isRequired,
    elementNumber: PropTypes.number.isRequired
  }).isRequired,
  styling: PropTypes.shape({
    headerOptions: PropTypes.shape({
      fontSizeAdjustment: PropTypes.number.isRequired
    }).isRequired
  }).isRequired
};

export default ColumnHeader;
