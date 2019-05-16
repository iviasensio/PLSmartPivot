import React from 'react';
import PropTypes from 'prop-types';
import { HEADER_FONT_SIZE } from '../initialize-transformed';
import Tooltip from '../tooltip/index.jsx';

class ColumnHeader extends React.PureComponent {
  constructor (props) {
    super(props);
    this.handleSelect = this.handleSelect.bind(this);
  }

  handleSelect () {
    const { entry, qlik } = this.props;
    qlik.backendApi.selectValues(1, [entry.elementNumber], true);
  }

  render () {
    const { baseCSS, cellWidth, colSpan, entry, styling, qlik } = this.props;
    const inEditState = qlik.inEditState();
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
  cellWidth: PropTypes.string,
  colSpan: PropTypes.number,
  entry: PropTypes.shape({
    elementNumber: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired
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
  styling: PropTypes.shape({
    headerOptions: PropTypes.shape({
      fontSizeAdjustment: PropTypes.number.isRequired
    }).isRequired
  }).isRequired
};

export default ColumnHeader;
