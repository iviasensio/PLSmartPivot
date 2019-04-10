const qlik = window.require('qlik');

// fixes case for when there are 3 dimensions, missies the case with 1 design dimension and 1 data dimension
function hasDesignDimension (data) {
  return data.qHyperCubeDef.qDimensions.length > 2;
}

function getFieldList () {
  return new Promise(function (resolve) {
    const app = qlik.currApp();
    app.getList('FieldList').then(function (model) {
      // Close the model to prevent any updates.
      app.destroySessionObject(model.layout.qInfo.qId);

      // This is a bit iffy, might be smarter to reject and handle empty lists on the props instead.
      if (!model.layout.qFieldList.qItems) {
        return resolve([]);
      }
      // Resolve an array with master objects.
      return resolve(model.layout.qFieldList.qItems.map(function (item) {
        return {
          value: item.qName,
          label: item.qName
        };
      }));
    });
  });
}

const tableFormat = {
  type: 'items',
  label: 'Table Format',
  items: {
    StylingField: {
      ref: 'stylingfield',
      disabledRef: '',
      type: 'string',
      component: 'dropdown',
      label: 'Style with field',
      options: function () {
        return getFieldList().then(function (items) {
          items.unshift(
            {
              value: '',
              label: 'None'
            });
          return items;
        });
      }
    },
    IndentBool: {
      ref: 'indentbool',
      type: 'boolean',
      label: 'Indent',
      defaultValue: false,
      show: data => !hasDesignDimension(data)
    },
    SeparatorColumns: {
      ref: 'separatorcols',
      type: 'boolean',
      label: 'Separator Columns',
      defaultValue: false
    },
    rowEvenBGColor: {
      component: 'color-picker',
      defaultValue: {
        color: '#fff',
        index: 1
      },
      label: 'Even row background color',
      ref: 'rowEvenBGColor',
      type: 'object',
      dualOutput: true,
      show: data => !hasDesignDimension(data)
    },
    rowOddBGColor: {
      component: 'color-picker',
      defaultValue: {
        color: '#b6d7ea',
        index: 4
      },
      label: 'Odd row background color',
      ref: 'rowOddBGColor',
      type: 'object',
      dualOutput: true,
      show: data => !hasDesignDimension(data)
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
      show: data => !hasDesignDimension(data)
    },
    FontFamily: {
      ref: 'FontFamily',
      type: 'string',
      component: 'dropdown',
      label: 'FontFamily',
      options: [
        {
          value: 'QlikView Sans, -apple-system, sans-serif',
          label: 'QlikView Sans'
        },
        {
          value: 'Arial, -apple-system, sans-serif',
          label: 'Arial'
        },
        {
          value: 'Calibri, -apple-system, sans-serif',
          label: 'Calibri'
        },
        {
          value: 'Comic Sans MS, -apple-system, sans-serif',
          label: 'Comic Sans MS'
        },
        {
          value: 'MS Sans Serif, -apple-system, sans-serif',
          label: 'MS Sans Serif'
        },
        {
          value: 'Tahoma, -apple-system, sans-serif',
          label: 'Tahoma'
        },
        {
          value: 'Verdana, -apple-system, sans-serif',
          label: 'Verdana'
        }
      ],
      defaultValue: 'QlikView Sans, -apple-system, sans-serif'
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
      defaultValue: 1
    },
    textAlignment: {
      ref: 'cellTextAlignment',
      label: 'Cell Text alignment',
      component: 'buttongroup',
      options: [
        {
          value: 'left',
          label: 'Left'
        },
        {
          value: 'center',
          label: 'Center'
        },
        {
          value: 'right',
          label: 'Right'
        }
      ],
      defaultValue: 'right'
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

export default tableFormat;
