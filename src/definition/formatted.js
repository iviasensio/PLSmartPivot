const formatted = {
  type: 'items',
  label: 'Table Format',
  items: {
    IndentBool: {
      ref: 'indentbool',
      type: 'boolean',
      label: 'Indent',
      defaultValue: true
    },
    SeparatorColumns: {
      ref: 'separatorcols',
      type: 'boolean',
      label: 'Separator Columns',
      defaultValue: false
    },
    CustomFileBool: {
      ref: 'customfilebool',
      type: 'boolean',
      label: 'Include External File',
      defaultValue: false
    },
    CustomFile: {
      ref: 'customfile',
      label: 'Name of CSV file (; separated)',
      type: 'string',
      defaultValue: '',
      show (data) {
        return data.customfilebool;
      }
    },
    colors: {
      ref: 'ColorSchema',
      type: 'string',
      component: 'dropdown',
      label: 'BackGround Style',
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
      defaultValue: 'Clean',
      show (data) {
        return !data.customfilebool;
      }
    },
    BodyTextColor: {
      ref: 'BodyTextColorSchema',
      type: 'string',
      component: 'dropdown',
      label: 'Text Body Color',
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
      defaultValue: 'Black',
      show (data) {
        return !data.customfilebool;
      }
    },
    FontFamily: {
      ref: 'FontFamily',
      type: 'string',
      component: 'dropdown',
      label: 'FontFamily',
      options: [
        {
          value: 'Arial',
          label: 'Arial'
        },
        {
          value: 'Calibri',
          label: 'Calibri'
        },
        {
          value: 'Comic Sans MS',
          label: 'Comic Sans MS'
        },
        {
          value: 'MS Sans Serif',
          label: 'MS Sans Serif'
        },
        {
          value: 'Tahoma',
          label: 'Tahoma'
        },
        {
          value: 'Verdana',
          label: 'Verdana'
        }
      ],
      defaultValue: 'Calibri'
    },
    DataFontSize: {
      ref: 'lettersize',
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
    },
    ColumnWidthSlider: {
      type: 'number',
      component: 'slider',
      label: 'Column Width',
      ref: 'columnwidthslider',
      min: 1,
      max: 3,
      step: 1,
      defaultValue: 2
    },
    SymbolForNulls: {
      ref: 'symbolfornulls',
      label: 'Symbol for Nulls',
      type: 'string',
      defaultValue: ' '
    },
    AllowExportXLS: {
      ref: 'allowexportxls',
      type: 'boolean',
      component: 'switch',
      label: 'Allow export to Excel',
      options: [
        {
          value: true,
          label: 'On'
        },
        {
          value: false,
          label: 'Off'
        }
      ],
      defaultValue: true
    },
    FilterOnCellClick: {
      ref: 'filteroncellclick',
      type: 'boolean',
      component: 'switch',
      label: 'Filter data when cell clicked',
      options: [
        {
          value: true,
          label: 'On'
        },
        {
          value: false,
          label: 'Off'
        }
      ],
      defaultValue: true
    }
  }
};

export default formatted;
