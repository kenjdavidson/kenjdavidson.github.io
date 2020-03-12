/**
 * Breakpoint constants used to build min and max @media queries
 */
const breakpoints = {
  mobileS: '320',
  mobileM: '375',
  mobileL: '425',
  tablet: '768',
  laptop: '1024',
  laptopL: '1440',
  desktop: '2560'
};

const device = {};

/**
 * @media(min-width: XXXpx) queries.  Components should be designed for mobile first 
 * (mobileL) - therefore the most common usage will be ${device.min.tablet}.
 */
device.min = Object.keys(breakpoints).reduce((acc, cur) => {
  acc[cur] = `(min-width: ${breakpoints[cur]}px)`;
  return acc;
}, {});

/**
 * @media(max-width: XXXpx) queries.  Max media queries use the breaktpoint -1 in order
 * to calculate size.  For example using ${device.max.tablet} will be anything smaller
 * than breakpoints.tablet.
 */
device.max = Object.keys(breakpoints).reduce((acc, cur) => {
  acc[cur] = `(max-width: ${breakpoints[cur] - 1}px)`;
  return acc;
}, {});

export default device;
export { breakpoints, device };
