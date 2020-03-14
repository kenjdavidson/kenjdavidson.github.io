import React from 'react';
import styled from 'styled-components';

import { Button } from 'gatsby';

const ThemeSelectorWrapper = styled.ul`
  margin: 0;
  padding: 0;
  item-style: none;
`;

const ThemeItem = styled.li`
  display: inline-block;
`;

const ThemeIcon = styled(Button)`
  
`;

export default ({ themes }) => (
  <ThemeSelectorWrapper>

  </ThemeSelectorWrapper>
);