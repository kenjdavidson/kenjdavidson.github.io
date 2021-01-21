import { graphql, useStaticQuery } from "gatsby";
import { Article } from "../graphql/graphqlArticles";

type QueryResult = {
  allMdx: {
    edges: {
      node: Article;
    }[];
  };
};

const useArticles: (count?: number, from?: number) => Article[] = (
  count = 0,
  from = 0
) => {
  // I have absolutely zero idea why this query needs to be named MyQuery, but naming it anything else
  // causes a Gatsby error with no real details.  So for now, it'll just be my query to get things
  // going.
  const { allMdx } = useStaticQuery<QueryResult>(graphql`
    query MyQuery {
      allMdx(
        filter: { fileAbsolutePath: { regex: "/content/writing/" } }
        sort: { fields: fields___publishTime, order: DESC }
      ) {
        edges {
          node {
            ...Article
          }
        }
      }
    }
  `);

  if (count && count > 0) {
    const lastIndex = from + count;
    allMdx.edges
      .map(node => node.node)
      .filter((article, index) => index >= from && index < lastIndex);
  }

  return allMdx.edges.map(node => node.node);
};

export default useArticles;

export * from "../graphql/graphqlArticles";
