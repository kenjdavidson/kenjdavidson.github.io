import styled from 'styled-components';
import device from '../utils/breakpoints';

export default styled.section`
  display: grid;
  grid-template-columns: 1fr;
  grid-gap: var(--gutter);

  @media ${device.min.tablet} {
    grid-template-columns: 1fr 1fr;
    justify-content: space-between;
  }

  @media ${device.min.laptop} {
    grid-template-columns: 1fr 1fr 1fr;    
    padding: 0;
  }
`;