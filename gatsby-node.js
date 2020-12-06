const path = require('path');
const { createFilePath } = require('gatsby-source-filesystem');

const postRegex = /^(\d{4})\/(\d{2})\/(\d{2})\/(.*)$/;

/**
 * When an MDX (.mdx, .md) node is created, they are updated with a number of custom fields:
 * - birthTime when the file was first created
 * - modifiedTime the last time at which the file was modified
 * - slug is the complete path of the output file
 * 
 * and if the file path contains the format YYYY/MM/DD then it will contain:
 * - publishTime the date of the folder path of publishing
 * 
 * @param { node, getNode, actions } Gatsby functions
 */
exports.onCreateNode = ({ node, getNode, actions }) => {
  const { createNodeField } = actions;
  
  if ("Mdx" === node.internal.type) {    
    const fileNode = getNode(node.parent);    
    const slug = node.frontmatter.slug 
      ? node.frontmatter.slug 
      : `writing` + createFilePath({ node, getNode, basePath: `posts` });    
    
    createNodeField({ node, name: 'birthTime', value: fileNode.birthTime, });
    createNodeField({ node, name: 'modifiedTime', value: fileNode.modifiedTime, });        
    createNodeField({ node, name: 'slug', value: slug, });

    // Finally try to create the publish time, this is based off the filename
    // if it were provided, if not it's not a big deal.
    const names = fileNode.relativeDirectory.match(postRegex);    
    const publishTime = names ? new Date(names[1], names[2]-1, names[3]) : fileNode.birthTime
    if (names) {      
      createNodeField({ node, name: 'publishTime', value: publishTime });  
    }
  }
};

/**
 * Creates posts from MDX (.mdx, .md) from within the /posts folder.
 * 
 * @param { graphql, actions } Gatsby functions
 */
exports.createPages = async ({ graphql, actions }) => {
  const { createPage } = actions
  const result = await graphql(`
    query {
      allMdx(filter: {fileAbsolutePath: {regex: "/src/posts/"}}) {
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

  result.data.allMdx.edges.forEach(({ node }) => {
    createPage({
      path: node.fields.slug,
      component: path.resolve(`./src/templates/PostLayout.js`),
      context: {
        id: node.id,
      },
    })
  });
};