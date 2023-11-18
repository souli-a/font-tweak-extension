const rangeChecker = (number, minRange, maxRange) => {
  const parsedNumber = parseInt(number);
  const minRangeValue = minRange;
  const maxRangeValue = maxRange;

  if (parsedNumber < minRangeValue) {
    return minRangeValue;
  }
  if (parsedNumber > maxRangeValue) {
    return maxRangeValue;
  }
  if (parsedNumber >= minRangeValue && parsedNumber <= maxRangeValue) {
    return parsedNumber;
  }
};

const cssInjector = (css) => {
  let element = document.createElement('style');
  element.innerHTML = css;
  document.head.appendChild(element);
  return element;
};

chrome.storage.sync.get(
  ['fontFamily', 'letterSpacing', 'lineHeight'],
  ({ fontFamily, letterSpacing, lineHeight }) => {
    const correctedLetterSpacingValue = rangeChecker(letterSpacing, 0, 5);
    const correctedLineHeightValue = rangeChecker(lineHeight, 100, 250);

    cssInjector(`
    html * {
    font-family: ${fontFamily + ' !important' || ''};
    letter-spacing: ${correctedLetterSpacingValue + 'px !important' || ''};
    }`);

    cssInjector(`
      html p,
      html h1,
      html h2,
      html h3,
      html h4,
      html h5,
      html h6,
      html a,
      html span,
      html li,
      html pre {
      line-height: ${correctedLineHeightValue + '% !important' || ''};
    }`);
  }
);
