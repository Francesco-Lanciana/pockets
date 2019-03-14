const path = require(`path`);

exports.createPages = ({ graphql, actions }) => {
    const { createPage } = actions;
    const itemPageTemplate = path.resolve(`src/templates/ItemPage/ItemPage.jsx`);
    // Query for markdown nodes to use in creating pages.
    // You can query for whatever data you want to create pages for e.g.
    // products, portfolio items, landing pages, etc.
    return graphql(`
        {
            allContentfulClothing {
                edges {
                    node {
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
        result.data.allContentfulClothing.edges.forEach((item) => {
            const { slug } = item.node;

            createPage({
                // Path for this page — required
                path: `clothing/${slug}`,
                component: itemPageTemplate,
                context: {
                    slug
                    // Add optional context data to be inserted
                    // as props into the page component..
                    //
                    // The context data can also be used as
                    // arguments to the page GraphQL query.
                    //
                    // The page "path" is always available as a GraphQL
                    // argument.
                },
            });
        });
    });
};
