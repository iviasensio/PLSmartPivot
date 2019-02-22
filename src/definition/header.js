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
      ref: 'HeaderColorSchema',
      type: 'string',
      component: 'dropdown',
      label: 'Background Header Color',
      options: [
        {
          value: 'Clean',
          label: 'Clean'
        },
        {
          value: 'Soft',
          label: 'Soft'
        },
        {
          value: 'Dark',
          label: 'Dark'
        },
        {
          value: 'Night',
          label: 'Night'
        },
        {
          value: 'Blue',
          label: 'Blue'
        },
        {
          value: 'Orange',
          label: 'Orange'
        },
        {
          value: 'Red',
          label: 'Red'
        },
        {
          value: 'Green',
          label: 'Green'
        },
        {
          value: 'Violete',
          label: 'Violete'
        },
        {
          value: 'Custom',
          label: 'Custom'
        }
      ],
      defaultValue: 'Night'
    },
    HeaderTextColor: {
      ref: 'HeaderTextColorSchema',
      type: 'string',
      component: 'dropdown',
      label: 'Text Header Color',
      options: [
        {
          value: 'Black',
          label: 'Black'
        },
        {
          value: 'DimGray',
          label: 'DimGray'
        },
        {
          value: 'ForestGreen',
          label: 'ForestGreen'
        },
        {
          value: 'Gainsboro',
          label: 'Gainsboro'
        },
        {
          value: 'Indigo',
          label: 'Indigo'
        },
        {
          value: 'Navy',
          label: 'Navy'
        },
        {
          value: 'Purple',
          label: 'Purple'
        },
        {
          value: 'WhiteSmoke',
          label: 'WhiteSmoke'
        },
        {
          value: 'White',
          label: 'White'
        },
        {
          value: 'YellowGreen',
          label: 'YellowGreen'
        }
      ],
      defaultValue: 'WhiteSmoke'
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
