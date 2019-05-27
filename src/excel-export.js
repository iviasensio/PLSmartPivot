function cleanupNodes (node) {
  const removables = node.querySelectorAll('.tooltip,input');
  [].forEach.call(removables, removeable => {
    if (removeable.parentNode) {
      removeable.parentNode.removeChild(removeable);
    }
  });
}

function buildTableHTML (containerElement, title, subtitle, footnote) {
  const titleHTML = `<p style="font-size:15pt"><b>${title}</b></p>`;
  const subtitleHTML = `<p style="font-size:11pt">${subtitle}</p>`;
  const footnoteHTML = `<p style="font-size:11pt">${footnote}</p>`;
  const kpiTableClone = containerElement[0].querySelector('.kpi-table').cloneNode(true);
  const dataTableClone = containerElement[0].querySelector('.data-table').cloneNode(true);
  cleanupNodes(kpiTableClone);
  cleanupNodes(kpiTableClone);

  const kpiTableBodies = kpiTableClone.querySelectorAll('tbody');
  const dataTableBodies = dataTableClone.querySelectorAll('tbody');
  const kpiHeader = kpiTableBodies[0].querySelector('tr');
  const dataTableHeaders = dataTableBodies[0].querySelectorAll('tr');
  const kpiRows = kpiTableBodies[1].querySelectorAll('tr');
  const dataRows = dataTableBodies[1].querySelectorAll('tr');
  let combinedRows = '';
  for (let i = 0; i < kpiRows.length; i++) {
    combinedRows += `<tr>${kpiRows[i].innerHTML}${dataRows[i].innerHTML}</tr>`;
  }

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
        <div>
          <table>
            <tbody>
              <tr>
              ${kpiHeader.innerHTML}
              ${dataTableHeaders[0].innerHTML}
              </tr>
              ${dataTableHeaders.length > 1 ? dataTableHeaders[1].outerHTML : ''}
            </tbody>
          </table>
          <table>
            <tbody>
              ${combinedRows}
            </tbody>
          </table>
        </div>
        ${footnoteHTML.length > 0 ? footnoteHTML : ''}
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
  const blobObject = new Blob([html], { type: 'application/vnd.ms-excel' });

  // IE/Edge
  if (window.navigator.msSaveOrOpenBlob) {
    return window.navigator.msSaveOrOpenBlob(blobObject, filename);
  }

  const link = window.document.createElement('a');
  link.href = URL.createObjectURL(blobObject);
  link.download = filename;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);

  return true;
}

export function exportXLS (containerElement, title, subtitle, footnote) {
  // original was removing icon when starting export, disable and some spinner instead, shouldn't take enough time to warrant either..?
  const table = buildTableHTML(containerElement, title, subtitle, footnote);
  downloadXLS(table);
}
