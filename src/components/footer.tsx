import React, { FunctionComponent, HtmlHTMLAttributes } from 'react';
import useSiteMetadata from '../hooks/useSiteMetadata';
import { useRecentArticles } from '../hooks/useRecentArticles';
import { Link } from './link';
import styled from 'styled-components';
import slugify from 'slugify';
import { Row, Col } from './layout/grid';
import { List, ListItem } from './layout/list';
import { graphql, useStaticQuery } from 'gatsby';
import { Container } from './layout/container';
import { Heading } from './heading';
import { paddingContain } from '../styles/themes';
import { SocialLink } from './social';

const StyledFooter = styled.footer`
  background-color: ${({ theme }) => theme.primary.background};
  color: ${({ theme }) => theme.primary.text};
  margin-top: 10rem;
`;

const Title = styled(Heading)`
  color: ${({ theme }) => theme.primary.background};
  background-color: ${({ theme }) => theme.inverse.background};
  font-weight: 400;
  line-height: 0.66em;
  ${paddingContain}
  margin: 0px;
`;

const StyledContainer = styled(Container)`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-content: center;
`;

const Divider = styled.div<{ height?: number }>`
  width: 100%;
  height: ${({ height }) => (height && `${height}px`) || '1px'};
  background-color: ${({ theme }) => theme.inverse.grey8};
`;

const SocialSection = styled.section`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
`;

const MetaRow = styled.section`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: 1rem 0;

  color: ${({ theme }) => theme.inverse.grey5};
  text-transform: uppercase;
  font-size: 0.75rem;

  p {
    text-align: center;
    margin: 0.5rem;
  }

  @media screen and (min-width: ${({ theme }) => theme.breakpoints.medium}px) {
    flex-direction: row;
    justify-content: space-between;

    p {
      text-align: initial;
      margin: 0px;
    }
  }
`;

export const Footer: FunctionComponent<
  HtmlHTMLAttributes<HTMLDivElement>
> = ({}) => {
  const articles = useRecentArticles();
  const { author, social } = useSiteMetadata();

  return (
    <StyledFooter>
      <Title>See Ya Later</Title>
      <StyledContainer>
        <Row>
          <Col>
            <p>
              Thanks again for stopping by! Regardless of whether you found me
              from an application, a search or the rabbit hole that is the
              internet, I hope you found something of interest.
            </p>
            <p>
              If not, shoot shoot me a{' '}
              <Link to="mailto:hello@kenjdavidson.com">message</Link> and we can
              see what I can do to help ya out.
            </p>
          </Col>
          <Col>
            <h3>Recent posts...</h3>
            <List>
              {articles.map((article) => (
                <ListItem
                  key={`article-${slugify(article.frontmatter.title)}`}
                  spacing={{ top: 1, bottom: 1 }}
                >
                  <Link to={article.fields.slug}>
                    <span>{article.frontmatter.title}</span>
                  </Link>
                </ListItem>
              ))}
            </List>
          </Col>
        </Row>
        <Divider />
        <SocialSection>
          {social.map((s) => (
            <SocialLink
              social={s}
              size="1.25rem"
              color="grey7"
              padding="1rem"
            />
          ))}
        </SocialSection>
        <Divider />
        <MetaRow>
          <p>
            Built with{' '}
            <Link to="https://www.gatsbyjs.org/" target="blank">
              Gatsby
            </Link>
            ,
            <Link to="https://pages.github.com/" target="blank">
              Github Pages
            </Link>{' '}
            and <Link to="/about/website">other fun things</Link>.
          </p>
          <p>&copy; {author.name}</p>
        </MetaRow>
      </StyledContainer>
    </StyledFooter>
  );
};
