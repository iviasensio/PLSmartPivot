const pagination = {
  type: 'items',
  label: 'Pagination',
  items: {
    MaxPaginationLoops: {
      ref: 'maxloops',
      type: 'number',
      component: 'dropdown',
      label: 'Max pagination loops',
      options: [
        {
          value: 1,
          label: '10k cells'
        },
        {
          value: 2,
          label: '20k cells'
        },
        {
          value: 3,
          label: '30k cells'
        },
        {
          value: 4,
          label: '40k cells'
        },
        {
          value: 5,
          label: '50k cells'
        },
        {
          value: 6,
          label: '60k cells'
        },
        {
          value: 7,
          label: '70k cells'
        },
        {
          value: 8,
          label: '80k cells'
        },
        {
          value: 9,
          label: '90k cells'
        },
        {
          value: 10,
          label: '100k cells'
        }
      ],
      defaultValue: 2
    },
    ErrorMessage: {
      ref: 'errormessage',
      label: 'Default error message',
      type: 'string',
      defaultValue: 'Unable to display all the data. Apply more filters to limit the amount of displayed data.'
    }
  }
};

export default pagination;
