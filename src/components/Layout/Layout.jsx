/**
 * Layout component that queries for data
 * with Gatsby's StaticQuery component
 *
 * See: https://www.gatsbyjs.org/docs/static-query/
 */

import React from "react";
import PropTypes from "prop-types";
import Helmet from "react-helmet";

import "@styles/main.scss";

const Layout = ({ children }) => (
    <>
        <Helmet>
            <meta name='viewport' content='initial-scale=1, viewport-fit=cover' />
        </Helmet>
        {children}
    </>
);

Layout.propTypes = {
    children: PropTypes.node.isRequired,
};

export default Layout;
