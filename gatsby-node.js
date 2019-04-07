const path = require(`path`);

exports.createPages = ({ graphql, actions }) => {
    const { createPage } = actions;
    const itemPageTemplate = path.resolve(`src/templates/ItemPage/ItemPage.jsx`);
    // Query for markdown nodes to use in creating pages.
    // You can query for whatever data you want to create pages for e.g.
    // products, portfolio items, landing pages, etc.
    return graphql(`
        {
            allStripeSku {
                edges {
                    node {
                        product {
                            id
                        }
                    }
                }
            }
        }
    `).then((result) => {
        if (result.errors) {
            throw result.errors;
        }

        // Create clothing item pages.
        result.data.allStripeSku.edges.forEach((item) => {
            const { id } = item.node.product;

            createPage({
                // Path for this page — required
                path: `clothing/${id}`,
                component: itemPageTemplate,
                context: {
                    id,
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
