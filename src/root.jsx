import React from 'react';
import PropTypes from 'prop-types';
import HeadersTable from './headers-table/index.jsx';
import DataTable from './data-table/index.jsx';

const Root = ({ state, qlik }) => (
  <React.Fragment>
    <div className="kpi-table">
      <HeadersTable
        data={state.data}
        general={state.general}
        qlik={qlik}
        styling={state.styling}
      />
      <DataTable
        data={state.data}
        general={state.general}
        qlik={qlik}
        renderData={false}
        styling={state.styling}
      />
    </div>
    <div className="data-table">
      <HeadersTable
        data={state.data}
        general={state.general}
        qlik={qlik}
        styling={state.styling}
      />
      <DataTable
        data={state.data}
        general={state.general}
        qlik={qlik}
        styling={state.styling}
      />
    </div>
  </React.Fragment>
);

Root.propTypes = {
  qlik: PropTypes.shape({}).isRequired,
  state: PropTypes.shape({
    data: PropTypes.object.isRequired,
    general: PropTypes.object.isRequired,
    styling: PropTypes.object.isRequired
  }).isRequired
};

export default Root;
