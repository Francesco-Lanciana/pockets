import React from "react";

import { NavItem } from "./NavItem/NavItem";
import matchComponent, { filterChildrenByRule } from "@utils/matchComponent.js";

import "./SideNavBar.scss";

const initialContext = {
    selectedItemId: 0,
    onSelectItem: (_) => _,
};

const selectedItemContext = React.createContext(initialContext);
const isNavItem = matchComponent(NavItem);

const SideNavBar = ({ children, onSelectItem, selectedItemId, hidden }) => {
    const navItems = filterChildrenByRule(children, (child) => isNavItem(child));
    const wrappedNavItems = React.Children.map(navItems, (navItem) => <li>{navItem}</li>);
    

    return (
        <selectedItemContext.Provider value={{ selectedItemId, onSelectItem }}>
            <nav className="side-nav-bar" data-hidden={hidden}>
                <div className="top-level-items-container">
                    <div className="nav-bar-header">Categories</div>
                    <ul className="top-level-items">{wrappedNavItems}</ul>
                </div>
            </nav>
        </selectedItemContext.Provider>
    );
};

export default SideNavBar;
export { selectedItemContext, NavItem };