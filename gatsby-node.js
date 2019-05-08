const path = require(`path`);

exports.createPages = ({ graphql, actions }) => {
    const { createPage } = actions;
    const itemPageTemplate = path.resolve(`src/templates/ItemPage/ItemPage.jsx`);
    const blogPostTemplate = path.resolve(`src/templates/BlogPost/BlogPost.jsx`);
    
    return graphql(`
        {
            allStripeProduct {
                edges {
                    node {
                        id
                    }
                }
            }
            allContentfulBlogPost {
                edges {
                    node {
                        id
                        slug
                    }
                }
            }
        }
    `).then((result) => {
        if (result.errors) {
            throw result.errors;
        }

        // Create clothing item pages.
        result.data.allStripeProduct.edges.forEach(({ node: product }) => {
            const { id } = product;

            createPage({
                path: `clothing/${id}`,
                component: itemPageTemplate,
                context: { id },
            });
        });

        // Create Blog post pages.
        result.data.allContentfulBlogPost.edges.forEach(({ node: blogPost }) => {
            const { id, slug } = blogPost;

            createPage({
                path: `blog/${slug}`,
                component: blogPostTemplate,
                context: { id },
            });
        });
    });
};
