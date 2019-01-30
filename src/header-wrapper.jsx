import React, { PureComponent, Fragment } from 'react';
import PropTypes from 'prop-types';
import ExportButton from './export-button.jsx';

/* TODO: the different render methods are very similar, split it into a few components
  and try to get rid of some duplication */
class HeaderWrapper extends PureComponent {
  getBaseCSS () {
    const {
      vHeaderColorText,
      vFontFamily,
      vHeaderColorSchema,
      vHeaderAlignText
    } = this.props;

    const baseCSS = {
      backgroundColor: vHeaderColorSchema,
      color: vHeaderColorText,
      fontFamily: vFontFamily,
      textAlign: vHeaderAlignText
    };
    return baseCSS;
  }

  renderSecondDimensionTitles () {
    const {
      vFontFamily,
      vLetterSizeHeader,
      vExportToExcel,
      sufixCells,
      vNumDims,
      measure_count,
      LabelsArray,
      SecondHeader,
      vSeparatorCols,
      nSecond,
      vLetterSize,
      ExtraLabelsArray
    } = this.props;

    const baseCSS = this.getBaseCSS();

    if (vNumDims === 2) {
      if (measure_count > 1) {
        const thStyle = {
          ...baseCSS,
          cursor: 'default',
          fontSize: `${16 + vLetterSizeHeader} px`,
          height: '80px',
          verticalAlign: 'middle',
          width: '230px'
        };
        return (
          <Fragment key="second-dimension-titles">
            <th
              className="fdim-cells"
              padding-left="20px"
              rowSpan="2"
              style={thStyle}
            >
              <ExportButton excelExport={vExportToExcel} />
              {LabelsArray[0]}
            </th>
            {SecondHeader.map((header, index) => {
              const emptyStyle = {
                color: 'white',
                fontFamily: vFontFamily,
                fontSize: `${13 + vLetterSizeHeader} px`
              };
              const style = {
                ...baseCSS,
                fontSize: `${14 + vLetterSizeHeader} px`,
                height: '45px',
                verticalAlign: 'middle'
              };
              return (
                <Fragment key={index}>
                  {vSeparatorCols && index > 0 && (
                    <th
                      className="empty"
                      style={emptyStyle}
                    >
                      *
                    </th>
                  )}
                  <th
                    className={`grid-cells2${sufixCells}`}
                    colSpan={measure_count}
                    style={style}
                  >
                    {header}
                  </th>
                </Fragment>
              );
            })}
          </Fragment>
        );
      }
      const fDimCellsStyle = {
        ...baseCSS,
        cursor: 'default',
        fontSize: `${16 + vLetterSizeHeader} px`,
        height: '70px',
        verticalAlign: 'middle',
        width: '230px'
      };

      return (
        <Fragment>
          <th
            className="fdim-cells"
            style={fDimCellsStyle}
          >
            <ExportButton excelExport={vExportToExcel} />
            {LabelsArray[0] + ExtraLabelsArray[0]}
          </th>
          {SecondHeader.map((entry, entryIndex) => {
            // TODO: seperator element is reused a bunch, only difference being font-size
            const hasSeperator = vSeparatorCols && nSecond > 0;
            const seperatorStyle = {
              color: 'white',
              fontFamily: vFontFamily,
              fontSize: `${12 + vLetterSize} px`
            };
            const seperatorElement = (
              <th
                className="empty"
                style={seperatorStyle}
              >
                *
              </th>
            );
            let sufixWrap = '';
            if ((entry.length > 11 && vLetterSizeHeader === 0) || (entry.length > 12 && vLetterSizeHeader === -2)) {
              sufixWrap = '70';
            } else {
              sufixWrap = 'Empty';
            }
            const gridCells2Style = {
              ...baseCSS,
              fontSize: `${14 + vLetterSizeHeader} px`,
              height: '70px',
              verticalAlign: 'middle'
            };
            const wrapStyle = {
              fontFamily: vFontFamily
            };
            return (
              <Fragment key={entryIndex}>
                {hasSeperator && seperatorElement}
                <th
                  className={`grid-cells2${sufixCells}`}
                  style={gridCells2Style}
                >
                  <span
                    className={`wrapclass${sufixWrap}`}
                    style={wrapStyle}
                  >
                    {entry}
                  </span>
                </th>
              </Fragment>
            );
          })}
        </Fragment>
      );
    }
  }

