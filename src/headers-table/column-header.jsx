import React from 'react';
import PropTypes from 'prop-types';

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
    const { baseCSS, cellSuffix, colSpan, entry, styling } = this.props;
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
        style={style}
      >
        {entry.displayValue}
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
