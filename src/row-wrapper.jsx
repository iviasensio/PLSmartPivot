import $ from 'jquery';
import PropTypes from 'prop-types';
import React from 'react';

import ElseDimensionMeasures from './else-dimension-measures.jsx';
import RowList from './row-list.jsx';
import SingleDimensionMeasures from './single-dimension-measures.jsx';

const RowWrapper = props => {
  const {
    ConceptMatrix,
    ConceptMatrixPivot,
    vNumDims
  } = props;
  let MeasurementsComponent,
    tableData;
  if (vNumDims === 1) {
    tableData = ConceptMatrix;
    MeasurementsComponent = SingleDimensionMeasures;
  } else {
    tableData = ConceptMatrixPivot.filter(array => array.length);
    MeasurementsComponent = ElseDimensionMeasures;
  }

  return (
    <div className="row-wrapper">
      <table>
        <RowList
          MeasurementsComponent={MeasurementsComponent}
          tableData={tableData}
          {...props}
        />
      </table>
    </div>
  );
};

RowWrapper.propTypes = {
  ConceptMatrix: PropTypes.array.isRequired,
  ConceptMatrixPivot: PropTypes.array.isRequired
};

export default RowWrapper;

export async function prepareProps ({ state }) {
  const { colors, layout, vAllSemaphores, vDynamicColorBody, vDynamicColorBodyP } = state;
  const props = {
    colors,
    vCustomFileBool: layout.customfilebool,
    vCustomFile: layout.customfile,
    vPadding: layout.indentbool,
    vPaddingText: '',
    vGlobalComas: 0,
    vGlobalComas2: 0,
    vGlobalComment: 0,
    vGlobalCommentColor: '',
    vGlobalFontSize: 0,
    vComas: 0,
    vMedium: false,
    vFontSize: '',
    vColorText: layout.BodyTextColorSchema,
    vDivide: 1,
    vSymbolForNulls: layout.symbolfornulls,
    vDynamicColorBody: 'vColLib' + layout.ColorSchema,
    vDynamicColorBodyP: 'vColLib' + layout.ColorSchema + 'P',
    vAllMetrics: layout.allmetrics,
    MetricsAffectedMatrix: JSON.parse('[' + layout.metricssemaphore + ']'),
    vColorMetric1: layout.colorstatus1.color,
    vColorMetric2: layout.colorstatus2.color,
    vColorMetric3: layout.colorstatus3.color,
    vColorMetric1Text: layout.colorstatus1text.color,
    vColorMetric2Text: layout.colorstatus2text.color,
    vColorMetric3Text: layout.colorstatus3text.color,
    vColorSemaphore: '',
    vColorSemaphoreText: '',
    vCritic: layout.metricsstatus1,
    vMMedium: layout.metricsstatus2,
    CustomArray: new Array(),
    CustomArrayBasic: new Array(),
    vNumCustomHeaders: 0,
    vColumnText: '',
    vColumnNum: '',
    vMaskNum: 0,
    StyleTags: '',
    vColorSchema: colors[vDynamicColorBody],
    vColorSchemaP: colors[vDynamicColorBodyP],
    vAllSemaphores: layout.allsemaphores,
    ConceptsAffectedMatrix: new Array(10)
  };
  if (vAllSemaphores == false) {
    props.ConceptsAffectedMatrix[0] = layout.conceptsemaphore1;
    props.ConceptsAffectedMatrix[1] = layout.conceptsemaphore2;
    props.ConceptsAffectedMatrix[2] = layout.conceptsemaphore3;
    props.ConceptsAffectedMatrix[3] = layout.conceptsemaphore4;
    props.ConceptsAffectedMatrix[4] = layout.conceptsemaphore5;
    props.ConceptsAffectedMatrix[5] = layout.conceptsemaphore6;
    props.ConceptsAffectedMatrix[6] = layout.conceptsemaphore7;
    props.ConceptsAffectedMatrix[7] = layout.conceptsemaphore8;
    props.ConceptsAffectedMatrix[8] = layout.conceptsemaphore9;
    props.ConceptsAffectedMatrix[9] = layout.conceptsemaphore10;
  }

  function ReadCustomSchema () {
    var Url = '/Extensions/qlik-smart-pivot/' + props.vCustomFile;
    return $.get(Url).then(function (response) {
      var allTextLines = response.split(/\r\n|\n/);
      var headers = allTextLines[0].split(';');
      props.vNumCustomHeaders = headers.length;

      for (var i = 0; i < allTextLines.length; i++) {
        props.CustomArray[i] = new Array(headers.length);
        var data = allTextLines[i].split(';');

        if (data.length == headers.length) {
          for (var j = 0; j < headers.length; j++) {
            props.CustomArrayBasic[i] = data[0];
            props.CustomArray[i][j] = data[j];
          }
        }
      }
    });
  }

  const hasCustomSchema = (props.vCustomFileBool && props.vCustomFile.length > 4);
  const schemaPromise = hasCustomSchema ? ReadCustomSchema() : Promise.resolve();
  await schemaPromise;

  return props;
}
