/**
 * SEO component that queries for data with
 *  Gatsby's useStaticQuery React hook
 *
 * See: https://www.gatsbyjs.org/docs/use-static-query/
 */

import React from "react";
import PropTypes from "prop-types";
import {Helmet} from "react-helmet";

import { DEFAULT_SEO } from '../seo-config';
import { generateJSONLD } from '@utils/seo';

const SEO = React.memo(({ type, metadata={}}) => {
    const schemaOrgJSONLD = generateJSONLD(type)(metadata);
    const title = metadata.name ? `${metadata.name} | ${DEFAULT_SEO.openGraph.title}` : DEFAULT_SEO.openGraph.title;

    return (
        <Helmet>
            {/* General tags */}
            <title key="title">{title}</title>
            <meta key="description" name="description" content={metadata.description || DEFAULT_SEO.description} />

            {/* Schema.org tags */}
            <script type="application/ld+json">{JSON.stringify(schemaOrgJSONLD)}</script>

            {/* Twitter Card tags */}
            <meta key="twitter:card" name="twitter:card" content={DEFAULT_SEO.twitter.cardType} />
            <meta key="twitter:site" name="twitter:site" content={DEFAULT_SEO.twitter.handle} />
            <meta key="twitter:title" name="twitter:title" content={title} />
            <meta
                key="twitter:description"
                name="twitter:description"
                content={metadata.description || DEFAULT_SEO.twitter.description}
            />

            {/* OpenGraph tags */}
            <meta key="og:url" property="og:url" content={metadata.url || DEFAULT_SEO.openGraph.url} />
            <meta key="og:type" property="og:type" content={DEFAULT_SEO.openGraph.type} />
            <meta key="og:title" property="og:title" content={title} />
            <meta
                key="og:description"
                property="og:description"
                content={metadata.description || DEFAULT_SEO.openGraph.description}
            />
            <meta key="og:image" property="og:image" content={metadata.imageUrl || DEFAULT_SEO.openGraph.image} />
            <meta
                key="og:image:width"
                property="og:image:width"
                content={DEFAULT_SEO.openGraph.imageHeight * metadata.aspectRatio}
            />
            <meta
                key="og:image:height"
                property="og:image:height"
                content={DEFAULT_SEO.openGraph.imageHeight}
            />
            <meta key="og:locale" property="og:locale" content={DEFAULT_SEO.openGraph.locale} />
        </Helmet>
    );
});

SEO.propTypes = {
    type: PropTypes.string.isRequired,
    metadata: PropTypes.shape({
        title: PropTypes.string, 
        description: PropTypes.string, 
        url: PropTypes.string, 
        imageUrl: PropTypes.string, 
        datePublished: PropTypes.string, 
        dateModified: PropTypes.string,
        authorFirstName: PropTypes.string,
        authorLastName: PropTypes.string,
        name: PropTypes.string,
        category: PropTypes.string,
        price: PropTypes.number,
        currency: PropTypes.string,
        sku: PropTypes.string,
    }).isRequired,
};

export default SEO;
