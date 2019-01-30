export function onlyUnique (value, index, self) {
  return self.indexOf(value) === index;
}

export function addSeparators (nStr, thousandsSep, decimalSep, numDecimals) {
  let x1;
  nStr = nStr.toFixed(numDecimals);
  const x = nStr.split('.');
  x1 = x[0];
  const x2 = x.length > 1 ? decimalSep + x[1] : '';
  const rgx = /(\d+)(\d{3})/;
  while (rgx.test(x1)) {
    x1 = x1.replace(rgx, `$1${thousandsSep}$2`);
  }
  return x1 + x2;
}

export function Deferred () {
  this.promise = new Promise((resolve, reject) => {
    this.resolve = resolve;
    this.reject = reject;
  });
}
