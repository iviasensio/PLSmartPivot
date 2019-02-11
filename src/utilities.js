export function onlyUnique (value, index, self) {
  return self.indexOf(value) === index;
}

export function distinctArray (array) {
  return array
    .map(entry => JSON.stringify(entry))
    .filter(onlyUnique)
    .map(entry => JSON.parse(entry));
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

export function injectSeparators (array, shouldHaveSeparator, suppliedOptions) {
  const defaultOptions = {
    atEvery: 1,
    separator: { isSeparator: true }
  };
  const options = {
    ...defaultOptions,
    ...suppliedOptions
  };

  if (!shouldHaveSeparator) {
    return array;
  }
  return array.reduce((result, entry, index) => {
    result.push(entry);
    if (index < array.length - 1 && (index + 1) % options.atEvery === 0) {
      result.push(options.separator);
    }
    return result;
  }, []);
}
