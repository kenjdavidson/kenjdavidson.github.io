import path from "path";

/**
 * Applies fields and links to Mdx nodes which match the required
 * convention for posts.
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

// For some annoying reason when this file is converted to Typescript the 
// build fails while attempting to parse graphql from it.  I think for some
// reason it believes it's a page that is exporting graphql and incorrectly
// attempting to extract it.  Once this happens it's a shit show.
// Future Kens problems.
module.exports.createPages = async ({
  graphql,
  actions,
  reporter
}) => {
  const result = await graphql(`
  query WritingContent {
    content: allMdx(filter: { fileAbsolutePath: { regex: "/content/writing/" }, frontmatter: { draft: { ne: true } } }) {
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
        component: path.resolve(`./src/components/PostLayout.tsx`),
        context: {
          id: node.id
        }
      });
    } else {
      reporter.error(`Post s${node.frontmatter.title} does contain slug`);
    }
  });
};
