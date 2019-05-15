import qlik from 'qlik';
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
    const { entry, altState, component } = this.props;
    const app = qlik.currApp(component);
    app.field(entry.name, altState).select([entry.elementNumber], false, false);
  }

  render () {
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
    elementNumber: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired
  }).isRequired,
  altState: PropTypes.string.isRequired,
  component: PropTypes.shape({}).isRequired,
  rowStyle: PropTypes.shape({}).isRequired,
  styleBuilder: PropTypes.shape({}).isRequired,
  styling: PropTypes.shape({}).isRequired
};

export default RowHeader;
