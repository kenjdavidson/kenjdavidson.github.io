import React, { FunctionComponent } from 'react';
import { Seo } from '../components/seo';
import { graphql } from 'gatsby';
import { Article } from '../graphql/articles';
import { Section, SectionTitle } from '../components/section/section';
import { Link } from '../components/link';
import { Project } from '../graphql/projects';
import { MDXRenderer } from 'gatsby-plugin-mdx';
import { ArticleListItem } from '../components/article/articleListItem';
import slugify from 'slugify';
import Img, { FluidObject } from 'gatsby-image';
import { Container } from '../components/layout/container';

const IndexPage: FunctionComponent<IndexPageProps> = ({ data }) => {
  return (
    <>
      <Seo />
      <Section hero="half" size="medium">
        <Container>
          <h1>Hey, I'm Ken.</h1>
          <p style={{ fontSize: '1.5rem' }}>
            Just <strong>hubanding</strong>, <strong>fathering</strong>,{' '}
            <strong>golfing</strong> and <strong>developing</strong> my way to
            retirement. Besides being a playground for my continual learning,
            you'll get a little of my <Link to="/">personal</Link> and{' '}
            <Link to="/resume">professional</Link> history.
          </p>
        </Container>
      </Section>

      <Section>
        <Container>
          <SectionTitle spacing="md">Recent Posts</SectionTitle>
          <ul>
            {data.recentArticles.articles.map((article) => (
              <ArticleListItem
                key={`article-${slugify(article.frontmatter.title)}`}
                article={article}
              />
            ))}
          </ul>
        </Container>
      </Section>

      <Section>
        <Container>
          <SectionTitle spacing="md">Notable(ish) Projects</SectionTitle>
          {data.recentProjects.projects.map((project) => (
            <article key={`project-row-${project.frontmatter.title}`}>
              <div>
                <div>
                  {project.frontmatter.featureImage && (
                    <Img
                      fluid={
                        project.frontmatter.featureImage.childImageSharp.fluid
                      }
                    />
                  )}
                </div>
                <div>
                  <h3>{project.frontmatter.title}</h3>
                  <MDXRenderer>{project.body}</MDXRenderer>
                </div>
              </div>
            </article>
          ))}
        </Container>
      </Section>
    </>
  );
};

export default IndexPage;
interface IndexPageProps {
  data: {
    recentArticles: {
      articles: Article[];
    };
    recentProjects: {
      projects: Project[];
    };
  };
}

export const query = graphql`
  query IndexPageQuery {
    recentArticles: allMdx(
      sort: { fields: fields___publishTime, order: DESC }
      limit: 8
      filter: { frontmatter: { type: { eq: "Post" }, draft: { ne: true } } }
    ) {
      articles: nodes {
        ...ArticleSummary
      }
    }
    recentProjects: allMdx(
      filter: {
        fileAbsolutePath: { regex: "/projects/" }
        frontmatter: { draft: { ne: true } }
      }
      sort: { fields: frontmatter___order }
    ) {
      projects: nodes {
        ...Project
      }
    }
  }
`;
