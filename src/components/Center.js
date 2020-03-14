import styled from 'styled-components';

export default styled.div`  
  flex: 1;  

  padding: ${props => props.padding ? props.padding : '0'};
  text-align: center;
`;