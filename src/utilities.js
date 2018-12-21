export function onlyUnique(value, index, self) {
  return self.indexOf(value) === index;
}

export function addSeparators(nStr, thousandsSep, decimalSep, numDecimals) {
  var rgx, x, x1, x2;
  nStr = nStr.toFixed(numDecimals);
  x = nStr.split('.');
  x1 = x[0];
  x2 = x.length > 1 ? decimalSep + x[1] : '';
  rgx = /(\d+)(\d{3})/;
  while (rgx.test(x1)) {
    x1 = x1.replace(rgx, '$1' + thousandsSep + '$2');
  }
  return x1 + x2;
}

export function Deferred () {
  this.promise = new Promise((resolve, reject) => {
    this.resolve = resolve;
    this.reject = reject;
  });
}
