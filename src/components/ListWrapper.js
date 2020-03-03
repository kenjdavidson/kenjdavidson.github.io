import styled from 'styled-components';

import device from '../utils/breakpoints';

export default styled.ul`
  flex: 1;

  margin: ${props => props.margin ? props.margin : '0'};
  padding: ${props => props.padding ? props.padding : '0'};

  item-style: ${props => props.itemStyle ? props.itemStyle : 'none'};

  li {
    list-style: none;
  }
`;