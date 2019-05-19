import React from "react";
import { Link } from "gatsby";
import { useMedia } from "@hooks/window-hooks";

import logo from "@images/logo-semi.png";
import "./CheckoutNavBar.scss";

const CheckoutNavBar = () => {
    const [smallScreen] = useMedia("(max-width: 530px)", true, false);

    return (
        <header className="checkout-nav-bar">
            <div className="navbar-content">
                <Link to="/" className="back-link">
                    <span>{smallScreen ? "Back" : "Continue Shopping"}</span>
                </Link>
                <Link to="/" className="logo-container">
                    <img src={logo} className="logo" />
                </Link>
                <Link to="/about/returns" className="return-policy-link">
                    <span>Returns policy</span>
                </Link>
            </div>
        </header>
    );
};

export default CheckoutNavBar;
