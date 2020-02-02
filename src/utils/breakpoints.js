
const breakpoints = {
  mobileS: '320px',
  mobileM: '375px',
  mobileL: '425px',
  tablet: '768px',
  laptop: '1024px',
  laptopL: '1440px',
  desktop: '2560px'
};

const device = Object.keys(size).reduce((acc, cur) => {
  acc[cur] = `(min-width: ${size[cur]}px)`;
  return acc;
}, {});

export default device;
export { breakpoints, device };
