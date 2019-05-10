import { addSeparators } from './utilities';

export function ApplyPreMask (mask, value) { // aqui
  if (mask.indexOf(';') >= 0) {
    if (value >= 0) {
      switch (mask.substring(0, mask.indexOf(';'))) {
        case '#.##0':
          return (addSeparators(value, '.', ',', 0));
        case '#,##0':
          return (addSeparators(value, ',', '.', 0));
        case '+#.##0':
          return (addSeparators(value, '.', ',', 0));
        case '+#,##0':
          return (addSeparators(value, ',', '.', 0));
        default:
          return (applyMask(mask.substring(0, mask.indexOf(';')), value));
      }
    } else {
      const vMyValue = value * -1;
      let vMyMask = mask.substring(mask.indexOf(';') + 1, mask.length);
      vMyMask = vMyMask.replace('(', '');
      vMyMask = vMyMask.replace(')', '');
      switch (vMyMask) {
        case '#.##0':
          return (`(${addSeparators(vMyValue, '.', ',', 0)})`);
        case '#,##0':
          return (`(${addSeparators(vMyValue, ',', '.', 0)})`);
        case '-#.##0':
          return (`(${addSeparators(vMyValue, '.', ',', 0)})`);
        case '-#,##0':
          return (`(${addSeparators(vMyValue, ',', '.', 0)})`);
        default:
          return (`(${applyMask(vMyMask, vMyValue)})`);
      }
    }
  } else {
    return (applyMask(mask, value));
  }
}

function applyMask (originalMask, originalValue) {
  if (!originalMask || isNaN(Number(originalValue))) {
    return originalValue;
  }

  let isNegative;
  let result;
  let integer;
  // find prefix/suffix
  let len = originalMask.length;
  const start = originalMask.search(/[0-9\-\+#]/);
  const prefix = start > 0 ? originalMask.substring(0, start) : '';
  // reverse string: not an ideal method if there are surrogate pairs
  let str = originalMask.split('')
    .reverse()
    .join('');
  const end = str.search(/[0-9\-\+#]/);
  let offset = len - end;
  const substr = originalMask.substring(offset, offset + 1);
  let index = offset + ((substr === '.' || (substr === ',')) ? 1 : 0);
  const suffix = end > 0 ? originalMask.substring(index, len) : '';

  // mask with prefix & suffix removed
  let mask = originalMask.substring(start, index);

  // convert any string to number according to formation sign.
  let value = mask.charAt(0) === '-' ? -originalValue : Number(originalValue);
  isNegative = value < 0 ? value = -value : 0; // process only abs(), and turn on flag.

  // search for separator for grp & decimal, anything not digit, not +/- sign, not #.
  result = mask.match(/[^\d\-\+#]/g);
  const decimal = (result && result[result.length - 1]) || '.'; // treat the right most symbol as decimal
  const group = (result && result[1] && result[0]) || ','; // treat the left most symbol as group separator

  // split the decimal for the format string if any.
  mask = mask.split(decimal);
  // Fix the decimal first, toFixed will auto fill trailing zero.
  value = value.toFixed(mask[1] && mask[1].length);
  value = String(Number(value)); // convert number to string to trim off *all* trailing decimal zero(es)

  // fill back any trailing zero according to format
  const posTrailZero = mask[1] && mask[1].lastIndexOf('0'); // look for last zero in format
  const part = value.split('.');
  // integer will get !part[1]
  if (!part[1] || (part[1] && part[1].length <= posTrailZero)) {
    value = (Number(value)).toFixed(posTrailZero + 1);
  }
  const szSep = mask[0].split(group); // look for separator
  mask[0] = szSep.join(''); // join back without separator for counting the pos of any leading 0.

  const posLeadZero = mask[0] && mask[0].indexOf('0');
  if (posLeadZero > -1) {
    while (part[0].length < (mask[0].length - posLeadZero)) {
      part[0] = `0${part[0]}`;
    }
  } else if (Number(part[0]) === 0) {
    part[0] = '';
  }

  value = value.split('.');
  value[0] = part[0];

  // process the first group separator from decimal (.) only, the rest ignore.
  // get the length of the last slice of split result.
  const posSeparator = (szSep[1] && szSep[szSep.length - 1].length);
  if (posSeparator) {
    integer = value[0];
    str = '';
    offset = integer.length % posSeparator;
    len = integer.length;
    for (index = 0; index < len; index++) {
      str += integer.charAt(index); // ie6 only support charAt for sz.
      // -posSeparator so that won't trail separator on full length
      // jshint -W018
      if (!((index - offset + 1) % posSeparator) && index < len - posSeparator) {
        str += group;
      }
    }
    value[0] = str;
  }
  value[1] = (mask[1] && value[1]) ? decimal + value[1] : '';

  // remove negative sign if result is zero
  result = value.join('');
  if (result === '0' || result === '') {
    // remove negative sign if result is zero
    isNegative = false;
  }

  // put back any negation, combine integer and fraction, and add back prefix & suffix
  return prefix + ((isNegative ? '-' : '') + result) + suffix;
}
