function StyleBuilder (styling) {
  const {
    colors,
    customCSV,
    options
  } = styling;
  let style = {
    fontSize: `${14 + options.fontSizeAdjustment}px`
  };
  let hasComments = false;
  let commentColor;
  let hasCustomFileStyle = false;

  function applyStandardAttributes (rowNumber) {
    const isEven = rowNumber % 2 === 0;
    style.backgroundColor = isEven ? options.backgroundColor : options.backgroundColorOdd;
    style.color = options.color;
    style.fontSize = `${13 + options.fontSizeAdjustment}px`;
  }

  function applyColor (color) {
    style.backgroundColor = color;
    commentColor = color;
  }

  /* eslint-disable sort-keys*/
  const properties = {
    '<comment>': () => { hasComments = true; },
    // text
    '<bold>': () => { style.fontWeight = 'bold'; },
    '<italic>': () => { style.fontStyle = 'italic'; },
    '<oblique>': () => { style.fontStyle = 'oblique'; },
    // background and comment color
    '<dark>': () => applyColor(colors.vColLibDark),
    '<night>': () => applyColor(colors.vColLibNight),
    '<soft>': () => applyColor(colors.vColLibSoft),
    '<red>': () => applyColor(colors.vColLibRed),
    '<orange>': () => applyColor(colors.vColLibOrange),
    '<violete>': () => applyColor(colors.vColLibViolete),
    '<blue>': () => applyColor(colors.vColLibBlue),
    '<green>': () => applyColor(colors.vColLibGreen),
    // font color TODO: this is a color just like the others, but it applies to text instead.. any way to make it less weird?
    '<white>': () => { style.color = 'white'; },
    // font size
    '<large>': () => { style.fontSize = `${15 + options.fontSizeAdjustment}px`; },
    '<medium>': () => { style.fontSize = `${14 + options.fontSizeAdjustment}px`; },
    '<small>': () => { style.fontSize = `${13 + options.fontSizeAdjustment}px`; },
    // text alignment
    '<center>': () => { style.textAlign = 'center'; }
  };
  /* eslint-enable sort-keys */

  // TODO: need to improve this, it has way too many false positives
  function isCSSColor (property) {
    const isHexColor = property.substring(0, 1) === '#';
    const isRGBColor = property.substring(0, 3).toUpperCase() === 'RGB';

    return isHexColor || isRGBColor;
  }

  function applyProperty (property) {
    if (!property || property === 'none') {
      return;
    }
    if (isCSSColor(property)) {
      applyColor(property);
      return;
    }
    if (properties[property]) {
      properties[property]();
    } else {
      console.error(`Custom property ${property} does not exist`); // eslint-disable-line no-console
    }
  }

  function applyCustomStyle (customStyle) {
    style = {
      ...style,
      ...customStyle
    };
  }

  function parseCustomFileStyle (columnText) {
    for (let csvAttribute = 1; csvAttribute < customCSV.count; csvAttribute += 1) {
      let customAttribute = '';
      if (customCSV.basic.indexOf(columnText) < 0) {
        customAttribute = 'none';
      } else {
        hasCustomFileStyle = true;
        customAttribute = customCSV.full[customCSV.basic.indexOf(columnText)][csvAttribute];
      }
      applyProperty(customAttribute);
    }
  }

  return {
    applyCustomStyle,
    applyProperty,
    applyStandardAttributes,
    getCommentColor: () => commentColor,
    getStyle: () => style,
    hasComments: () => hasComments,
    hasCustomFileStyle: () => hasCustomFileStyle,
    hasFontSize: () => Boolean(style.fontSize),
    parseCustomFileStyle
  };
}

export default StyleBuilder;
