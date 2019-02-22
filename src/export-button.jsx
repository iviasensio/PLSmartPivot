import React from 'react';
import PropTypes from 'prop-types';
import { exportXLS } from './excel-export';

class ExportButton extends React.PureComponent {
  constructor (props) {
    super(props);
    this.handleExport = this.handleExport.bind(this);
  }

  handleExport () {
    const { excelExport, general } = this.props;
    const { title, subtitle, footnote } = general;
    if (excelExport) {
      exportXLS(title, subtitle, footnote);
    }
  }

  render () {
    const { excelExport } = this.props;
    return excelExport === true && (
      <input
        className="icon-xls"
        onClick={this.handleExport}
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
  excelExport: PropTypes.bool,
  general: PropTypes.shape({}).isRequired
};

export default ExportButton;
