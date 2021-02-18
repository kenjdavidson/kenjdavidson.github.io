import path from "path";
import { createFilePath } from "gatsby-source-filesystem";

// This needs some serious love.
// I need to go through the correct ways in which to extend the Mdx nodes and create
// MdxPage extends Mdx which add's in ONLY the specific Page related.  MDX Frontmatter
// is getting overloaded with a bunch of different fields.
// It may be that I'm severely misusing the Mdx plugin and this is not how it's meant
// to be used.  But allowing for dynamic page and section creation seems like a 
// pretty realistic thing.
// Much like components are made as smal as possible, page sections should be the
// same.

/**
 * Used to apply extra fields to `Mdx` fields.  This will eventually be used for creating 
 * series (although it looks like there is an MdxFrontmatterSeries) type that exists.  
 * Need to review more.
 * 
 * {@link https://www.gatsbyjs.com/docs/reference/config-files/gatsby-node/#onCreateNode}
 * 
 * @param {object} apiHelpers 
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

  const { createNodeField, createParentChildLink } = actions;

  if ("Page" === node.frontmatter.type) {
    const slug = node.frontmatter.slug || createFilePath({ node, getNode, basePath: "content/pages", trailingSlash: false });
    reporter.verbose(`Creating Page slug ${slug}`)
    createNodeField({ node, name: "slug", value: slug })
  } else if ("Section" === node.frontmatter) {

  }
}

/**
 * Programatically creates pages based on any `Mdx` that contains the frontmatter
 * `type: Page`.  Generally this should be contained in `/content/pages` but I guess
 * it's possible it comes from anywhere (drafts are ignored).
 * 
 * {@link https://www.gatsbyjs.com/docs/reference/config-files/gatsby-node/#createPages}
 * 
 * @param {object} apiHelpers
 */
module.exports.createPages = async ({
  graphql,
  actions,
  reporter
}) => {
  const result = await graphql(`
    query PagesContent {
      content: allMdx(filter: { frontmatter: { type: { eq: "Page" }, draft: { ne: true } } }) {
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
        component: path.resolve(`./src/template/page.tsx`),
        context: {
          id: node.id
        }
      });
    } else {
      reporter.error(`Page ${node.frontmatter.title} does contain slug`);
    }
  });
}

/**
 * Adds the `sections` field to the `Mdx` type to allow for Mdx subsections to
 * be resolved.
 * 
 * {@link https://www.gatsbyjs.com/docs/reference/config-files/gatsby-node/#createSchemaCustomization}
 * 
 * @param {object} apiHelpers 
 */
exports.createSchemaCustomization = ({ actions: { createTypes } }) => {
  const typeDefs = `
    type Mdx implements Node {
      sections: [Mdx]!
    }
  `;

  createTypes(typeDefs);
}

/**
 * Create the resolvers for Mdx.section which allows subsections to be split from
 * page Mdx files.  The requirement here is that subsections must be contained 
 * in the same directory.
 * 
 * {@link https://www.gatsbyjs.com/docs/reference/config-files/gatsby-node/#createResolvers}
 * 
 * @param {object} apiHelpers 
 */
exports.createResolvers = ({ createResolvers }) => {
  const resolvers = {
    Mdx: {
      sections: {
        resolve: (source, args, context, info) => {
          const filePath = source.fileAbsolutePath.substring(0, source.fileAbsolutePath.lastIndexOf('/'));
          const sections = context.nodeModel
            .getAllNodes({ type: "Mdx" })
            .filter(mdx => mdx.frontmatter.type === "PageSection" && mdx.fileAbsolutePath.startsWith(filePath));
          return sections || [];
        },
      },
    },
  }
  createResolvers(resolvers)
}