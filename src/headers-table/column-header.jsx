import qlik from 'qlik';
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
    const { entry, altState, component } = this.props;
    const app = qlik.currApp(component);
    app.field(entry.name, altState).select([entry.elementNumber], false, false);
  }

  render () {
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
  entry: PropTypes.shape({
    displayValue: PropTypes.string.isRequired,
    elementNumber: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired
  }).isRequired,
  altState: PropTypes.string.isRequired,
  component: PropTypes.shape({}).isRequired,
  styling: PropTypes.shape({
    headerOptions: PropTypes.shape({
      fontSizeAdjustment: PropTypes.number.isRequired
    }).isRequired
  }).isRequired
};

export default ColumnHeader;
