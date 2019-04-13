import React from 'react';

const matchComponent = (Component) => (c) => {
    // React Component
    if (c.type === Component) {
        return true;
    }

    // Matching componentType for SideNav, Nav, NavItem, NavIcon, NavText
    if (typeof c.type !== 'string' && c.type.displayName === Component.displayName) {
        return true;
    }

    return false;
};

const filterChildrenByRule = (children, condition) => {
    const childrenArray = React.Children.toArray(children);
    const childrenFiltered = childrenArray.filter((child) => {
        return React.isValidElement(child) && condition(child);
    });

    return childrenFiltered || null;
}

export default matchComponent;
export { filterChildrenByRule };