
import $ from 'jquery';
import style from 'text-loader!./PLSmartPivot.css';
import paint from './paint';

$('<style>').html(style).appendTo('head');

export default {
  initialProperties: {
    version: 1.0,
    qHyperCubeDef: {
      qDimensions: [],
      qMeasures: [],
      qInitialDataFetch: [{
        qWidth: 10,
        qHeight: 1000
      }]
    },
  },
  definition: {
    type: 'items',
    component: 'accordion',
    items: {
      dimensions: {
        uses: 'dimensions',
        min: 1,
        max: 2
      },
      measures: {
        uses: 'measures',
        min: 1,
        max: 9
      },
      sorting: {
        uses: 'sorting'
      },

      settings: {
        uses: 'settings',
        items: {
          Pagination: {
            type: 'items',
            label: 'Pagination',
            items: {
              MaxPaginationLoops: {
                ref: 'maxloops',
                type: 'number',
                component: 'dropdown',
                label: 'Max Pagination Loops',
                options:
                  [{
                    value: 1,
                    label: '10k cells'
                  }, {
                    value: 2,
                    label: '20k cells'
                  }, {
                    value: 3,
                    label: '30k cells'
                  }, {
                    value: 4,
                    label: '40k cells'
                  }, {
                    value: 5,
                    label: '50k cells'
                  }, {
                    value: 6,
                    label: '60k cells'
                  }, {
                    value: 7,
                    label: '70k cells'
                  }, {
                    value: 8,
                    label: '80k cells'
                  }, {
                    value: 9,
                    label: '90k cells'
                  }, {
                    value: 10,
                    label: '100k cells'
                  }

                  ],
                defaultValue: 2,
              },
              ErrorMessage: {
                ref: 'errormessage',
                label: 'Default error message',
                type: 'string',
                defaultValue: 'Ups! It seems you asked for too many data. Please filter more to see the whole picture.',
              },
            },
          },
          Header: {
            type: 'items',
            label: 'Header Format',
            items: {
              Align: {
                ref: 'HeaderAlign',
                translation: 'Header Alignment',
                type: 'number',
                component: 'buttongroup',
                options: [{
                  value: 1,
                  label: 'Left'
                }, {
                  value: 2,
                  label: 'Center'
                }, {
                  value: 3,
                  label: 'Right'
                }],
                defaultValue: 2,
              },
              headercolors: {
                ref: 'HeaderColorSchema',
                type: 'string',
                component: 'dropdown',
                label: 'BackGround Header Color',
                options:
                  [{
                    value: 'Clean',
                    label: 'Clean'
                  }, {
                    value: 'Soft',
                    label: 'Soft'
                  }, {
                    value: 'Dark',
                    label: 'Dark'
                  }, {
                    value: 'Night',
                    label: 'Night'
                  }, {
                    value: 'Blue',
                    label: 'Blue'
                  }, {
                    value: 'Orange',
                    label: 'Orange'
                  }, {
                    value: 'Red',
                    label: 'Red'
                  }, {
                    value: 'Green',
                    label: 'Green'
                  }, {
                    value: 'Violete',
                    label: 'Violete'
                  }, {
                    value: 'Custom',
                    label: 'Custom'
                  }

                  ],
                defaultValue: 'Night',
              },
              HeaderTextColor: {
                ref: 'HeaderTextColorSchema',
                type: 'string',
                component: 'dropdown',
                label: 'Text Header Color',
                options:
                  [{
                    value: 'Black',
                    label: 'Black'
                  }, {
                    value: 'DimGray',
                    label: 'DimGray'
                  }, {
                    value: 'ForestGreen',
                    label: 'ForestGreen'
                  }, {
                    value: 'Gainsboro',
                    label: 'Gainsboro'
                  }, {
                    value: 'Indigo',
                    label: 'Indigo'
                  }, {
                    value: 'Navy',
                    label: 'Navy'
                  }, {
                    value: 'Purple',
                    label: 'Purple'
                  }, {
                    value: 'WhiteSmoke',
                    label: 'WhiteSmoke'
                  }, {
                    value: 'White',
                    label: 'White'
                  }, {
                    value: 'YellowGreen',
                    label: 'YellowGreen'
                  }
                  ],
                defaultValue: 'WhiteSmoke',
              },
              HeaderFontSize: {
                ref: 'lettersizeheader',
                translation: 'Font Size',
                type: 'number',
                component: 'buttongroup',
                options: [{
                  value: 1,
                  label: 'Small'
                }, {
                  value: 2,
                  label: 'Medium'
                  //}, {
                  //	value: 3,
                  //	label: "Large"
                }],
                defaultValue: 2
              },
            }
          },
          Formatted: {
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
                show: function (data) {
                  return data.customfilebool;
                }
              },
              colors: {
                ref: 'ColorSchema',
                type: 'string',
                component: 'dropdown',
                label: 'BackGround Style',
                options:
                  [{
                    value: 'Clean',
                    label: 'Clean'
                  }, {
                    value: 'Soft',
                    label: 'Soft'
                  }, {
                    value: 'Dark',
                    label: 'Dark'
                  }, {
                    value: 'Night',
                    label: 'Night'
                  }, {
                    value: 'Blue',
                    label: 'Blue'
                  }, {
                    value: 'Orange',
                    label: 'Orange'
                  }, {
                    value: 'Red',
                    label: 'Red'
                  }, {
                    value: 'Green',
                    label: 'Green'
                  }, {
                    value: 'Violete',
                    label: 'Violete'
                  }, {
                    value: 'Custom',
                    label: 'Custom'
                  }

                  ],
                defaultValue: 'Clean',
                show: function (data) {
                  return data.customfilebool == false;
                }
              },
              BodyTextColor: {
                ref: 'BodyTextColorSchema',
                type: 'string',
                component: 'dropdown',
                label: 'Text Body Color',
                options:
                  [{
                    value: 'Black',
                    label: 'Black'
                  }, {
                    value: 'DimGray',
                    label: 'DimGray'
                  }, {
                    value: 'ForestGreen',
                    label: 'ForestGreen'
                  }, {
                    value: 'Gainsboro',
                    label: 'Gainsboro'
                  }, {
                    value: 'Indigo',
                    label: 'Indigo'
                  }, {
                    value: 'Navy',
                    label: 'Navy'
                  }, {
                    value: 'Purple',
                    label: 'Purple'
                  }, {
                    value: 'WhiteSmoke',
                    label: 'WhiteSmoke'
                  }, {
                    value: 'White',
                    label: 'White'
                  }, {
                    value: 'YellowGreen',
                    label: 'YellowGreen'
                  }
                  ],
                defaultValue: 'Black',
                show: function (data) {
                  return data.customfilebool == false;
                }
              },
              FontFamily: {
                ref: 'FontFamily',
                type: 'string',
                component: 'dropdown',
                label: 'FontFamily',
                options:
                  [{
                    value: 'Arial',
                    label: 'Arial'
                  }, {
                    value: 'Calibri',
                    label: 'Calibri'
                  }, {
                    value: 'Comic Sans MS',
                    label: 'Comic Sans MS'
                  }, {
                    value: 'MS Sans Serif',
                    label: 'MS Sans Serif'
                  }, {
                    value: 'Tahoma',
                    label: 'Tahoma'
                  }, {
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
                options: [{
                  value: 1,
                  label: 'Small'
                }, {
                  value: 2,
                  label: 'Medium'
                  //}, {
                  //	value: 3,
                  //	label: "Large"
                }],
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
                options: [{
                  value: true,
                  label: 'On'
                }, {
                  value: false,
                  label: 'Off'
                }],
                defaultValue: true
              },
              FilterOnCellClick: {
                ref: 'filteroncellclick',
                type: 'boolean',
                component: 'switch',
                label: 'Filter data when cell clicked',
                options: [{
                  value: true,
                  label: 'On'
                }, {
                  value: false,
                  label: 'Off'
                }],
                defaultValue: true
              }
            }
          },
          ConceptSemaphores: {
            type: 'items',
            label: 'Concept Semaphores',
            items: {
              AllConcepts: {
                ref: 'allsemaphores',
                type: 'boolean',
                component: 'switch',
                label: 'All concepts affected',
                options: [{
                  value: true,
                  label: 'On'
                }, {
                  value: false,
                  label: 'Off'
                }],
                defaultValue: true
              },
              ConceptsAffected1: {
                ref: 'conceptsemaphore1',
                translation: 'Concept 1',
                type: 'string',
                defaultValue: '',
                show: function (data) {
                  return data.allsemaphores == false;
                }
              },
              ConceptsAffected2: {
                ref: 'conceptsemaphore2',
                translation: 'Concept 2',
                type: 'string',
                defaultValue: '',
                show: function (data) {
                  return data.allsemaphores == false;
                }
              },
              ConceptsAffected3: {
                ref: 'conceptsemaphore3',
                translation: 'Concept 3',
                type: 'string',
                defaultValue: '',
                show: function (data) {
                  return data.allsemaphores == false;
                }
              },
              ConceptsAffected4: {
                ref: 'conceptsemaphore4',
                translation: 'Concept 4',
                type: 'string',
                defaultValue: '',
                show: function (data) {
                  return data.allsemaphores == false;
                }
              },
              ConceptsAffected5: {
                ref: 'conceptsemaphore5',
                translation: 'Concept 5',
                type: 'string',
                defaultValue: '',
                show: function (data) {
                  return data.allsemaphores == false;
                }
              },
              ConceptsAffected6: {
                ref: 'conceptsemaphore6',
                translation: 'Concept 6',
                type: 'string',
                defaultValue: '',
                show: function (data) {
                  return data.allsemaphores == false;
                }
              },
              ConceptsAffected7: {
                ref: 'conceptsemaphore7',
                translation: 'Concept 7',
                type: 'string',
                defaultValue: '',
                show: function (data) {
                  return data.allsemaphores == false;
                }
              },
              ConceptsAffected8: {
                ref: 'conceptsemaphore8',
                translation: 'Concept 8',
                type: 'string',
                defaultValue: '',
                show: function (data) {
                  return data.allsemaphores == false;
                }
              },
              ConceptsAffected9: {
                ref: 'conceptsemaphore9',
                translation: 'Concept 9',
                type: 'string',
                defaultValue: '',
                show: function (data) {
                  return data.allsemaphores == false;
                }
              },
              ConceptsAffected10: {
                ref: 'conceptsemaphore10',
                translation: 'Concept 10',
                type: 'string',
                defaultValue: '',
                show: function (data) {
                  return data.allsemaphores == false;
                }
              },
            }
          },
          MetricSemaphores: {
            type: 'items',
            label: 'Metric Semaphores',
            items: {
              AllMetrics: {
                ref: 'allmetrics',
                type: 'boolean',
                component: 'switch',
                label: 'All metrics affected',
                options: [{
                  value: true,
                  label: 'On'
                }, {
                  value: false,
                  label: 'Off'
                }],
                defaultValue: false
              },
              MetricsAffected: {
                ref: 'metricssemaphore',
                translation: 'Metrics affected (1,2,4,...)',
                type: 'string',
                defaultValue: '0',
                show: function (data) {
                  return data.allmetrics == false;
                }
              },
              MetricStatus1: {
                ref: 'metricsstatus1',
                translation: 'Critic is less than',
                type: 'number',
                defaultValue: -0.1
              },
              ColorStatus1: {
                ref: 'colorstatus1',
                label: 'Critic Color Fill',
                type: 'object',
                component: 'color-picker',
                defaultValue: {
                  index: 7,
                  color: '#f93f17'
                }
              },
              ColorStatus1Text: {
                ref: 'colorstatus1text',
                label: 'Critic Color Text',
                type: 'object',
                component: 'color-picker',
                defaultValue: {
                  index: 10,
                  color: '#ffffff'
                }
              },
              MetricStatus2: {
                ref: 'metricsstatus2',
                translation: 'Medium is less than',
                type: 'number',
                defaultValue: 0
              },
              ColorStatus2: {
                ref: 'colorstatus2',
                label: 'Medium Color Fill',
                type: 'object',
                component: 'color-picker',
                defaultValue: {
                  index: 8,
                  color: '#ffcf02'
                }
              },
              ColorStatus2Text: {
                ref: 'colorstatus2text',
                label: 'Medium Color Text',
                type: 'object',
                component: 'color-picker',
                defaultValue: {
                  index: 11,
                  color: '#000000'
                }
              },
              ColorStatus3: {
                ref: 'colorstatus3',
                label: 'Success Color Fill',
                type: 'object',
                component: 'color-picker',
                defaultValue: {
                  index: 9,
                  color: '#276e27'
                }
              },
              ColorStatus3Text: {
                ref: 'colorstatus3text',
                label: 'Success Color Text',
                type: 'object',
                component: 'color-picker',
                defaultValue: {
                  index: 10,
                  color: '#ffffff'
                }
              },

            }
          },
          ColorLibrary: {
            type: 'items',
            label: 'Primary Colors Library',
            items: {
              ColLibClean: {
                ref: 'collibclean',
                translation: 'Clean',
                type: 'string',
                defaultValue: '#ffffff',
              },
              ColLibSoft: {
                ref: 'collibsoft',
                translation: 'Soft',
                type: 'string',
                defaultValue: '#efefef',
              },
              ColLibDark: {
                ref: 'collibdark',
                translation: 'Dark',
                type: 'string',
                defaultValue: '#c4c4c4',
              },
              ColLibNight: {
                ref: 'collibnight',
                translation: 'Night',
                type: 'string',
                defaultValue: '#808080',
              },
              ColLibRed: {
                ref: 'collibred',
                translation: 'Red',
                type: 'string',
                defaultValue: '#d58b94',
              },
              ColLibOrange: {
                ref: 'colliborange',
                translation: 'Orange',
                type: 'string',
                defaultValue: '#fd6600',
              },
              ColLibViolete: {
                ref: 'collibviolete',
                translation: 'Violete',
                type: 'string',
                defaultValue: '#ccc0ff',
              },
              ColLibBlue: {
                ref: 'collibblue',
                translation: 'Blue',
                type: 'string',
                defaultValue: '#4575b4',
              },
              ColLibGreen: {
                ref: 'collibgreen',
                translation: 'Green',
                type: 'string',
                defaultValue: '#7bb51c',
              },
              ColLibCustom: {
                ref: 'collibcustom',
                label: 'Custom',
                type: 'string',
                defaultValue: '#ffcccc',
              },
            }
          },
          PijamaColorLibrary: {
            type: 'items',
            label: 'Pijama Colors Library',
            items: {
              ColLibCleanP: {
                ref: 'collibcleanp',
                translation: 'Clean',
                type: 'string',
                defaultValue: '#ffffff',
              },
              ColLibSoftP: {
                ref: 'collibsoftp',
                translation: 'Soft',
                type: 'string',
                defaultValue: '#ffffff',
              },
              ColLibDarkP: {
                ref: 'collibdarkp',
                translation: 'Dark',
                type: 'string',
                defaultValue: '#efefef',
              },
              ColLibNightP: {
                ref: 'collibnightp',
                translation: 'Night',
                type: 'string',
                defaultValue: '#c4c4c4',
              },
              ColLibRedP: {
                ref: 'collibredp',
                translation: 'Red',
                type: 'string',
                defaultValue: '#ffcccc',
              },
              ColLibOrangeP: {
                ref: 'colliborangep',
                translation: 'Orange',
                type: 'string',
                defaultValue: '#ffcc66',
              },
              ColLibVioleteP: {
                ref: 'collibvioletep',
                translation: 'Violete',
                type: 'string',
                defaultValue: '#e6e6ff',
              },
              ColLibBlueP: {
                ref: 'collibbluep',
                translation: 'Blue',
                type: 'string',
                defaultValue: '#b3d9ff',
              },
              ColLibGreenP: {
                ref: 'collibgreenp',
                translation: 'Green',
                type: 'string',
                defaultValue: '#98fb98',
              },
              ColLibCustomP: {
                ref: 'collibcustomp',
                label: 'Custom',
                type: 'string',
                defaultValue: '#ffffff',
              },
            }
          }
        }
      }
    }
  },
  snapshot: {
    canTakeSnapshot: true
  },
  controller: [
    '$scope',
    '$timeout',
    function () { }
  ],
  paint: function ($element) {
    try {
      paint($element, this);
    }
    catch (e) {
      console.error(e); // eslint-disable-line no-console
      throw e;
    }
  }
};
