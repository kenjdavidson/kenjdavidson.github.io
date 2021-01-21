const onCreateWritingNode = require('./src/gatsby/writingContent').onCreateNode;
const createWritingPages = require('./src/gatsby/writingContent').createPages;

exports.onCreateNode = async ({
  node,
  getNode,
  actions,
  reporter,
  createNodeId,
  createContentDigest
}) => {
  onCreateWritingNode({ node, getNode, actions, reporter, createNodeId, createContentDigest });
};

exports.createPages = async ({ graphql, actions, reporter }) => {
  await createWritingPages({ graphql, actions, reporter });
};
