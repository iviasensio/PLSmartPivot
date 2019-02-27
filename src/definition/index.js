import pagination from './pagination';
import header from './header';
import tableFormat from './table-format';
import conceptSemaphores from './concept-semaphores';
import metricSemaphores from './metric-semaphores';

const definition = {
  component: 'accordion',
  items: {
    data: {
      items: {
        dimensions: {
          disabledRef: ''
        },
        measures: {
          disabledRef: ''
        }
      },
      uses: 'data'
    },
    settings: {
      items: {
        ConceptSemaphores: conceptSemaphores,
        Formatted: tableFormat,
        Header: header,
        MetricSemaphores: metricSemaphores,
        Pagination: pagination
      },
      uses: 'settings'
    },
    sorting: {
      uses: 'sorting'
    }
  },
  type: 'items'
};

export default definition;
