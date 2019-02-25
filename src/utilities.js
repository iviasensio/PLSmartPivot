export function onlyUnique (value, index, self) {
  return self.indexOf(value) === index;
}

export function distinctArray (array) {
  return array
    .map(entry => JSON.stringify(entry))
    .filter(onlyUnique)
    .map(entry => JSON.parse(entry));
}

export function addSeparators (number, thousandSeparator, decimalSeparator, numberOfDecimals) {
  const numberString = number.toFixed(numberOfDecimals);
  const numberStringParts = numberString.split('.');
  let [
    wholeNumber,
    decimal
  ] = numberStringParts;
  decimal = numberStringParts.length > 1 ? decimalSeparator + decimal : '';
  const regexCheckForThousand = /(\d+)(\d{3})/;
  while (regexCheckForThousand.test(wholeNumber)) {
    wholeNumber = wholeNumber.replace(regexCheckForThousand, `$1${thousandSeparator}$2`);
  }
  return wholeNumber + decimal;
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
