import React from 'react';
import PropTypes from 'prop-types';
import Tooltip from '../tooltip/index.jsx';

class ColumnHeader extends React.Component {
  constructor (props) {
    super(props);
    this.state = {
      showTooltip: false
    };
    this.handleEnter = this.handleEnter.bind(this);
    this.handleLeave = this.handleLeave.bind(this);
    this.handleSelect = this.handleSelect.bind(this);
  }

  shouldComponentUpdate (nextProps, nextState) {
    const { showTooltip } = this.state;
    if (showTooltip === nextState.showTooltip) {
      return false;
    }
    return true;
  }

  handleSelect () {
    const { entry, qlik } = this.props;
    qlik.backendApi.selectValues(1, [entry.elementNumber], true);
  }

  handleEnter () {
    this.setState({ showTooltip: true });
  }

  handleLeave () {
    this.setState({ showTooltip: false });
  }

  render () {
    const { baseCSS, cellSuffix, colSpan, entry, styling, qlik } = this.props;
    const { showTooltip } = this.state;
    const inEditState = qlik.inEditState();

    const style = {
      ...baseCSS,
      fontSize: `${14 + styling.headerOptions.fontSizeAdjustment} px`,
      height: '45px',
      verticalAlign: 'middle'
    };

    return (
      <th
        className={`grid-cells2${cellSuffix}`}
        colSpan={colSpan}
        onClick={this.handleSelect}
        onMouseOut={this.handleLeave}
        onMouseOver={this.handleEnter}
        style={style}
      >
        {entry.displayValue}
        {showTooltip && !inEditState
          ?
          <Tooltip>
            {entry.displayValue}
          </Tooltip> : null}
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
      selectValues: PropTypes.func.isRequired
    }).isRequired
  }).isRequired,
  styling: PropTypes.shape({
    headerOptions: PropTypes.shape({
      fontSizeAdjustment: PropTypes.number.isRequired
    }).isRequired
  }).isRequired
};

export default ColumnHeader;
