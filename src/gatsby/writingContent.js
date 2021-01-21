import path from "path";

const PATH_REGEX = /^(\d{4})-(\d{2})-(\d{2})---(.*)$/;

module.exports.onCreateNode = async ({
  node,
  getNode,
  actions,
  reporter,
  createNodeId,
  createContentDigest
}) => {
  const fileNode = node.parent && getNode(node.parent);
  const match = fileNode && fileNode.relativeDirectory.match(PATH_REGEX);

  if ("Mdx" !== node.internal.type || !fileNode || !match) {
    return; // invalid type or node
  }

  const { createNode, createNodeField } = actions;

  // Create slug field
  const slug = `writing/${match[1]}/${match[2]}/${match[3]}/${match[4]}`;
  reporter.verbose(`writingContent:onCreateNode slug=${slug}`);
  createNodeField({ node, name: "slug", value: slug });

  // Create publish time
  const publishTime = new Date(
    Number.parseInt(match[1]),
    Number.parseInt(match[2]),
    Number.parseInt(match[3])
  );
  reporter.verbose(`writingContent:onCreateNode publishTime=${publishTime}`);
  createNodeField({ node, name: "publishTime", value: publishTime });
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
      content: allMdx(filter: {fileAbsolutePath: {regex: "/content/writing/"}}) {
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
    createPage({
      path: node.fields.slug,
      component: path.resolve(`./src/components/PostLayout.js`),
      context: {
        id: node.id
      }
    });
  });
};
