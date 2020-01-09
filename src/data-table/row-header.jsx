import React from 'react';
import PropTypes from 'prop-types';
import HeaderPadding from './header-padding.jsx';
import Tooltip from '../tooltip/index.jsx';

class RowHeader extends React.PureComponent {
  constructor(props) {
    super(props);

    this.handleSelect = this.handleSelect.bind(this);
  }
  // fixes the console error on row selected values
  handleSelect() {
    const { component, entry } = this.props;
    component.selectValues(0, [entry.elementNumber], false);
  }

  render() {
    const { entry, rowStyle, styleBuilder, styling, component } = this.props;
    const inEditState = component.inEditState();

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
    displayValue: PropTypes.string.isRequired,
    elementNumber: PropTypes.number.isRequired
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
  rowStyle: PropTypes.shape({}).isRequired,
  styleBuilder: PropTypes.shape({}).isRequired,
  styling: PropTypes.shape({}).isRequired
};

export default RowHeader;
