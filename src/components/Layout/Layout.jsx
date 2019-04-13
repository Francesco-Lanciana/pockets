/**
 * Layout component that queries for data
 * with Gatsby's StaticQuery component
 *
 * See: https://www.gatsbyjs.org/docs/static-query/
 */

import React, { useState } from "react";
import PropTypes from "prop-types";

import NavBar from "@components/NavBar/NavBar";
import SideNavBar, { NavItem } from "@components/SideNavBar/SideNavBar";
import Footer from "@components/Footer/Footer";

import "@styles/main.scss";
import "./Layout.scss";

const Layout = ({ children }) => {
    const [isMenuHidden, setIsMenuHidden] = useState(true);
    const [selectedItemId, setSelectedItemId] = useState();

    function handleSelectItem(id) {
        setTimeout(() => setIsMenuHidden(false), 200);
        setSelectedItemId(id);
    }

    function handleToggleMenu() {
        setIsMenuHidden((prevIsMenuHidden) => !prevIsMenuHidden);
    }

    return (
        <React.Fragment>
            <NavBar onToggleMenu={handleToggleMenu} />
            <SideNavBar
                onSelectItem={handleSelectItem}
                selectedItemId={selectedItemId}
                hidden={isMenuHidden}
            >
                <NavItem to="/?sort=pants" id="pants">
                    Pants
                </NavItem>
                <NavItem to="/?sort=pants" id="shorts">
                    Shorts
                </NavItem>
                <NavItem to="/?sort=pants" id="skirts">
                    Skirts
                </NavItem>
                <NavItem to="/?sort=pants" id="leggings">
                    Leggings
                </NavItem>
            </SideNavBar>
            {!isMenuHidden && <div className="mobile-overlay" onClick={handleToggleMenu} />}
            {children}
            <Footer />
        </React.Fragment>
    );
};

Layout.propTypes = {
    children: PropTypes.node.isRequired,
};

export default Layout;
