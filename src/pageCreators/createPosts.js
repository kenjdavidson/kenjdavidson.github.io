const path = require('path');

exports.createPosts = async ({ graphql, actions }) => {
  const { createPage } = actions
  const result = await graphql(`
    query {
      allMarkdownRemark(filter: {fileAbsolutePath: {regex: "/src/posts/"}}) {
        edges {
          node {
            fields {
              slug
            }
            id
          }
        }
      }
    }
  `);

  result.data.allMarkdownRemark.edges.forEach(({ node }) => {
    createPage({
      path: node.fields.slug,
      component: path.resolve(`./src/templates/PostLayout.js`),
      context: {
        id: node.id,
      },
    })
  });
};