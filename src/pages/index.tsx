import React, { FunctionComponent } from 'react';
import { Seo } from '../components/seo';
import { graphql } from 'gatsby';
import { Article } from '../gatsby/articlesGraphQL';
import { Container } from '../components/layout/container';
import { Link } from '../components/link';
import { Project } from '../graphql/projects';
import { MDXRenderer } from 'gatsby-plugin-mdx';
import slugify from 'slugify';
import Image from 'gatsby-image';
import { ImageSharp } from '../graphql/imageSharp';
import { OffsetImageHeader } from '../components/offsetImageHeader';
import { Heading } from '../components/heading';
import { TwoColumns } from '../components/layout/twoColumns';
import { List, ListItem } from '../components/layout/list';
import { ArticleCard } from '../components/article';
import styled from 'styled-components';

const SectionTitle = styled(Heading)`
  margin-bottom: 2rem;
`;

const IndexPage: FunctionComponent<IndexPageProps> = ({ data }) => {
  const { avatar } = data;

  return (
    <>
      <Seo />
      <Container hero="full">
        <OffsetImageHeader
          title="Hey, I'm Ken"
          featureImage={avatar.childImageSharp.fluid}
          featureImageAlt="Carson and me hanging out"
        >
          <h4>
            I'm just Husbanding, Fathering, Developing and Golfing my way to
            retirement!
          </h4>
          <p>
            I use this site to <Link to="/writing">document</Link> the successes
            (and failures) along my <Link to="/about#work">professional</Link>{' '}
            and <Link to="/projects">extra curricular</Link> development path.
            I'm currently playing around (trying to love){' '}
            <strong>JavaScript</strong>, <strong>TypeScript</strong>,
            <strong>Gatsby</strong>, <strong>React</strong> and a couple things
            that I should probably already love.
          </p>
          <p>
            When I'm not sitting infront of a computer there's a pretty solid
            chance that I'm{' '}
            <Link to="/about#carson" style={{ fontStyle: 'italic' }}>
              "playing other room"
            </Link>{' '}
            with my son or attempting to get a round in. I don't post much about
            it, but my wife and son are always my top priority.
          </p>
          <p>
            With that said, I can't guarantee that this site will be pretty (or
            bug free) but you can accept it, welcome.
          </p>
        </OffsetImageHeader>
      </Container>

      <Container size="large">
        <SectionTitle level={2}>Sometimes I Write</SectionTitle>
        <TwoColumns
          columns="1/4"
          left={
            <p>
              Let's put the emphasis on **sometimes**. Every year I say I'm
              going to try and post more... and every year I learn that I'd
              rather be doing other things that publishing my thoughts.
            </p>
          }
          right={
            <>
              <List>
                {data.recentArticles.articles.map((article) => (
                  <ListItem
                    key={`article-${slugify(article.frontmatter.title)}`}
                    spacing={{ bottom: 5 }}
                  >
                    <ArticleCard article={article} />
                  </ListItem>
                ))}
              </List>
              <p>
                Would you like <Link to="/writing">to read more</Link>?
              </p>
            </>
          }
        />
      </Container>

      <Container size="large">
        <SectionTitle level={2}>Sometimes I Open Source</SectionTitle>
        {data.recentProjects.projects.map((project) => (
          <article key={`project-row-${project.frontmatter.title}`}>
            <Image
              fluid={project.frontmatter.featureImage.childImageSharp.fluid}
            />
            <section>
              <h3>{project.frontmatter.title}</h3>
              <MDXRenderer>{project.body}</MDXRenderer>
            </section>
          </article>
        ))}
      </Container>

      <Container size="large">
        <SectionTitle level={2}>A lot of the Time I Golf</SectionTitle>
        <p>When it's not snowing or cold!</p>
        <p>
          TODO - finish and publish Gatsby Golf Canada source/transform plugin.
        </p>
      </Container>
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
