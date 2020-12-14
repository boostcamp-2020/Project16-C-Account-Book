export default function exportToCSV(csv) {
  const downloadFile = link => {
    const filename = 'transactions.csv';
    const a = document.createElement('a');
    a.setAttribute('target', '_blank');
    a.setAttribute('style', 'display:none');
    a.setAttribute('href', link);
    a.setAttribute('download', filename);
    a.click();
    a.remove();
  };

  if (window.navigator && window.navigator.msSaveOrOpenBlob) {
    // IE를 위한 msSaveOROpenBlob
    const blob = new Blob([decodeURIComponent(csv)], {
      type: 'text/csv;charset=utf8',
    });

    window.navigator.msSaveOrOpenBlob(blob, filename);
  } else if (window.Blob && window.URL) {
    //HTML5 Blob
    const blob = new Blob([csv], { type: 'text/csv;charset=utf8' });
    const csvUrl = URL.createObjectURL(blob);

    downloadFile(csvUrl);

    window.URL.revokeObjectURL(csvUrl);
  } else {
    // Data URI
    const csvData =
      'data:application/csv;charset=utf-8,' + encodeURIComponent(csv);

    downloadFile(csvData);
  }
}
