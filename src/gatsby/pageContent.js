import path from "path";
import { createFilePath } from "gatsby-source-filesystem";

/**
 * Applies fields and mappings to Mdx nodes which match the page and
 * section conventions.  Pages are generated with Mdx content which is 
 * applied to a layout (possibly provided).  While sections are 
 * mapped to their parent Mdx node so that they can be queried 
 * and displayed in their appropriate sections.
 * 
 * @param {GatsbyApiHelpers} helpers
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
  const match = fileNode && fileNode.relativeDirectory.match(/^page\/(.*)$/);

  if ("Mdx" !== node.internal.type || !fileNode || !match) {
    return; // invalid type or node
  }

  const { createNodeField } = actions;

  if ("Page" === node.frontmatter.type) {
    const slug = node.frontmatter.slug || createFilePath({ node, getNode, basePath: "content/pages", trailingSlash: false });
    reporter.verbose(`Creating Page slug ${slug}`)
    createNodeField({ node, name: "slug", value: slug })
  } else if ("Section" === node.frontmatter) {

  }
}

/**
 * Create page based on suggested template
 * 
 * @param {GatsbyApiHelpers} helpers 
 */
module.exports.createPages = async ({
  graphql,
  actions,
  reporter
}) => {
  const result = await graphql(`
    query PagesContent {
      content: allMdx(filter: { fileAbsolutePath: { regex: "/\/page\//" }, frontmatter: { type: { eq: "Page" }, draft: { ne: true } } }) {
        nodes {
          frontmatter {
            title
          }
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
        component: path.resolve(`./src/components/PageLayout.tsx`),
        context: {
          id: node.id
        }
      });
    } else {
      reporter.error(`Page ${node.frontmatter.title} does contain slug`);
    }
  });
}