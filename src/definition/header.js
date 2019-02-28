const header = {
  type: 'items',
  label: 'Header Format',
  items: {
    Align: {
      ref: 'HeaderAlign',
      translation: 'Header Alignment',
      type: 'number',
      component: 'buttongroup',
      options: [
        {
          value: 1,
          label: 'Left'
        },
        {
          value: 2,
          label: 'Center'
        },
        {
          value: 3,
          label: 'Right'
        }
      ],
      defaultValue: 2
    },
    headercolors: {
      component: 'color-picker',
      defaultValue: {
        index: 6,
        color: '#4477aa'
      },
      label: 'Background Header Color',
      ref: 'HeaderColorSchema',
      type: 'object',
      dualOutput: true
    },
    HeaderTextColor: {
      ref: 'HeaderTextColorSchema',
      label: 'Text Header Color',
      component: 'color-picker',
      defaultValue: {
        index: 1,
        color: '#ffffff'
      },
      type: 'object',
      dualOutput: true
    },
    HeaderFontSize: {
      ref: 'lettersizeheader',
      translation: 'Font Size',
      type: 'number',
      component: 'buttongroup',
      options: [
        {
          value: 1,
          label: 'Small'
        },
        {
          value: 2,
          label: 'Medium'
        }
      ],
      defaultValue: 1
    }
  }
};

export default header;
