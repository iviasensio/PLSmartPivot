import React from 'react';
import PropTypes from 'prop-types';
import HeaderPadding from './header-padding.jsx';

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
    const { entry, rowStyle, styleBuilder, styling } = this.props;
    return (
      <td
        className="fdim-cells"
        onClick={this.handleSelect}
        style={rowStyle}
      >
        <HeaderPadding
          styleBuilder={styleBuilder}
          styling={styling}
        />
        {entry.displayValue}
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
      selectValues: PropTypes.func.isRequired
    }).isRequired
  }).isRequired,
  rowStyle: PropTypes.shape({}).isRequired,
  styleBuilder: PropTypes.shape({}).isRequired,
  styling: PropTypes.shape({}).isRequired
};

export default RowHeader;
