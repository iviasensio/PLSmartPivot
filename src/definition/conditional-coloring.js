const conditionalColoring = {
  type: 'items',
  label: 'Color by condition',
  items: {
    Enabled: {
      ref: 'conditionalcoloring.enabled',
      type: 'boolean',
      label: 'Enabled',
      component: 'switch',
      defaultValue: false,
      options: [
        {
          value: true,
          label: 'On'
        },
        {
          value: false,
          label: 'Off'
        }
      ]
    },
    ColorAllRows: {
      ref: 'conditionalcoloring.colorall',
      type: 'boolean',
      label: 'Color all rows by condition',
      component: 'switch',
      defaultValue: true,
      options: [
        {
          value: true,
          label: 'All rows'
        },
        {
          value: false,
          label: 'Specified rows'
        }
      ],
      show (data) {
        return data.conditionalcoloring.enabled;
      }
    },
    Rows: {
      type: 'array',
      ref: 'conditionalcoloring.rows',
      label: 'Rows to color',
      itemTitleRef: function (data) {
        return data.rowname;
      },
      allowAdd: true,
      allowRemove: true,
      addTranslation: 'Add row to color',
      items: {
        Row: {
          ref: 'rowname',
          label: 'Name of row',
          type: 'string',
          defaultValue: ''
        }
      },
      show (data) {
        return data.conditionalcoloring.enabled && !data.conditionalcoloring.colorall;
      }
    },
    ColorAllMeasures: {
      ref: 'conditionalcoloring.colorallmeasures',
      type: 'boolean',
      label: 'Color all measures',
      component: 'switch',
      defaultValue: true,
      options: [
        {
          value: true,
          label: 'All measures'
        },
        {
          value: false,
          label: 'Specified measures'
        }
      ],
      show (data) {
        return data.conditionalcoloring.enabled;
      }
    },
    Measures: {
      ref: 'conditionalcoloring.measures',
      translation: 'Measure indices (ex: 0,3)',
      type: 'string',
      defaultValue: '',
      show (data) {
        return data.conditionalcoloring.enabled
          && data.conditionalcoloring.colorallmeasures === false;
      }
    },
    ThresholdPoor: {
      ref: 'conditionalcoloring.threshold_poor',
      translation: 'Poor is less than',
      type: 'number',
      defaultValue: -0.1,
      show (data) {
        return data.conditionalcoloring.enabled;
      }
    },
    ColorPoor: {
      ref: 'conditionalcoloring.color_poor',
      label: 'Poor color fill',
      type: 'object',
      component: 'color-picker',
      dualOutput: true,
      defaultValue: {
        index: 10,
        color: '#f93f17'
      },
      show (data) {
        return data.conditionalcoloring.enabled;
      }
    },
    TextColorPoor: {
      ref: 'conditionalcoloring.textcolor_poor',
      label: 'Poor text color',
      type: 'object',
      component: 'color-picker',
      dualOutput: true,
      defaultValue: {
        index: 1,
        color: '#ffffff'
      },
      show (data) {
        return data.conditionalcoloring.enabled;
      }
    },
    ThresholdFair: {
      ref: 'conditionalcoloring.threshold_fair',
      translation: 'Fair is less than',
      type: 'number',
      defaultValue: 0,
      show (data) {
        return data.conditionalcoloring.enabled;
      }
    },
    ColorFair: {
      ref: 'conditionalcoloring.color_fair',
      label: 'Fair color fill',
      type: 'object',
      component: 'color-picker',
      dualOutput: true,
      defaultValue: {
        index: 8,
        color: '#ffcf02'
      },
      show (data) {
        return data.conditionalcoloring.enabled;
      }
    },
    TextColorFair: {
      ref: 'conditionalcoloring.textcolor_fair',
      label: 'Fair text color',
      type: 'object',
      component: 'color-picker',
      dualOutput: true,
      defaultValue: {
        index: 15,
        color: '#000000'
      },
      show (data) {
        return data.conditionalcoloring.enabled;
      }
    },
    ColorGood: {
      ref: 'conditionalcoloring.color_good',
      label: 'Good color fill',
      type: 'object',
      component: 'color-picker',
      dualOutput: true,
      defaultValue: {
        index: 3,
        color: '#276e27'
      },
      show (data) {
        return data.conditionalcoloring.enabled;
      }
    },
    TextColorGood: {
      ref: 'conditionalcoloring.textcolor_good',
      label: 'Good text color',
      type: 'object',
      component: 'color-picker',
      dualOutput: true,
      defaultValue: {
        index: 1,
        color: '#ffffff'
      },
      show (data) {
        return data.conditionalcoloring.enabled;
      }
    }
  }
};

export default conditionalColoring;
