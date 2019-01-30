import $ from 'jquery';

const isIE = /* @cc_on!@*/false || Boolean(document.documentMode);
const isChrome = Boolean(window.chrome) && Boolean(window.chrome.webstore);
const isSafari = Object.prototype.toString.call(window.HTMLElement).indexOf('Constructor') > 0;
const isFirefox = typeof InstallTrigger !== 'undefined';

export function enableExcelExport (layout, f) {
  let myTitle = '';
  let mySubTitle = '';
  let myFootNote = '';
  if (layout.title.length > 0) {
    myTitle += '<p style="font-size:15pt"><b>';
    myTitle += layout.title;
    myTitle += '</b></p>';
  }
  if (layout.subtitle.length > 0) {
    mySubTitle += '<p style="font-size:11pt">';
    mySubTitle += layout.subtitle;
    mySubTitle += '</p>';
  }
  if (layout.footnote.length > 0) {
    myFootNote += '<p style="font-size:11pt"><i>Note:</i>';
    myFootNote += layout.footnote;
    myFootNote += '</p>';
  }

  $('.icon-xls').on('click', () => {
    $('.header-wrapper th').children('.tooltip')
      .remove(); // remove some popup effects when exporting
    $('.header-wrapper th').children('.icon-xls')
      .remove(); // remove the xls icon when exporting
    if (isChrome || isSafari) {
      const $clonedDiv = $('.data-table').clone(true); // .kpi-table a secas exporta la 1ªcol
      let vEncodeHead = '<html><head><meta charset="UTF-8"></head>';
      vEncodeHead += myTitle + mySubTitle + myFootNote;
      const vEncode = encodeURIComponent($clonedDiv.html());
      let vDecode = `${vEncodeHead + vEncode}</html>`;

      $clonedDiv.find('tr.header');
      vDecode = vDecode.split('%3E.%3C').join('%3E%3C');
      window.open(`data:application/vnd.ms-excel,${vDecode}`);
      $.preventDefault();
    }
    if (isIE) {
      let a = '<html><head><meta charset="UTF-8"></head>';
      a += myTitle + mySubTitle + myFootNote;
      a += f;
      a = a.split('>.<').join('><');
      a += '</html>';

      const w = window.open();
      w.document.open();
      w.document.write(a);
      w.document.close();
      w.document.execCommand('SaveAs', true, 'Analysis.xls' || 'c:\TMP');
      w.close();
    }

    if (isFirefox) {
      const $clonedDiv = $('.data-table').clone(true);// .kpi-table a secas exporta la 1ªcol
      let vEncodeHead = '<html><head><meta charset="UTF-8"></head>';
      vEncodeHead += myTitle + mySubTitle + myFootNote;
      const vEncode = encodeURIComponent($clonedDiv.html());
      let vDecode = `${vEncodeHead + vEncode}</html>`;

      $clonedDiv.find('tr.header');
      vDecode = vDecode.split('>.<').join('><');
      window.open(`data:application/vnd.ms-excel,${vDecode}`);
      $.preventDefault();
    }
  });
}
