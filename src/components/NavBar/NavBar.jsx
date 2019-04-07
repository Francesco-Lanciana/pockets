/**
 * A navigation component that dissapears while the user is read an article (i.e. is
 * scrolling down the page)
 * Related issues: https://github.com/zeit/next.js/issues/796
 */

import React, { useState, useEffect, useContext } from "react";
import { Link } from "gatsby";
import { CSSTransition } from "react-transition-group";

import ShoppingCart from "@components/ShoppingCart/ShoppingCart";

import ShoppingCartContext from "@context/ShoppingCartContext/ShoppingCartContext";

import logo from "@images/logo-semi.png";
import ShoppingCartImage from "@images/shopping-cart-solid.svg";

import "./NavBar.scss";

const NavBar = () => {
    const [showShoppingCart, setShowShoppingCart] = useState(false);
    const { itemsInCart } = useContext(ShoppingCartContext);
    const numItems = itemsInCart.reduce((total, { quantity }) => total + quantity, 0);


    useEffect(() => {
        function handleClick(event) {
            if (!event.target.closest(".shopping-cart-container,.shopping-cart-link-container")) {
                setShowShoppingCart(false);
            }
        }

        document.addEventListener("click", handleClick);

        return function cleanup() {
            document.removeEventListener("click", handleClick);
        };
    }, []);

    return (
        <header className="navbar">
            <div className="navbar-content">
                <Link to="/" className="logo-container">
                    <img src={logo} className="logo" />
                </Link>
                <nav className="site-navigation-container">
                    <ul className="site-navigation-links">
                        <li className="site-navigation-link">
                            <Link to="?sort=pants">Pants</Link>
                        </li>
                        <li className="site-navigation-link">
                            <Link to="?sort=shorts">Shorts</Link>
                        </li>
                        <li className="site-navigation-link">
                            <Link to="?sort=skirts">Skirts</Link>
                        </li>
                    </ul>
                    <button
                        className="shopping-cart-link-container"
                        onClick={() => setShowShoppingCart(!showShoppingCart)}
                    >
                        <div className="shopping-cart-icon-container">
                            <ShoppingCartImage />
                        </div>
                        <span className="shopping-cart-text-container">Cart</span>
                        <span className="shopping-cart-badge">{numItems}</span>
                    </button>
                </nav>

                <CSSTransition classNames="fade" timeout={200} in={showShoppingCart} unmountOnExit>
                    <div className="shopping-cart-container">
                        <ShoppingCart items={itemsInCart}/>
                    </div>
                </CSSTransition>
            </div>
        </header>
    );
};

export default NavBar;
