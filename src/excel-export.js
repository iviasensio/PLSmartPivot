function buildTableHTML (title, subtitle, footnote) {
  const titleHTML = `<p style="font-size:15pt"><b>${title}</b></p>`;
  const subtitleHTML = `<p style="font-size:11pt">${subtitle}</p>`;
  const footnoteHTML = `<p style="font-size:11pt"><i>Note:</i>${footnote}</p>`;
  const dataTableClone = document.querySelector('.data-table').cloneNode(true);
  const tableHTML = `
    <html
      xmlns:o="urn:schemas-microsoft-com:office:office"
      xmlns:x="urn:schemas-microsoft-com:office:excel"
      xmlns="http://www.w3.org/TR/REC-html40"
    >
      <head>
        <meta charset="UTF-8">
        <!--[if gte mso 9]>
          <xml>
            <x:ExcelWorkbook>
              <x:ExcelWorksheets>
                <x:ExcelWorksheet>
                  <x:Name>${title || 'Analyze'}</x:Name>
                  <x:WorksheetOptions>
                    <x:DisplayGridlines/>
                  </x:WorksheetOptions>
                </x:ExcelWorksheet>
              </x:ExcelWorksheets>
            </x:ExcelWorkbook>
          </xml>
        <![endif]-->
      </head>
      <body>
        ${titleHTML.length > 0 ? titleHTML : ''}
        ${subtitleHTML.length > 0 ? subtitleHTML : ''}
        ${footnoteHTML.length > 0 ? footnoteHTML : ''}
        ${dataTableClone.outerHTML}
      </body>
    </html>
    `.split('>.<')
    .join('><')
    .split('>*<')
    .join('><');

  return tableHTML;
}

function downloadXLS (html) {
  const filename = 'analysis.xls';
  // IE/Edge
  if (window.navigator.msSaveOrOpenBlob) {
    const blobObject = new Blob([html]);
    return window.navigator.msSaveOrOpenBlob(blobObject, filename);
  }

  const dataURI = generateDataURI(html);
  const link = window.document.createElement('a');
  link.href = dataURI;
  link.download = filename;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);

  return true;
}

function generateDataURI (html) {
  const dataType = 'data:application/vnd.ms-excel;base64,';
  const data = window.btoa(unescape(encodeURIComponent(html)));

  return `${dataType}${data}`;
}

export function exportXLS (title, subtitle, footnote) {
  // close all tooltips (awaiting tooltips rewrite, should add a close all action for it)
  // original was removing icon when starting export, disable and some spinner instead, shouldn't take enough time to warrant either..?
  const table = buildTableHTML(title, subtitle, footnote);
  downloadXLS(table);
}
