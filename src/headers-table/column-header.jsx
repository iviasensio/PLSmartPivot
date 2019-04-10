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
    const { baseCSS, cellSuffix, colSpan, entry, styling, qlik } = this.props;
    const inEditState = qlik.inEditState();
    const isMediumFontSize = styling.headerOptions.fontSizeAdjustment === HEADER_FONT_SIZE.MEDIUM;

    const style = {
      ...baseCSS,
      fontSize: `${14 + styling.headerOptions.fontSizeAdjustment}px`,
      height: isMediumFontSize ? '45px' : '35px',
      verticalAlign: 'middle'
    };

    return (
      <th
        className={`grid-cells2${cellSuffix}`}
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
  cellSuffix: '',
  colSpan: 1
};

ColumnHeader.propTypes = {
  baseCSS: PropTypes.shape({}).isRequired,
  cellSuffix: PropTypes.string,
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
