
const path = require("path");
const { createFilePath } = require("gatsby-source-filesystem");
const postRegex = /^(\d{4})-(\d{2})-(\d{2})-(.*)$/;

exports.onCreateNode = ({ node, getNode, actions }) => {
  const { createNodeField } = actions;

  if ("MarkdownRemark" === node.internal.type) {
    const fileNode = getNode(node.parent);    
    const slug = createFilePath({ node, getNode, basePath: `posts` });
    const names = fileNode.relativeDirectory.match(postRegex);

    createNodeField({
      node,
      name: 'slug',
      value: slug,
    });

    createNodeField({
      node,
      name: 'date',
      value: `${names[1]}-${names[2]}-${names[3]}`
    });
  }
};

exports.createPages = async ({ graphql, actions }) => {
  const { createPage } = actions
  const result = await graphql(`
    query {
      allMarkdownRemark {
        edges {
          node {
            timeToRead
            frontmatter {
              title
              tags
              description
              categories
            }
            fields {
              slug
              date
            }
            html
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
    createPage({
      path: node.fields.slug,
      component: path.resolve(`./src/templates/Post.js`),
      context: {
        // Data passed to context is available
        // in page queries as GraphQL variables.
        slug: node.fields.slug,
        next,
        previous
      },
    })
  });
};