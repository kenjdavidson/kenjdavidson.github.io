import React, { FunctionComponent, HtmlHTMLAttributes } from 'react';
import useSiteMetadata from '../../hooks/useSiteMetadata';
import { useRecentArticles } from '../../hooks/useRecentArticles';
import { useAvatar } from '../../hooks/useAvatar';
import { Link } from '../link';
import { SocialList } from '../social/socialList';
import styled from 'styled-components';
import slugify from 'slugify';
import { Container, Row, Col } from './container';
import { Paragraph } from '../typography/paragraph';
import { List, ListItem } from './list';
import { graphql, useStaticQuery } from 'gatsby';
import Img from 'gatsby-image';

const StyledFooter = styled.footer`
  background-color: ${({ theme }) => theme.secondary.background};
  margin-top: 10rem;
`;

const Heading = styled.h1`
  color: ${({ theme }) => theme.secondary.background};
  font-weight: 400;
  line-height: 3rem;
  margin: 0px;
  position: absolute;
  align-self: flex-start;

  font-size: 3rem;
  top: -2.5rem;

  @media screen and (min-width ${({ theme }) => theme.breakpoints.small}px) {
    font-size: 4rem;
    top: -2.75rem;
  }

  @media screen and (min-width ${({ theme }) => theme.breakpoints.medium}px) {
    font-size: 4rem;
    top: -2.75rem;
  }
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
  background-color: ${({ theme }) => theme.greys.grey80};
`;

const SocialRow = styled.section`
  align-self: center;
`;

const MetaRow = styled.section`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: 1rem 0;

  color: ${({ theme }) => theme.greys.grey50};
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

  const { imout } = useStaticQuery(graphql`
    query {
      imout: file(relativePath: { eq: "images/im-out.png" }) {
        childImageSharp {
          fluid {
            ...GatsbyImageSharpFluid_tracedSVG
          }
        }
      }
    }
  `);

  return (
    <StyledFooter>
      <StyledContainer>
        <Heading>See Ya Later</Heading>
        <Row>
          <Col>
            <h3>Recent posts...</h3>
            <List>
              {articles.map((article) => (
                <ListItem key={`article-${slugify(article.frontmatter.title)}`}>
                  <Link to={article.fields.slug}>
                    <span>{article.frontmatter.title}</span>
                  </Link>
                </ListItem>
              ))}
            </List>
          </Col>
          <Col>
            <h3>In case you missed...</h3>
            <List>
              {[
                {
                  title: 'A terribly written biography',
                  href: '/about',
                },
                {
                  title: 'Fitness & dieting sucks',
                  href: '/health',
                },
                {
                  title: "I just can't seem to break 12 handicap",
                  href: '/golf',
                },
                {
                  title: 'People are way smarter than me',
                  href: './backlinks',
                },
              ].map((item) => (
                <ListItem>
                  <Link to={item.href}>
                    <span>{item.title}</span>
                  </Link>
                </ListItem>
              ))}
            </List>
          </Col>
          <Col>
            <p style={{ fontSize: '1.25rem' }}>
              Thanks again for swinging by. If you weren't able to find what you
              were looking for, feel free to shoot me a message and I'll try to
              get things updated.
            </p>
          </Col>
        </Row>
        <Divider />
        <SocialRow>
          <SocialList socialLinks={social} style={{ fontSize: '1.25rem' }} />
        </SocialRow>
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
