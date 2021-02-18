import { graphql, useStaticQuery } from "gatsby";
import { Article } from "../graphql/articles";

type QueryResult = {
  allMdx: {
    edges: {
      node: Article;
    }[];
  };
};

export const useRecentArticles: () => Article[] = () => {
  const { allMdx } = useStaticQuery<QueryResult>(graphql`
    query RecentPosts {
      allMdx(
        filter: {
          fileAbsolutePath: { regex: "/content/writing/" }
          frontmatter: { draft: { ne: true } }
        }
        sort: { fields: fields___publishTime, order: DESC }
        limit: 6
      ) {
        edges {
          node {
            ...Article
          }
        }
      }
    }
  `);

  return allMdx.edges.map((node) => node.node);
};
