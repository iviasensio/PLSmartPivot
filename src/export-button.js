import React from 'react';
import PropTypes from 'prop-types';

// TODO: move interaction logic in here from excel-export.js
class ExportButton extends React.PureComponent {
  render () {
    return this.props.excelExport === true && (
      <input className="icon-xls" type="image" src="/Extensions/PLSmartPivot/Excel.png" />
    );
  }
}

ExportButton.propTypes = {
  excelExport: PropTypes.bool
};

export default ExportButton;
