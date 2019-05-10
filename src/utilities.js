export function onlyUnique (value, index, self) {
  return self.indexOf(value) === index;
}

export function distinctArray (array) {
  return array
    .map(entry => JSON.stringify(entry))
    .filter(onlyUnique)
    .map(entry => JSON.parse(entry));
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
