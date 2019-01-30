const pagination = {
  type: 'items',
  label: 'Pagination',
  items: {
    MaxPaginationLoops: {
      ref: 'maxloops',
      type: 'number',
      component: 'dropdown',
      label: 'Max Pagination Loops',
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
      defaultValue: 'Ups! It seems you asked for too many data. Please filter more to see the whole picture.'
    }
  }
};

export default pagination;
