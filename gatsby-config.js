const path = require("path");

// require("dotenv").config({
//     path: `.env.${process.env.NODE_ENV}`,
// });

require("dotenv").config();

module.exports = {
    siteMetadata: {
        title: `Pockets`,
        description: `Functional style for every woman`,
        author: `@francescol`,
    },
    plugins: [
        `gatsby-plugin-react-helmet`,
        {
            resolve: `gatsby-source-filesystem`,
            options: {
                name: `images`,
                path: `${__dirname}/src/images`,
            },
        },
        `gatsby-transformer-sharp`,
        `gatsby-plugin-sharp`,
        {
            resolve: `gatsby-plugin-manifest`,
            options: {
                name: `gatsby-starter-default`,
                short_name: `starter`,
                start_url: `/`,
                background_color: `#663399`,
                theme_color: `#663399`,
                display: `minimal-ui`,
                icon: `src/images/pockets-logo.png`, // This path is relative to the root of the site.
            },
        },
        "gatsby-plugin-sass",
        {
            resolve: `gatsby-source-contentful`,
            options: {
                spaceId: `6bd6e1p1y8nx`,
                accessToken: process.env.CONTENTFUL_ACCESS_TOKEN,
                host: process.env.CONTENTFUL_ACCESS_URL,
                downloadLocal: true,
            },
        },
        {
            resolve: `gatsby-plugin-alias-imports`,
            options: {
                alias: {
                    "@components": path.resolve(__dirname, "src/components"),
                    "@styles": path.resolve(__dirname, "src/styles"),
                    "@utils": path.resolve(__dirname, "src/utils"),
                    "@images": path.resolve(__dirname, "src/images"),
                    "@hooks": path.resolve(__dirname, "src/hooks"),
                    "@context": path.resolve(__dirname, "src/context"),
                    "@api": path.resolve(__dirname, "src/api"),
                },
                extensions: [],
            },
        },
        "gatsby-plugin-react-svg",
        {
            resolve: "gatsby-source-stripe",
            options: {
                objects: ["Sku", "Product"],
                secretKey: process.env.STRIPE_SECRET_KEY,
                downloadFiles: true
            },
        },
        {
            resolve: `gatsby-plugin-stripe`,
            options: {
                async: true,
            },
        },
        //`gatsby-plugin-layout`
        // this (optional) plugin enables Progressive Web App + Offline functionality
        // To learn more, visit: https://gatsby.dev/offline
        // 'gatsby-plugin-offline',
    ],
};
