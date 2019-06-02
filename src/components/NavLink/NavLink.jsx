import React from "react";
import { Link } from "gatsby";

const NavLink = (props) => {
    const getPropsCallback = (props) => (navProps) => {
        // the object returned here is passed to the
        // anchor element's props
        const url = navProps.location.pathname + navProps.location.search;
        const isActive = url === props.to;
        return {
            "data-active": isActive,
        };
    };

    return (
        <Link
            {...props}
            getProps={getPropsCallback(props)}
        />
    );
};

export default NavLink;
