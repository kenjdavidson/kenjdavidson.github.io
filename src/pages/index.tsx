import React, { FunctionComponent } from 'react';
import { Seo } from '../components/seo';
import { graphql } from 'gatsby';
import { Article, ArticleSummary } from '../gatsby/articlesGraphQL';
import { Section, Hero } from '../components/layout/container';
import { Project } from '../graphql/projects';
import { MDXRenderer } from 'gatsby-plugin-mdx';
import slugify from 'slugify';
import { ImageSharp } from '../graphql/imageSharp';
import { OffsetImageHeader } from '../components/offsetImageHeader';
import { Heading } from '../components/heading';
import { Card as ArticleCard } from '../components/article/card';
import styled, { ThemeProvider } from 'styled-components';
import { Grid } from '../components/grid';
import { invertTheme } from '../styles/themes';

const SectionTitle = styled(Heading)`
  margin-bottom: 2rem;
`;

const IndexPage: FunctionComponent<IndexPageProps> = ({ data }) => {
  const { avatar } = data;

  return (
    <>
      <Seo />
      <Hero size="full">
        <OffsetImageHeader
          title="Husbanding, Fathering, Developing and Golfing my way to retirement!"
          featureImage={avatar.childImageSharp.fluid}
          featureImageAlt="Carson and me hanging out"
        >
          <Heading level={5} weight={400}>
            Successes or failures; professional or personal; if I remember or
            have a chance to write about it - hopefully it'll help you out.
          </Heading>
        </OffsetImageHeader>
      </Hero>

      <ThemeProvider theme={invertTheme}>
        <Section size="large">
          <SectionTitle level={2}>Some Recent Posts</SectionTitle>
          <Grid columns={3}>
            {data.recentArticles.articles.map((article) => (
              <ArticleCard
                key={`article-${slugify(article.frontmatter.title)}`}
                article={article}
              />
            ))}
            <ArticleCard
              article={{
                id: 'read-more-article',
                frontmatter: {
                  category: 'Read more',
                  subcategory: '',
                  title: 'Read more',
                  summary: `I've got a couple more articles available. I'm also 
                     attempting to start getting a bunch more content 
                    online.`,
                  tags: [],
                },
                fields: {
                  slug: '/writing',
                  publishTime: new Date(),
                  publishYear: new Date().getFullYear(),
                },
              }}
            />
          </Grid>
        </Section>

        <Section size="large">
          <SectionTitle level={2}>A Project or Two</SectionTitle>
          <Grid columns={2}>
            {data.recentProjects.projects.map((project) => (
              <article key={`project-row-${project.frontmatter.title}`}>
                <img
                  src={
                    project.frontmatter.featureImage.childImageSharp.fluid.src
                  }
                  width="100%"
                />
                <section>
                  <Heading level={5} weight={600} margin="small">
                    {project.frontmatter.title}
                  </Heading>
                  <MDXRenderer>{project.body}</MDXRenderer>
                </section>
              </article>
            ))}
            {data.recentProjects.projects.length == 1 && <div />}
          </Grid>
        </Section>

        <Section size="large">
          <SectionTitle level={2}>I wish I was Golfing</SectionTitle>
          <p>When it's not snowing or cold!</p>
          <p>
            TODO - finish and publish Gatsby Golf Canada source/transform
            plugin.
          </p>
        </Section>
      </ThemeProvider>
    </>
  );
};

export default IndexPage;
interface IndexPageProps {
  data: {
    recentArticles: {
      articles: ArticleSummary[];
    };
    recentProjects: {
      projects: Project[];
    };
    avatar: {
      childImageSharp: ImageSharp;
    };
  };
}

export const query = graphql`
  query IndexPageQuery {
    recentArticles: allMdx(
      sort: { fields: fields___publishTime, order: DESC }
      limit: 5
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
    avatar: file(relativePath: { regex: "/images/carson-on-shoulders.png/" }) {
      childImageSharp {
        fluid(quality: 100) {
          ...GatsbyImageSharpFluid_tracedSVG
        }
      }
    }
  }
`;