  renderSecondDimensionSubTitles () {
    const {
      vFontFamily,
      vLetterSizeHeader,
      sufixCells,
      LabelsArray,
      SecondHeader,
      vSeparatorCols,
      vLetterSize,
      MeasuresFormat,
      ExtraLabelsArray
    } = this.props;

    const baseCSS = this.getBaseCSS();

    return SecondHeader.map((header, index) => {
      const emptyStyle = {
        color: 'white',
        fontFamily: vFontFamily,
        fontSize: `${12 + vLetterSizeHeader} px`
      };
      return (
        <Fragment key={index}>
          {vSeparatorCols && index > 0 && (
            <th
              className="empty"
              style={emptyStyle}
            >
              *
            </th>
          )}
          {MeasuresFormat.map((measureFormat, measureFormatIndex) => {
            if (measureFormat.substring(measureFormat.length - 1) === '%') {
              const cells2SmallStyle = {
                ...baseCSS,
                cursor: 'default',
                fontSize: `${13 + vLetterSizeHeader} px`,
                height: '25px',
                verticalAlign: 'middle'
              };
              return (
                <th key={measureFormatIndex} className={'grid-cells2-small' + sufixCells} style={cells2SmallStyle}>
                  <span className="wrapclass25">
                    {LabelsArray[measureFormatIndex + 1]}
                    {ExtraLabelsArray[measureFormatIndex]}
                  </span>
                </th>
              );
            }
            const cells2Style = {
              ...baseCSS,
              cursor: 'default',
              fontSize: `${14 + vLetterSizeHeader} px`,
              height: '25px',
              verticalAlign: 'middle'
            };
            return (
              <th key={measureFormatIndex} className={'grid-cells2' + sufixCells} style={cells2Style}>
                <span className="wrapclass25">
                  {LabelsArray[measureFormatIndex + 1]}
                  {ExtraLabelsArray[measureFormatIndex]}
                </span>
              </th>
            );
          })}
        </Fragment>
      );
    });
  }

  renderMeasureInfos () {
    const {
      vFontFamily,
      vLetterSizeHeader,
      dim_count,
      vExtraLabel,
      sufixCells,
      measureInfos
    } = this.props;

    const baseCSS = this.getBaseCSS();

    if (dim_count === 1) {
      return measureInfos.map((measureInfo, measureInfoIndex) => {
        let sufixWrap = '';
        if (((measureInfo.qFallbackTitle + vExtraLabel).length > 11 && vLetterSizeHeader === 0)
          || ((measureInfo.qFallbackTitle + vExtraLabel).length > 12 && vLetterSizeHeader === -2)) {
          sufixWrap = '70';
        } else {
          sufixWrap = 'Empty';
        }
        const thStyle = {
          ...baseCSS,
          cursor: 'default',
          fontSize: `${15 + vLetterSizeHeader} px`,
          height: '70px',
          verticalAlign: 'middle'
        };
        return (
          <th key={measureInfoIndex} className={'grid-cells2' + sufixCells} style={thStyle}>
            <span className={'wrapclass' + sufixWrap} style={{ fontFamily: vFontFamily }}>
              {measureInfo.qFallbackTitle + vExtraLabel}
            </span>
          </th>
        );
      });
    }
    return null;
  }

  renderDimensionInfos () {
    const {
      dimensionInfos,
      vLetterSizeHeader,
      vExportToExcel
    } = this.props;

    const baseCSS = this.getBaseCSS();

    return dimensionInfos.map((dimensionInfo, dimensionInfoIndex) => {
      // TODO: move static properties to css file
      const style = {
        ...baseCSS,
        cursor: 'default',
        fontSize: `${17 + vLetterSizeHeader} px`,
        height: '70px',
        verticalAlign: 'middle',
        width: '230px'
      };

      return (
        <th
          className="fdim-cells"
          key={dimensionInfoIndex}
          style={style}
        >
          <ExportButton excelExport={vExportToExcel} />
          {dimensionInfo.qFallbackTitle}
        </th>
      );
    });
  }

  render () {
    const { vNumDims, measure_count } = this.props;
    return (
      <div className="header-wrapper">
        <table className="header">
          <tbody>
            <tr>
              {this.renderDimensionInfos()}
              {this.renderMeasureInfos()}
              {this.renderSecondDimensionTitles()}
            </tr>
            { vNumDims === 2 && measure_count > 1 && (
              <tr>
                {this.renderSecondDimensionSubTitles()}
              </tr>
            )}
          </tbody>
        </table>
      </div>
    );
  }
}

// TODO: make any, object and array forbidden
HeaderWrapper.propTypes = {
  vHeaderColorText: PropTypes.any,
  vFontFamily: PropTypes.any,
  vHeaderColorSchema: PropTypes.any,
  vExportToExcel: PropTypes.any,
  vNumDims: PropTypes.any,
  dimensionInfos: PropTypes.any,
  vLetterSizeHeader: PropTypes.any,
  vHeaderAlignText: PropTypes.any,
  MeasuresFormat: PropTypes.any,
  measure_count: PropTypes.any,
  sufixCells: PropTypes.any,
  LabelsArray: PropTypes.any,
  SecondHeader: PropTypes.any,
  vSeparatorCols: PropTypes.any,
  nSecond: PropTypes.any,
  vLetterSize: PropTypes.any,
  ExtraLabelsArray: PropTypes.any,
  dim_count: PropTypes.any,
  vExtraLabel: PropTypes.any,
  measureInfos: PropTypes.any
};

export default HeaderWrapper;
