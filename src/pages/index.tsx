import React, { FunctionComponent } from 'react';
import { Seo } from '../components/seo';
import { graphql } from 'gatsby';
import { Article } from '../graphql/articles';
import { Section, SectionTitle } from '../components/layout/section';
import { Link } from '../components/link';
import { Project } from '../graphql/projects';
import { MDXRenderer } from 'gatsby-plugin-mdx';
import { ArticleListItem } from '../components/article/articleListItem';
import slugify from 'slugify';
import Img, { FluidObject } from 'gatsby-image';
import { Container } from '../components/layout/container';
import { ImageSharp } from '../graphql/imageSharp';
import { OffsetImageHero } from '../components/hero/offsetImageHero';
import { H2 } from '../components/typography/heading';

const IndexPage: FunctionComponent<IndexPageProps> = ({ data }) => {
  const { recentArticles, recentProjects, avatar } = data;

  return (
    <>
      <Seo />
      <Section hero="full" size="none">
        <OffsetImageHero
          title="Hey, I'm Ken"
          featureImage={avatar.childImageSharp.fluid}
          featureImageAlt="Carson and me hanging out"
        >
          <h3>
            Husbanding, Fathering, Developing and Golfing my way to retirement
          </h3>
          <p>
            For better or for worse you've ended up here, my digital playground.
            Regardless of how I feel about *being out there* I get that it's a
            requirement in our industry.
          </p>
          <p>
            I try to <Link to="/writing">document</Link> all my success (and
            failures) with regards to <Link to="/about#work">work</Link>,
            <Link to="/golf">play</Link>, and sometimes family. I can't promise
            that the site won't be broken or have a bunch of issues; but if
            you're cool with that then explore!
          </p>
        </OffsetImageHero>
      </Section>

      <Section size="large">
        <article>
          <H2>Sometimes I write</H2>
          <p>
            Let's put a double *emphasis* on somtimes. Every year I say I'm
            going to try and post more... and every year I learn that I'd rather
            be doing other things that publishing my thoughts.
          </p>
          <ul>
            {data.recentArticles.articles.map((article) => (
              <ArticleListItem
                key={`article-${slugify(article.frontmatter.title)}`}
                article={article}
              />
            ))}
          </ul>
        </article>
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
        fluid {
          ...GatsbyImageSharpFluid_tracedSVG
        }
      }
    }
  }
`;
