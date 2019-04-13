import React, { useContext } from "react";
import { Link } from "gatsby";

import { selectedItemContext } from '../SideNavBar';

import "./NavItem.scss";

const NavItem = ({ children, id, to }) => {
    const { selectedItemId, onSelectItem } = useContext(selectedItemContext);
    const isSelected = selectedItemId === id;

    return (
        <Link className="nav-item" to={to} onClick={() => onSelectItem(id)} data-selected={isSelected}>
            <div className="nav-item-content">{children}</div>
        </Link>
    );
};

NavItem.displayName = 'NavItem';

export { NavItem };
