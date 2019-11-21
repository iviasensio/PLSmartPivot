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
        }
      ],
      defaultValue: 2
    },
    ErrorMessage: {
      ref: 'errormessage',
      label: 'Default error message',
      type: 'string',
      defaultValue: `Unable to display all the data. 
      Change the pagination size supported or apply more filters to limit the amount of displayed data.`
    }
  }
};

export default pagination;
