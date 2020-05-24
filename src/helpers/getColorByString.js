/* eslint-disable no-bitwise */

const strToHashCode = str => (
  str.split('').reduce((acc, value, i) => Math.imul(31, acc) + str.charCodeAt(i) | 0, 0)
);

const intToRGB = int => {
  const c = (int & 0x00FFFFFF)
    .toString(16)
    .toUpperCase();

  return '00000'.substring(0, 6 - c.length) + c;
};

const getColorByString = (str = '') => {
  const hash = strToHashCode(str);
  return `#${intToRGB(hash)}`;
};

export default getColorByString;
