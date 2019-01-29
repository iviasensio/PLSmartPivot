function StyleBuilder (state) {
  const {
    CustomArray,
    CustomArrayBasic,
    vNumCustomHeaders,
    vColorSchema,
    vColorText,
    vColorSchemaP,
    vLetterSize,
    colors
  } = state;
  let style = {
    fontSize: `${14 + vLetterSize}px`
  };
  let hasComments = false;
  let commentColor;
  let hasCustomFileStyle = false;

  function applyStandardAttributes (rowNumber) {
    const isEven = rowNumber % 2 === 0;
    style.backgroundColor = isEven ? vColorSchema : vColorSchemaP;
    style.color = vColorText;
    style.fontSize = `${14 + vLetterSize}px`;
  }

  function applyColor (color) {
    style.backgroundColor = color;
    commentColor = color;
  }

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
    '<large>': () => { style.fontSize = `${15 + vLetterSize}px`; },
    '<medium>': () => { style.fontSize = `${14 + vLetterSize}px`; },
    '<small>': () => { style.fontSize = `${13 + vLetterSize}px`; },
    // text alignment
    '<center>': () => { style.textAlign = 'center'; }
  };

  // TODO: need to improve this, it has way too many false positives
  function isCSSColor (property) {
    const isHexColor = property.substring(0, 1) == '#';
    const isRGBColor = property.substring(0, 3).toUpperCase() == 'RGB';

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
    hasCustomFileStyle = true;
    for (let csvAttribute = 1; csvAttribute < vNumCustomHeaders; csvAttribute += 1) {
      let customAttribute = '';
      if (CustomArrayBasic.indexOf(columnText) < 0) {
        customAttribute = 'none';
      } else {
        customAttribute = CustomArray[CustomArrayBasic.indexOf(columnText)][csvAttribute];
      }
      applyProperty(customAttribute);
    }
  }

  return {
    getCommentColor: () => commentColor,
    getStyle: () => style,
    hasCustomFileStyle: () => hasCustomFileStyle,
    hasFontSize: () => Boolean(style.fontSize),
    hasComments: () => hasComments,
    applyStandardAttributes,
    applyProperty,
    applyCustomStyle,
    parseCustomFileStyle
  };
}

export default StyleBuilder;
