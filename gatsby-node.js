const path = require('path');
const { createFilePath } = require('gatsby-source-filesystem');
const { createPosts } = require('./src/pageCreators/createPosts');

const postRegex = /^(\d{4})-(\d{2})-(\d{2})-(.*)$/;

exports.onCreateNode = ({ node, getNode, actions }) => {
  const { createNodeField } = actions;

  // Blog posts are stored wtihin /posts
  if ("MarkdownRemark" === node.internal.type) {    
    // MarkdownRemarks have their file info applied - just incase we want to
    // display different file related dates.
    const fileNode = getNode(node.parent);    
    createNodeField({ node, name: 'birthTime', value: fileNode.birthTime, });
    createNodeField({ node, name: 'modifiedTime', value: fileNode.modifiedTime, });    

    // Finally try to create the publish time, this is based off the filename
    // if it were provided, if not it's not a big deal.
    const names = fileNode.relativeDirectory.match(postRegex);    
    const publishTime = names ? new Date(names[1], names[2]-1, names[3]) : fileNode.birthTime

    let slug = node.frontmatter.slug ? node.frontmatter.slug 
      : `writing` + createFilePath({ node, getNode, basePath: `posts` });    

    if (names) {      
      createNodeField({ node, name: 'publishTime', value: publishTime });  
      
      slug = `writing/${names[1]}/${names[2]}/${names[3]}/${fileNode.relativeDirectory.substring(11)}`;
    } 

    createNodeField({ node, name: 'slug', value: slug, });
  }
};

exports.createPages = async ({ graphql, actions }) => {
  createPosts({ graphql, actions });
};