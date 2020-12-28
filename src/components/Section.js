import React from "react";
import styled from "styled-components";

import { Container } from "./Container";

const SectionHeader = styled.h1`
  position: relative;
  padding: 1rem 0;

  &::before {
    content: " ";
    position: absolute;
    bottom: 0px;
    left: 0px;
    height: 0.25rem;
    width: 3rem;
    background-color: var(--base08);
  }
`;

const Section = ({ className, children }) => {
  return (
    <section className={className}>
      <Container>{children}</Container>
    </section>
  );
};

const ViewHeightSection = styled(Section)`
  min-width: 100vh;
`;

const MinimalSection = styled(Section)`
  padding: 1rem 0;
`;

const LargeSection = styled(Section)`
  padding: 3rem 0;
`;

export { ViewHeightSection, MinimalSection, LargeSection, SectionHeader };

export default Section;
