/**
 * A navigation component that dissapears while the user is read an article (i.e. is
 * scrolling down the page)
 * Related issues: https://github.com/zeit/next.js/issues/796
 */

import React, { useState, useEffect, useContext } from "react";
import { Link, navigate } from "gatsby";
import { CSSTransition } from "react-transition-group";

import ShoppingCart from "@components/ShoppingCart/ShoppingCart";
import { useMedia, useScrollBasedPin } from "@hooks/window-hooks";
import ShoppingCartContext from "@context/ShoppingCartContext/ShoppingCartContext";

import logo from "@images/logo-semi.png";
import ShoppingCartImage from "@images/shopping-cart-solid.svg";
import MenuIcon from "@images/bars-regular.svg";

import "./NavBar.scss";

const NavBar = ({ onToggleMenu, alwaysPinned = true }) => {
    const [showShoppingCart, setShowShoppingCart] = useState(false);
    const { itemsInCart } = useContext(ShoppingCartContext);
    const [showMenu, setShowMenu] = useMedia(["(max-width: 800px)"], [true], false);
    const [showCartText] = useMedia(["(max-width: 330px)"], [false], true);
    const [useFullScreenCart] = useMedia(["(max-height: 580px)"], [true], false);
    const isPinned = useScrollBasedPin(true, { pinThreshold: 50 });
    const showNavLinks = !showMenu;

    const numItems = itemsInCart.reduce((total, { quantity }) => total + quantity, 0);

    useEffect(() => {
        function handleClick(event) {
            /* Keep the target on shopping-cart instead of shopping-cart-container to allow
            users to click on the safety net just around the shopping cart in order to close
            the modal. This prevents links being accidently clicked while closing the modal */
            if (!event.target.closest(".shopping-cart,.shopping-cart-btn")) {
                setShowShoppingCart(false);
            }
        }

        document.addEventListener("click", handleClick);

        if (window.innerWidth <= 800) setShowMenu(true);

        return function cleanup() {
            document.removeEventListener("click", handleClick);
        };
    }, []);
    
    useEffect(() => {
        if (showShoppingCart && useFullScreenCart) document.body.style.overflow = "hidden";
        else document.body.style.overflow = "";
    }, [showShoppingCart, useFullScreenCart])

    return (
        <header className="navbar" data-show={alwaysPinned || isPinned} >
            <div className="navbar-content" data-menu-visible={!!showMenu}>
                {showMenu && (
                    <div className="menu-icon-container" onClick={onToggleMenu}>
                        <MenuIcon />
                    </div>
                )}
                <Link to="/" className="logo-container" onClick={() => { document.body.style.overflow = "visible" }}>
                    <img src={logo} className="logo" />
                </Link>
                {showNavLinks && (
                    <nav className="site-navigation-container">
                        <ul className="site-navigation-links">
                            <li className="site-navigation-link">
                                <Link to="/?filter=pants">Pants</Link>
                            </li>
                            <li className="site-navigation-link">
                                <Link to="/?filter=shorts">Shorts</Link>
                            </li>
                            <li className="site-navigation-link">
                                <Link to="/?filter=skirts">Skirts</Link>
                            </li>
                            <li className="site-navigation-link">
                                <Link to="/?filter=leggings">Leggings</Link>
                            </li>
                        </ul>
                    </nav>
                )}

                <button
                    className="shopping-cart-btn"
                    onClick={() => setShowShoppingCart(!showShoppingCart)}
                >
                    <div className="shopping-cart-icon-container">
                        <ShoppingCartImage />
                    </div>
                    {showCartText && <div className="shopping-cart-text-container">Cart</div>}
                    <span className="shopping-cart-badge">{numItems}</span>
                </button>

                <CSSTransition classNames="fade" timeout={200} in={showShoppingCart} unmountOnExit>
                    <div className="shopping-cart-container" data-full-screen={useFullScreenCart}>
                        <ShoppingCart items={itemsInCart} onCloseBtnClick={() => setShowShoppingCart(!showShoppingCart)}/>
                    </div>
                </CSSTransition>
            </div>
        </header>
    );
};

export default NavBar;
