import styled from 'styled-components';

import device from '../utils/breakpoints';

export default styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: start-flex;
  align-items: stretch;

  @media ${device.min.laptop} {
    flex-direction: ${props => props.direction ? props.direction : 'column'};
    justify-content: ${props => props.justify ? props.justify : 'flex-start'};
    align-items: ${props => props.align ? props.align : 'stretch'};  
  }
`;
