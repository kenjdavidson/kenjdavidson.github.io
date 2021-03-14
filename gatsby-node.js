const writingNodes = require("./src/gatsby/articlesNodeApi");
const pageNodes = require("./src/gatsby/pageContent");

exports.onCreateNode = async ({
  node,
  getNode,
  actions,
  reporter,
  createNodeId,
  createContentDigest
}) => {
  writingNodes.onCreateNode({ node, getNode, actions, reporter, createNodeId, createContentDigest });
  pageNodes.onCreateNode({ node, getNode, actions, reporter, createNodeId, createContentDigest });
};

exports.createPages = async ({ graphql, actions, reporter }) => {
  await writingNodes.createPages({ graphql, actions, reporter });
  await pageNodes.createPages({ graphql, actions, reporter });
};

exports.onCreatePage = ({ page }) => {
  if (page.path.indexOf('404') > -1) {
    console.log(page);
    page.layout = null;
  }
}

module.exports.createSchemaCustomization = async (actions) => {
  pageNodes.createSchemaCustomization && await pageNodes.createSchemaCustomization(actions);
};

exports.createResolvers = async (actions) => {
  pageNodes.createResolvers && await pageNodes.createResolvers(actions);
}