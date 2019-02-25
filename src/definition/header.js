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
        color: "#4477aa"
      },
      dualOutput: true,
      label: 'BackGround Header Color',
      ref: 'HeaderColorSchema',
      type: 'object'
    },
    HeaderTextColor: {
      ref: 'HeaderTextColorSchema',
      label: 'Text Header Color',
      component: 'color-picker',
      dualOutput: true,
      defaultValue: {
        index: 1,
        color: "#ffffff"
      },
      type: 'object'
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
      defaultValue: 2
    }
  }
};

export default header;
