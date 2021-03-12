import React from 'react';
import styled, { css } from 'styled-components';
import moment from 'moment';
import {
  Section,
  Heading as SectionHeading,
  Content as SectionContent,
} from './layout/section';
import { Heading } from './heading';
import { MDXRenderer } from 'gatsby-plugin-mdx';
import { Timeline } from '../graphql/timeline';
import slugify from 'slugify';

const StyledYear = styled.span`
  display: block;
  text-align: center;
  text-transform: uppercase;
`;

const StyledMonth = styled.span`
  display: block;
  text-align: center;
  text-transform: uppercase;
`;

const StyledDateBox = styled.div`
  background-color: ${({ theme }) => theme.inverse.background};
  color: ${({ theme }) => theme.primary.background};

  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  min-width: 4rem;
  min-height: 4rem;
`;

const HeadingWrapper = styled.div`
  display: flex;
  flex-direction: column;
  margin-left: 2rem;
`;

const SubHeading = styled(Heading)`
  text-transform: uppercase;
`;

const DateBox: React.FC<{ date: Date }> = ({ date: dateProp }) => {
  const date = moment(dateProp);
  return (
    <StyledDateBox>
      <StyledYear>{date.format('YYYY')}</StyledYear>
      <StyledMonth>{date.format('MMM')}</StyledMonth>
    </StyledDateBox>
  );
};
DateBox.displayName = 'DateBox';

const Content = styled(SectionContent)`
  @media screen and (min-width: ${({ theme }) => theme.breakpoints.medium}px) {
    width: 52rem;
    margin-left: 6rem;
  }
`;

export const TimelineSection: React.FC<{ event: Timeline }> = ({
  event,
  ...rest
}) => {
  return (
    <Section size="medium" fullBleed>
      <SectionHeading>
        <DateBox date={event.frontmatter.date} />
        <HeadingWrapper>
          <Heading
            level={3}
            id={slugify(event.frontmatter.title, { lower: true })}
          >
            {event.frontmatter.title}
          </Heading>
          {event.frontmatter.subtitle && (
            <SubHeading level={6}>{event.frontmatter.subtitle}</SubHeading>
          )}
        </HeadingWrapper>
      </SectionHeading>
      <Content>
        <MDXRenderer>{event.body}</MDXRenderer>
      </Content>
    </Section>
  );
};
