import React from 'react';
import PropTypes from 'prop-types';
import HeaderPadding from './header-padding.jsx';
import Tooltip from '../tooltip/index.jsx';

class RowHeader extends React.PureComponent {
  constructor (props) {
    super(props);

    this.handleSelect = this.handleSelect.bind(this);
  }

  handleSelect () {
    const { entry, qlik } = this.props;
    qlik.backendApi.selectValues(0, [entry.elementNumber], true);
  }

  render () {
    const { entry, rowStyle, styleBuilder, styling, qlik } = this.props;
    const inEditState = qlik.inEditState();

    return (
      <td
        className="fdim-cells"
        onClick={this.handleSelect}
        style={rowStyle}
      >
        <Tooltip
          isTooltipActive={!inEditState}
          styling={styling}
          tooltipText={entry.displayValue}
        >
          <HeaderPadding
            styleBuilder={styleBuilder}
            styling={styling}
          />
          {entry.displayValue}
        </Tooltip>
      </td>
    );
  }
}

RowHeader.propTypes = {
  entry: PropTypes.shape({
    displayValue: PropTypes.string.isRequired
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
  rowStyle: PropTypes.shape({}).isRequired,
  styleBuilder: PropTypes.shape({}).isRequired,
  styling: PropTypes.shape({}).isRequired
};

export default RowHeader;
