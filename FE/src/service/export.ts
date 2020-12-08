export default function exportToCSV(csv) {
  const filename = 'transactions.csv';
  if (window.navigator && window.navigator.msSaveOrOpenBlob) {
    console.log('if');
    let blob = new Blob([decodeURIComponent(csv)], {
      type: 'text/csv;charset=utf8',
    });

    window.navigator.msSaveOrOpenBlob(blob, filename);
  } else if (window.Blob && window.URL) {
    //HTML5 Blob
    console.log('else if');
    let blob = new Blob([csv], { type: 'text/csv;charset=utf8' });
    let csvUrl = URL.createObjectURL(blob);
    let a = document.createElement('a');
    a.setAttribute('style', 'display:none');
    a.setAttribute('href', csvUrl);
    a.setAttribute('download', filename);
    document.body.appendChild(a);

    a.click();
    a.remove();
  } else {
    // Data URI
    console.log('else');
    let csvData =
      'data:application/csv;charset=utf-8,' + encodeURIComponent(csv);
    let a = document.createElement('a');
    a.setAttribute('style', 'display:none');
    a.setAttribute('target', '_blank');
    a.setAttribute('href', csvData);
    a.setAttribute('download', filename);
    document.body.appendChild(a);
    a.click();
    a.remove();
  }
}
