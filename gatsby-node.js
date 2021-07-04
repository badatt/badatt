const path = require(`path`);
const { createFilePath } = require(`gatsby-source-filesystem`);
const fs = require('fs');

exports.onPreInit = () => {
  if (process.argv[2] === 'build') {
    fs.rmdirSync(path.join(__dirname, 'docs'), { recursive: true });
    fs.renameSync(path.join(__dirname, 'public'), path.join(__dirname, 'public_dev'));
  }
};

exports.onPostBuild = () => {
  fs.renameSync(path.join(__dirname, 'public'), path.join(__dirname, 'docs'));
  fs.renameSync(path.join(__dirname, 'public_dev'), path.join(__dirname, 'public'));
};

exports.onCreateWebpackConfig = ({ actions }) => {
  actions.setWebpackConfig({
    resolve: {
      modules: [path.resolve(__dirname, `src`), `node_modules`],
    },
  });
};

exports.onCreateNode = ({ node, actions, getNode }) => {
  const { createNodeField } = actions;

  if (node.internal.type === `MarkdownRemark`) {
    const value = createFilePath({ node, getNode });
    createNodeField({
      name: `slug`,
      node,
      value,
    });
  }
};

exports.createPages = async ({ graphql, actions }) => {
  const { createPage } = actions;
  const blogPostTemplate = path.resolve(`src/templates/BlogPost/index.tsx`);

  const res = await graphql(`
    query {
      allMarkdownRemark(
        filter: { frontmatter: { category: { eq: "blog" } } }
        sort: { fields: frontmatter___date, order: DESC }
      ) {
        edges {
          node {
            fields {
              slug
            }
            frontmatter {
              title
            }
          }
        }
      }
    }
  `);

  const posts = res.data.allMarkdownRemark.edges;

  posts.forEach((post, index) => {
    const previous = index === posts.length - 1 ? null : posts[index + 1].node;
    const next = index === 0 ? null : posts[index - 1].node;

    createPage({
      path: `${post.node.fields.slug}`,
      component: blogPostTemplate,
      context: {
        slug: `${post.node.fields.slug}`,
        previous,
        next,
      },
    });
  });
};
