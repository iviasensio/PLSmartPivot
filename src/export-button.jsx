import React from 'react';
import PropTypes from 'prop-types';

// TODO: move interaction logic in here from excel-export.js
class ExportButton extends React.PureComponent {
  render () {
    const { excelExport } = this.props;
    return excelExport === true && (
      <input
        className="icon-xls"
        src="/Extensions/qlik-smart-pivot/Excel.png"
        type="image"
      />
    );
  }
}

ExportButton.defaultProps = {
  excelExport: false
};

ExportButton.propTypes = {
  excelExport: PropTypes.bool
};

export default ExportButton;
