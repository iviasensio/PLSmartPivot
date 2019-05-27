import React from 'react';
import PropTypes from 'prop-types';
import HeadersTable from './headers-table/index.jsx';
import DataTable from './data-table/index.jsx';
import { LinkedScrollWrapper, LinkedScrollSection } from './linked-scroll';

const Root = ({ state, component, editmodeClass }) => (
  <div className="root">
    <LinkedScrollWrapper>
      <div className={`kpi-table ${editmodeClass}`}>
        <HeadersTable
          data={state.data}
          general={state.general}
          isKpi
          component={component}
          styling={state.styling}
        />
        <LinkedScrollSection linkVertical>
          <DataTable
            data={state.data}
            general={state.general}
            component={component}
            renderData={false}
            styling={state.styling}
          />
        </LinkedScrollSection>
      </div>
      <div className={`data-table ${editmodeClass}`}>
        <LinkedScrollSection linkHorizontal>
          <HeadersTable
            data={state.data}
            general={state.general}
            isKpi={false}
            component={component}
            styling={state.styling}
          />
        </LinkedScrollSection>
        <LinkedScrollSection
          linkHorizontal
          linkVertical
        >
          <DataTable
            data={state.data}
            general={state.general}
            component={component}
            styling={state.styling}
          />
        </LinkedScrollSection>
      </div>
    </LinkedScrollWrapper>
  </div>
);

Root.propTypes = {
  component: PropTypes.shape({}).isRequired,
  state: PropTypes.shape({
    data: PropTypes.object.isRequired,
    general: PropTypes.object.isRequired,
    styling: PropTypes.object.isRequired
  }).isRequired,
  editmodeClass: PropTypes.string.isRequired
};

export default Root;
