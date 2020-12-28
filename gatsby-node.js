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
exports.onCreateNode = async ({
  node,
  getNode,
  actions,
  reporter,
  createNodeId,
  createContentDigest
}) => {
  const { createNode, createNodeField, createParentChildLink } = actions;

  if ('Mdx' === node.internal.type) {
    const slug =
      `writing` + createFilePath({ node, getNode, basePath: `posts` });
    createNodeField({ node, name: 'slug', value: slug });

    // Finally try to create the publish time, this is based off the filename
    // if it were provided, if not it's not a big deal.
    const fileNode = getNode(node.parent);
    const names = fileNode.relativeDirectory.match(postRegex);
    const publishTime = names
      ? new Date(names[1], names[2] - 1, names[3])
      : fileNode.birthTime;
    createNodeField({ node, name: 'publishTime', value: publishTime });

    // Now we setup the seriesId so that it can be added to the page query as a filter
    // for retreiving all the posts in which this is a part.
    if (!!node.frontmatter.series) {
      const seriesId = createNodeId(`series-${node.frontmatter.series.title}`);
      let seriesNode = getNode(seriesId);

      if (!seriesNode) {
        await createNode({
          id: seriesId,
          parent: node.parentId,
          internal: {
            type: 'MdxSeries',
            description: `Article Series ${node.frontmatter.series.title}`,
            contentDigest: createContentDigest(
              `series-${node.frontmatter.series.title}`
            )
          },
          title: node.frontmatter.series.title
        });
        seriesNode = getNode(seriesId);
      }

      createNodeField({ node, name: 'seriesId', value: seriesId });
    }
  }
};

/**
 * Creates posts from MDX (.mdx, .md) from within the /posts folder.
 *
 * @param { graphql, actions } Gatsby functions
 */
exports.createPages = async ({ graphql, actions }) => {
  const { createPage } = actions;
  const result = await graphql(`
    query {
      allMdx(filter: { fileAbsolutePath: { regex: "/content/posts/" } }) {
        edges {
          node {
            fields {
              slug
              seriesId
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
        seriesId: node.fields.seriesId || ''
      }
    });
  });
};
