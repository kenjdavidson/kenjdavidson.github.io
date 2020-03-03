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
          }
          next {
            frontmatter {
              title
            }
            fields {
              slug
            }
          }
          previous {
            frontmatter {
              title
            }
            fields {
              slug
            }
          }
        }
      }
    }
  `);

  result.data.allMarkdownRemark.edges.forEach(({ node, next, previous }) => {
    console.log(node.fields.slug);
    createPage({
      path: node.fields.slug,
      component: path.resolve(`./src/templates/PostLayout.js`),
      context: {
        slug: node.fields.slug,
        next,
        previous
      },
    })
  });
};