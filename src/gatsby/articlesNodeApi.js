import path from "path";
// For some annoying reason when this file is converted to Typescript the 
// build fails while attempting to parse graphql from it.  I think for some
// reason it believes it's a page that is exporting graphql and incorrectly
// attempting to extract it.  Once this happens it's a shit show.
// Future Kens problems.

/**
 * Implements the `onCreateNode` function of the Gatsby Node APIs.
 * 
 * {@link https://www.gatsbyjs.com/docs/reference/config-files/gatsby-node/#onCreateNode}
 * 
 * Only processes `mdx` files within the folders with the structure
 * `/writing/{year}-{month}-{day}---{post name}.mdx`.  If a valid Node is found it is 
 * processed by:
 * 
 * - creates the field `slug` based on the parsed name
 * - creates the field `publishTime` based on the parsed date
 * - creates the field `publishYear` just to access it directly
 * 
 * @param {*} helpers {@link https://www.gatsbyjs.com/docs/reference/config-files/node-api-helpers/}
 */
module.exports.onCreateNode = async ({
  node,
  getNode,
  actions,
  reporter,
  createNodeId,
  createContentDigest
}) => {
  const fileNode = node.parent && getNode(node.parent);
  const match = fileNode && fileNode.relativeDirectory.match(/^writing\/(\d{4})-(\d{2})-(\d{2})---(.*)$/);

  if ("Mdx" !== node.internal.type || !fileNode || !match) {
    return; // invalid type or node
  }

  reporter.verbose(`Applying post fields: ${fileNode.relativeDirectory}`);
  const { createNode, createNodeField } = actions;

  // Create slug field
  const slug = `writing/${match[1]}/${match[2]}/${match[3]}/${match[4]}`;
  reporter.verbose(`writingContent: onCreateNode slug = ${slug}`);
  createNodeField({ node, name: "slug", value: slug });

  // Create publish time
  const publishTime = new Date(
    Number.parseInt(match[1]),
    Number.parseInt(match[2]),
    Number.parseInt(match[3])
  );
  reporter.verbose(`writingContent: onCreateNode publishTime = ${publishTime}`);
  createNodeField({ node, name: "publishTime", value: publishTime });

  reporter.verbose(`writingContent: onCreateNode publishYear = ${match[1]}`);
  createNodeField({ node, name: "publishYear", value: match[1] });
};

/**
 * Implemnts the `createPages` Gatsby Node API.
 * 
 * {@link https://www.gatsbyjs.com/docs/reference/config-files/gatsby-node/#createPages}
 * 
 * Responsible for creating the actual article pages.  Currently this only creates the
 * individual articles, but in the future it will be updated to create:
 * 
 * - Categories/Tags pages
 * - Series pages
 * - etc.
 * 
 * If a `slug` field is not found on the article, an error is logged (building continues).
 * 
 * @param {*} helpers {@link https://www.gatsbyjs.com/docs/reference/config-files/node-api-helpers/}
 */
module.exports.createPages = async ({
  graphql,
  actions,
  reporter
}) => {
  const result = await graphql(`
  query WritingContent {
    content: allMdx(filter: { fileAbsolutePath: { regex: "/content/writing/" }, frontmatter: { draft: { ne: true } } }) {
      nodes {
        fields {
          slug
        } 
        id
      }
    }
  }
`.trim());

  const { createPage } = actions;
  result.data.content.nodes.forEach((node) => {
    if (node.fields && node.fields.slug) {
      createPage({
        path: node.fields.slug,
        component: path.resolve(`./src/templates/article.tsx`),
        context: {
          id: node.id
        }
      });
    } else {
      reporter.error(`Post s${node.frontmatter.title} does contain slug`);
    }
  });
};
