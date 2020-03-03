
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
device.min = Object.keys(breakpoints).reduce((acc, cur) => {
  acc[cur] = `(min-width: ${breakpoints[cur]}px)`;
  return acc;
}, {});
device.max = Object.keys(breakpoints).reduce((acc, cur) => {
  acc[cur] = `(max-width: ${breakpoints[cur]-1}px)`;
  return acc;
}, {});

export default device;
export { breakpoints, device };
